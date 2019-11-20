import useSwr, { responseInterface } from 'swr';
import { ParsedUrlQueryInput, stringify } from 'querystring';
import request from '@/utils/request';
import { IServerResult, ITableList } from '../../typings/server.d';
import { defaultConfig } from './RestfulConfigContext';

export type ResourceId = String | undefined;
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
}

const useResuful = <Resource>(url: String): IUseResuful<Resource> => {
  const { pagination } = defaultConfig;
  const create = (data: Resource): ICreateResult =>
    request.post(`${url}`, {
      data,
    });

  const remove = (id: ResourceId): IRemoveResult => request.delete(`${url}/${id}`);

  const update = (id: ResourceId, resource: Resource): IUpdateResult =>
    request.put(`${url}/${id}`, {
      data: resource,
    });

  const useQuery = (params?: ResourceParams): IUseQueryResult<Resource> =>
    useSwr<ITableList<Resource>>(`${url}?${stringify({ ...pagination, ...params })}`, request);

  const useFind = (id: ResourceId): IUseFindResult<Resource> =>
    useSwr<IServerResult<Resource>>(`${url}/${id}`, request);

  return {
    create,
    remove,
    update,
    useQuery,
    useFind,
  };
};

export default useResuful;
