import useSwr, { responseInterface, trigger as swrTrigger, mutate as swrMutate } from 'swr';
import { ParsedUrlQueryInput, stringify } from 'querystring';
import request from '@/utils/request';
import { ITableList } from '@/typings/server';
import { defaultConfig } from './RestfulConfigContext';

export type ResourceId = string | undefined;
export type ResourceParams = ParsedUrlQueryInput;
export type ICreateResult = Promise<any>;
export type IRemoveResult = Promise<any>;
export type IUpdateResult = Promise<any>;
export type IQueryResult<Resource> = Promise<ITableList>;
export type IFindResult<Resource> = Promise<Resource>;
export type IUseSWRQueryResult<Resource> = responseInterface<ITableList<Resource>, Error>;
export type IUseSWRFindResult<Resource> = responseInterface<Resource, Error>;

/** function */
export type ICreate<Resource> = (data: Resource, params?: ResourceParams) => ICreateResult;
export type IRemove = (id: ResourceId, params?: ResourceParams) => IRemoveResult;
export type IUpdate<Resource> = (
  id: ResourceId,
  resource: Resource,
  params?: ResourceParams,
) => IUpdateResult;
export type IQuery<Resource> = (params?: ResourceParams) => IQueryResult<Resource>;
export type IFind<Resource> = (id: ResourceId, params?: ResourceParams) => IFindResult<Resource>;
export type IUseSWRQuery<Resource> = (params?: ResourceParams) => IUseSWRQueryResult<Resource>;
export type IUseSWRFind<Resource> = (
  id: ResourceId,
  params?: ResourceParams,
) => IUseSWRFindResult<Resource>;
export interface ICreateUseRestful<Resource> {
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

const parseURL = (url: string, params: any = {}) => {
  const result = url.match(/:[a-zA-Z0-9]+/g);
  if (result) {
    return result.reduce((acc, value) => {
      const r = params[value.replace(':', '')] || '';
      // eslint-disable-next-line no-console
      if (!r) console.error(`result url 中 [${value}] 未匹配`);
      return acc.replace(value, r);
    }, url);
  }
  return url;
};

const useResuful = <Resource>(url: string, config: any = {}): ICreateUseRestful<Resource> => {
  const { pagination } = defaultConfig;
  const { defaultParams = {} } = config;
  const URL = url;
  const local = {
    currentParams: {},
    params: '',
    id: '',
  };

  const create = (data: Resource, params?: ResourceParams): ICreateResult =>
    request.post(`${parseURL(url, params)}`, {
      data,
    });

  const remove = (id: ResourceId, params?: ResourceParams): IRemoveResult =>
    request.delete(`${parseURL(url, params)}/${id}`);

  const update = (id: ResourceId, resource: Resource, params?: ResourceParams): IUpdateResult =>
    request.put(`${parseURL(url, params)}/${id}`, {
      data: resource,
    });

  const query = (params?: ResourceParams): IQueryResult<Resource> =>
    request.get(parseURL(url, params), { params: { ...params, ...pagination, ...defaultParams } });

  const find = (id: ResourceId, params?: ResourceParams): IFindResult<Resource> =>
    request.get(`${parseURL(url, params)}/${id}`);

  const useSWRQuery = (params?: ResourceParams): IUseSWRQueryResult<Resource> => {
    local.currentParams = params || {};
    local.params = stringify({ ...pagination, ...params, ...defaultParams });
    return useSwr<ITableList<Resource>>(`${parseURL(url, params)}?${local.params}`, request, {
      onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
        if (!retryCount) return;
        if (retryCount >= 2) return;
        if (error && error.status === 404) return;

        // retry after 5 seconds
        setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
      },
    });
  };

  const useSWRFind = (id: ResourceId, params?: ResourceParams): IUseSWRFindResult<Resource> => {
    local.id = id as string;
    return useSwr<Resource>(`${parseURL(url, params)}/${id}`, request, {
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
      swrTrigger(`${parseURL(url, local.currentParams)}?${local.params}`);
    } else {
      swrTrigger(`${parseURL(url, local.currentParams)}/${local.id}`);
    }
  };

  const mutate = (type: 'query' | 'find', data: any) => {
    if (type === 'query') {
      swrMutate(`${parseURL(url, local.currentParams)}?${local.params}`, data);
    } else {
      swrMutate(`${parseURL(url, local.currentParams)}/${local.id}`, data);
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
