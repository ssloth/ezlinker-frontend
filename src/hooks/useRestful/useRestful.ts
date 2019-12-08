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
export type IQueryResult<Resource> = Promise<IServerResult<Resource[]>>;
export type IFindResult<Resource> = Promise<IServerResult<Resource>>;
export type IUseSWRQueryResult<Resource> = responseInterface<ITableList<Resource>, Error>;
export type IUseSWRFindResult<Resource> = responseInterface<IServerResult<Resource>, Error>;

/** function */
export type ICreate<Resource> = (data: Resource) => ICreateResult;
export type IRemove = (id: ResourceId) => IRemoveResult;
export type IUpdate<Resource> = (id: ResourceId, resource: Resource) => IUpdateResult;
export type IQuery<Resource> = (params?: ResourceParams) => IQueryResult<Resource>;
export type IFind<Resource> = (id: ResourceId) => IFindResult<Resource>;
export type IUseSWRQuery<Resource> = (params?: ResourceParams) => IUseSWRQueryResult<Resource>;
export type IUseSWRFind<Resource> = (id: ResourceId) => IUseSWRFindResult<Resource>;
export interface IUseResuful<Resource> {
  create: ICreate<Resource>;
  remove: IRemove;
  update: IUpdate<Resource>;
  query: IQuery<Resource>;
  find: IFind<Resource>;
  useSWRQuery: IUseSWRQuery<Resource>;
  useSWRFind: IUseSWRFind<Resource>;
  trigger: (type: 'query' | 'find') => void;
  mutate: any;
  URL: string;
}

const useResuful = <Resource>(url: string, config: any = {}): IUseResuful<Resource> => {
  const { pagination } = defaultConfig;
  const { defaultParams = {} } = config;
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

  const query = (params?: ResourceParams): IQueryResult<Resource> =>
    request.get(url, { params: { ...params, ...pagination, ...defaultParams } });

  const find = (id: ResourceId): IFindResult<Resource> => request.get(`${url}/${id}`);

  const useSWRQuery = (params?: ResourceParams): IUseSWRQueryResult<Resource> => {
    local.params = stringify({ ...pagination, ...params, ...defaultParams });
    return useSwr<ITableList<Resource>>(`${url}?${local.params}`, request, {
      onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
        if (!retryCount) return;
        if (retryCount >= 2) return;
        if (error && error.status === 404) return;

        // retry after 5 seconds
        setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
      },
    });
  };

  const useSWRFind = (id: ResourceId): IUseSWRFindResult<Resource> => {
    local.id = id as string;
    return useSwr<IServerResult<Resource>>(`${url}/${id}`, request, {
      onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
        if (!retryCount) return;
        if (retryCount >= 2) return;
        if (error.status === 404) return;

        // retry after 5 seconds
        setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
      },
    });
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
    query,
    find,
    useSWRQuery,
    useSWRFind,
    trigger,
    mutate,
    URL,
  };
};

export default useResuful;
