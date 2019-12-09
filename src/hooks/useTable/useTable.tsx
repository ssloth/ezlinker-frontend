import { useAntdTable } from '@umijs/hooks';
import { IUseResuful } from '../useRestful/useRestful';

function useTable<Resource>(resource: IUseResuful<any>, params: any, options = {}) {
  const result = useAntdTable<any, any>(() => resource.query({ ...params }), Object.keys(params), {
    formatResult: res => ({
      total: res.total,
      data: res.records,
    }),
    ...options,
  });

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
