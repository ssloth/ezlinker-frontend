import { Card, Table, Tag } from 'antd';
import React, { forwardRef } from 'react';
import { TableProps } from 'antd/lib/table';

const renderTypeTag = (type: number) => {
  const typeMap = {
    1: ['#5b8d43', '上线'],
    2: ['', '掉线'],
  };
  const [color, text] = typeMap[type];
  return <Tag color={color}>{text}</Tag>;
};

const ModuleLoginLogCard = forwardRef(
  ({ tableProps }: { tableProps: TableProps<any>; height: number }) => {
    const columns = [
      {
        title: '编号',
        dataIndex: 'sn',
      },
      {
        title: '设备名',
        dataIndex: 'deviceName',
      },
      {
        title: '模块',
        dataIndex: 'moduleName',
      },
      {
        title: '事件',
        dataIndex: 'type',
        render: (type: number) => renderTypeTag(type),
      },
      {
        title: '时间',
        dataIndex: 'createTime',
      },
    ];

    return (
      <Card
        style={{ minHeight: 300 }}
        title="设备上下线日志"
        size="small"
        bodyStyle={{ padding: 0 }}
      >
        <Table rowKey="id" columns={columns} size="small" {...tableProps}></Table>
      </Card>
    );
  },
);

export default ModuleLoginLogCard;
