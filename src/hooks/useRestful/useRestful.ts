import useSwr, { responseInterface, trigger as swrTrigger, mutate as swrMutate } from 'swr';
import { ParsedUrlQueryInput, stringify } from 'querystring';
import request from '@/utils/request';
import { IServerResult, ITableList } from '@/typings/server';
import { defaultConfig } from './RestfulConfigContext';

export type ResourceId = string | undefined;
export type ResourceParams = ParsedUrlQueryInput;
export type ICreateResult = Promise<IServerResult>;
export type IRemoveResult = Promise<IServerResult>;
export type IUpdateResult = Promise<IServerResult>;
export type IUseQueryResult<Resource> = responseInterface<ITableList<Resource>, Error>;
export type IUseFindResult<Resource> = responseInterface<IServerResult<Resource>, Error>;

/** function */
export type ICreate<Resource> = (data: Resource) => ICreateResult;
export type IRemove = (id: ResourceId) => IRemoveResult;
export type IUpdate<Resource> = (id: ResourceId, resource: Resource) => IUpdateResult;
export type IUseQuery<Resource> = (params?: ResourceParams) => IUseQueryResult<Resource>;
export type IUseFind<Resource> = (id: ResourceId) => IUseFindResult<Resource>;
export interface IUseResuful<Resource> {
  create: ICreate<Resource>;
  remove: IRemove;
  update: IUpdate<Resource>;
  useQuery: IUseQuery<Resource>;
  useFind: IUseFind<Resource>;
  trigger: (type: 'query' | 'find') => void;
  mutate: any;
  URL: string;
}

const useResuful = <Resource>(url: string): IUseResuful<Resource> => {
  const { pagination } = defaultConfig;

  const URL = url;
  const local = {
    params: '',
    id: '',
  };

  const create = (data: Resource): ICreateResult =>
    request.post(`${url}`, {
      data,
    });

  const remove = (id: ResourceId): IRemoveResult => request.delete(`${url}/${id}`);

  const update = (id: ResourceId, resource: Resource): IUpdateResult =>
    request.put(`${url}/${id}`, {
      data: resource,
    });

  const useQuery = (params?: ResourceParams): IUseQueryResult<Resource> => {
    local.params = stringify({ ...pagination, ...params });
    return useSwr<ITableList<Resource>>(`${url}?${local.params}`, request);
  };

  const useFind = (id: ResourceId): IUseFindResult<Resource> => {
    local.id = id as string;
    return useSwr<IServerResult<Resource>>(`${url}/${id}`, request);
  };

  const trigger = (type: 'query' | 'find') => {
    if (type === 'query') {
      swrTrigger(`${url}?${local.params}`);
    } else {
      swrTrigger(`${url}/${local.id}`);
    }
  };

  const mutate = (type: 'query' | 'find', data: any) => {
    if (type === 'query') {
      swrMutate(`${url}?${local.params}`, data);
    } else {
      swrMutate(`${url}/${local.id}`, data);
    }
  };

  return {
    create,
    remove,
    update,
    useQuery,
    useFind,
    trigger,
    mutate,
    URL,
  };
};

export default useResuful;
