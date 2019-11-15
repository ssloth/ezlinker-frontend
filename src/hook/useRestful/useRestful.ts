import useSwr, { responseInterface } from 'swr';
import { ParsedUrlQueryInput, stringify } from 'querystring';
import request from '@/utils/request';
import { IServerResult, ITableList } from '../../typings/server.d';

export type ResourceId = String | undefined;
export type ResourceParams = ParsedUrlQueryInput;
export type ICreateResult = Promise<IServerResult>;
export type IRemoveResult = Promise<IServerResult>;
export type IUpdateResult = Promise<IServerResult>;
export type IQueryResult<Resource> = responseInterface<ITableList<Resource>, Error>;
export type IFindResult<Resource> = responseInterface<IServerResult<Resource>, Error>;

/** function */
export type ICreate<Resource> = (data: Resource) => ICreateResult;
export type IRemove = (id: ResourceId) => IRemoveResult;
export type IUpdate<Resource> = (id: ResourceId, resource: Resource) => IUpdateResult;
export type IQuery<Resource> = (params?: ResourceParams) => IQueryResult<Resource>;
export type IFind<Resource> = (id: ResourceId) => IFindResult<Resource>;
export interface IUseResuful<Resource> {
  create: ICreate<Resource>;
  remove: IRemove;
  update: IUpdate<Resource>;
  query: IQuery<Resource>;
  find: IFind<Resource>;
}

const useResuful = <Resource>(url: String): IUseResuful<Resource> => {
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
    useSwr<ITableList<Resource>>(`${url}?${stringify(params)}`, request);

  const find = (id: ResourceId): IFindResult<Resource> =>
    useSwr<IServerResult<Resource>>(`${url}/${id}`, request);

  return {
    create,
    remove,
    update,
    query,
    find,
  };
};

export default useResuful;
