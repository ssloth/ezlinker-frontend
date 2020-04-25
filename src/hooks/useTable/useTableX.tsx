import React, { useState } from 'react';
import Table, { TableProps, TablePaginationConfig } from 'antd/lib/table';
import { ParsedUrlQueryInput } from 'querystring';
import { ITableListItem } from '@/typings/server';
import { ICreateUseRestful } from '../createUseRestful/createUseRestful';

const paginationInitial = {
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showTotal: (total: number) => <span>共 {total} 条</span>,
};

function useTable<Resource>(
  columns: Array<Object>,
  resource: ICreateUseRestful<any>,
  params: ParsedUrlQueryInput,
  options: any,
) {
  const [pagination, setPagination] = useState<TablePaginationConfig>(paginationInitial);
  const { data, error } = resource.useSWRQuery(params);
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
