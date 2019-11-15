import React, { useState } from 'react';
import Table from 'antd/lib/table';
import { IUseResuful } from '@/hook/useRestful';

const paginationInitial = {
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showTotal: total => <span>共 {total} 条</span>,
};

function useTable(columns: Array<Object>, resource: IUseResuful, params: Object, options: Object) {
  const [pagination, setPagination] = useState(paginationInitial);
  const { data, error } = resource.query(params);
  const loading = !!data || error;
  const { list } = data;

  const handleTableChange = ({ current }) => setPagination(current);

  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={list}
      rowKey={record => record.key}
      pagination={pagination}
      onChange={handleTableChange}
      {...options}
    />
  );
}
export default useTable;
