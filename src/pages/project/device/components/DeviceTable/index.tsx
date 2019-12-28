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
  const operation = useDrawer(OperationDeviceDC, {
    title: '操作设备',
    width: 400,
  });

  const { tableProps } = useTable(deviceResource, { productId, projectId, random });

  const handleClick = (record: Device) => record;
  const handleOperation = (record: Device) => {
    operation.show(record);
  };

  const columns: any[] = [
    {
      title: '编号',
      dataIndex: 'sn',
      width: 200,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '状态',
      width: 80,
      render: (record: Device) => renderState(record),
    },

    {
      title: '生产厂家',
      width: 100,
      dataIndex: 'industry',
    },
    {
      title: '型号',
      width: 100,
      dataIndex: 'model',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (tags: string[]) => tags.map(tag => <Tag>{tag}</Tag>),
    },
    {
      title: '操作',
      fixed: 'right',
      width: 150,
      render: (record: Device) => [
        <a onClick={() => handleClick(record)}>查看数据</a>,
        <Divider type="vertical"></Divider>,
        <a onClick={() => handleOperation(record)}>操作&gt;</a>,
      ],
    },
  ];

  return (
    <>
      <Table rowKey="id" columns={columns} {...tableProps} /> {operation.render()}
    </>
  );
};

export default DeviceTable;
