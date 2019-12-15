import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { get } from 'lodash';
import { useRestful, useTable, useDrawer } from '@/hooks';
import { DEVICES_API } from '@/services/resources';
import { Device } from '@/services/resources/models';
import OperationDeviceDC from '../modules/OperationDeviceDC';

interface IDeviceTableProps {
  productId: string;
  random: any;
}

const renderState = (record: Device) => {
  if (!record.lastActive) return <Tag>未激活</Tag>;
  return <Tag color="green">在线</Tag>;
};

const DeviceTable: React.FC<IDeviceTableProps> = props => {
  const { productId, random } = props;
  const projectId = get(props, 'match.params.id');
  const deviceResource = useRestful<Device>(DEVICES_API);
  const operation = useDrawer(OperationDeviceDC);

  const { tableProps } = useTable(deviceResource, { productId, projectId, random });

  const handleClick = (record: Device) => record;
  const handleOperation = (record: Device) => {
    operation.show({ id: record.id });
  };

  const columns: any[] = [
    {
      title: '编号',
      dataIndex: 'sn',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      render: (record: Device) => renderState(record),
    },

    {
      title: '生产厂家',
      dataIndex: 'industry',
    },
    {
      title: '型号',
      dataIndex: 'model',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '标签',
      dataIndex: 'tags',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 175,
      render: (record: Device) => [
        <a onClick={() => handleClick(record)}>编辑</a>,
        <Divider type="vertical"></Divider>,
        <a onClick={() => handleClick(record)}>删除</a>,
        <Divider type="vertical"></Divider>,
        <a onClick={() => handleOperation(record)}>详情&gt;</a>,
      ],
    },
  ];

  return <Table rowKey="id" columns={columns} {...tableProps} />;
};

export default DeviceTable;
