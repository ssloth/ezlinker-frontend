import { Card, Table, Tag } from 'antd';
import React from 'react';
import { TableProps } from 'antd/lib/table';

const getTypeTag = (type: number) => {
  const typeMap = {
    1: ['#5b8d43', '上线'],
    2: ['drang', '掉线'],
  };
  const [color, text] = typeMap[type];
  return <Tag color={color}>{text}</Tag>;
};

const ModuleLoginLogCard = ({ tableProps }: { tableProps: TableProps<any> }) => {
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
      render: (type: number) => getTypeTag(type),
    },
    {
      title: '时间',
      dataIndex: 'createTime',
    },
  ];

  return (
    <Card title="设备上下线日志" size="small" bodyStyle={{ padding: 0 }}>
      <Table rowKey="id" columns={columns} size="small" {...tableProps}></Table>
    </Card>
  );
};

export default ModuleLoginLogCard;
