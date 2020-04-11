import { Card, Table } from 'antd';
import React, { forwardRef } from 'react';
import { TableProps } from 'antd/lib/table';

const UserLoginLogCard = forwardRef(
  ({ tableProps }: { tableProps: TableProps<any>; height: number }) => {
    const columns = [
      {
        title: '用户',
        dataIndex: 'username',
      },
      {
        title: 'IP',
        dataIndex: 'ip',
      },
      {
        title: '地址',
        dataIndex: 'location',
      },
      {
        title: '时间',
        dataIndex: 'createTime',
      },
    ];

    return (
      <Card style={{ minHeight: 300 }} title="登录日志" size="small" bodyStyle={{ padding: 0 }}>
        <Table rowKey="id" columns={columns} size="small" {...tableProps}></Table>
      </Card>
    );
  },
);

export default UserLoginLogCard;
