import React, { useState } from 'react';
import Table, { TableProps, PaginationConfig } from 'antd/lib/table';
import { ParsedUrlQueryInput } from 'querystring';
import { ITableListItem } from '@/typings/server';
import { IUseResuful } from '../useRestful/useRestful';

const paginationInitial = {
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showTotal: (total: number) => <span>共 {total} 条</span>,
};

function useTable<Resource>(
  columns: Array<Object>,
  resource: IUseResuful<any>,
  params: ParsedUrlQueryInput,
  options: any,
) {
  const [pagination, setPagination] = useState<PaginationConfig>(paginationInitial);
  const { data, error } = resource.useQuery(params);
  const loading: boolean = !!data || !!error;

  const handleTableChange: TableProps<Resource>['onChange'] = paginationRet => {
    setPagination(paginationRet);
  };

  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={data && data.records}
      rowKey={(record: ITableListItem) => record.id}
      pagination={pagination}
      onChange={handleTableChange}
      {...options}
    />
  );
}
export default useTable;
