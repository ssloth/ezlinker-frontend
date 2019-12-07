import { useAntdTable } from '@umijs/hooks';
import { IUseResuful } from '../useRestful/useRestful';

function useTable<Resource>(resource: IUseResuful<any>, deps: any[] = [], options = {}) {
  const params = deps;
  const result = useAntdTable<any, any>(() => resource.query({ ...params }), [...deps], {
    formatResult: res => ({
      total: res.data.pagination.total,
      data: res.data.list,
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
