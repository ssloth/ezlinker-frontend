import React from 'react';
import { Table, Divider, Badge, Tag } from 'antd';
import { Link } from 'umi';
import { useRestful, useTable, useDrawer } from '@/hooks';
import { DEVICES_API } from '@/services/resources';
import { Device } from '@/services/resources/models';
import OperationDeviceDC from '../modules/OperationDeviceDC';
import { getDeviceStatus, DEVICE_STATUS } from '../../utils';

interface IDeviceTableProps {
  projectId: string;
  productId: string;
  random: any;
}

const renderState = (record: Device) => {
  const status = getDeviceStatus(record);
  const statusMap = {
    [DEVICE_STATUS.inactivated]: ['#666666', '未激活'],
    [DEVICE_STATUS.active]: ['#666666', '激活中'],
    [DEVICE_STATUS.normal]: ['green', '运行正常'],
    [DEVICE_STATUS.warning]: ['gold', '模块异常'],
    [DEVICE_STATUS.abnormal]: ['#f00', '设备异常'],
  };
  const [color, text] = statusMap[status] || [];
  return <Badge color={color} text={text}></Badge>;
};

const DeviceTable: React.FC<IDeviceTableProps> = props => {
  const { productId, random, projectId } = props;
  const deviceResource = useRestful<Device>(DEVICES_API);
  const operation = useDrawer(OperationDeviceDC, {
    title: '操作设备',
    width: 500,
  });

  const { tableProps } = useTable(deviceResource, { productId, projectId, random });

  // const handleClick = (record: Device) => record;
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
    },
    {
      title: '状态',
      width: 120,
      render: (record: Device) => renderState(record),
    },
    {
      title: '生产厂家',
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
        <Link to={`/project/${projectId}/device/${record.id}`}>查看数据</Link>,
        <Divider type="vertical"></Divider>,
        <a onClick={() => handleOperation(record)}>操作&gt;</a>,
      ],
    },
  ];

  return <Table style={{ width: '100%' }} rowKey="id" columns={columns} {...tableProps} />;
};

export default DeviceTable;
