import { useAntdTable } from '@umijs/hooks';
import { ICreateUseRestful } from '../createUseRestful/createUseRestful';

function useTable<Resource>(resource: ICreateUseRestful<any>, params: any = {}, options = {}) {
  const result = useAntdTable<any, any>(
    () => resource.query({ ...params }),
    Object.entries(params).map(item => item[1]),
    {
      formatResult: data => ({
        total: data && data.total,
        data: data && data.records,
      }),
      ...options,
    },
  );

  const pagination = {
    showQuickJumper: true,
    showSizeChanger: true,
    hideOnSinglePage: true,
    showTotal: (total: number) => `共 ${total} 条`,
  };

  result.tableProps.pagination = {
    ...result.tableProps.pagination,
    ...pagination,
  };

  return result;
}
export default useTable;
