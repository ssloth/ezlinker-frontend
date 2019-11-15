// import useSwr from 'swr'
import useSwr, { responseInterface } from 'swr';
import { stringify, ParsedUrlQueryInput } from 'querystring';
import request from '@/utils/request';

export type ResourceId = String;
export type ResourceParams = ParsedUrlQueryInput;
export type ICreateResult = Promise<Boolean>;
export type IRemoveResult = Promise<Boolean>;
export type IUpdateResult = Promise<Boolean>;
export type IQueryResult<Resource> = responseInterface<Resource[], Error>;
export type IFindResult<Resource> = responseInterface<Resource, Error>;
export type ICreate<Resource> = (data: Resource) => ICreateResult;
export type IRemove<Resource> = (id: ResourceId) => IRemoveResult;
export type IUpdate<Resource> = (id: ResourceId, resource: Resource) => IUpdateResult;
export type IQuery<Resource> = (params?: ResourceParams) => IQueryResult<Resource>;
export type IFind<Resource> = (id: ResourceId) => IFindResult<Resource>;
export interface IUseResuful<Resource> {
  create: ICreate<Resource>;
  remove: IRemove<Resource>;
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
    useSwr<Resource[]>(`${url}?${stringify(params)}`, request);

  const find = (id: ResourceId): IFindResult<Resource> => useSwr<Resource>(`${url}/${id}`, request);

  return {
    create,
    remove,
    update,
    query,
    find,
  };
};

export default useResuful;
