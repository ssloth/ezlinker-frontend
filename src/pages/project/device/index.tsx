import React from 'react';
import { Table, Divider } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { get } from 'lodash';
import { useRestful, useTable } from '@/hooks';
import { DEVICES_API } from '@/services/resources';
import { Device } from '@/services/resources/models';
import { ConnectProps } from '@/models/connect';

interface ManageProps extends FormComponentProps, ConnectProps {}

const DevicePage: React.FC<ManageProps> = props => {
  const projectId = get(props, 'match.params.id');
  const productId = get(props, 'match.params.productId');
  const deviceResource = useRestful<Device>(DEVICES_API);

  const { tableProps } = useTable(deviceResource, { productId, projectId });

  const handleClick = (record: Device) => record;

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
      float: 'right',
      width: 160,
      render: (record: Device) => [
        <a onClick={() => handleClick(record)}>编辑</a>,
        <Divider type="vertical"></Divider>,
        <a onClick={() => handleClick(record)}>删除</a>,
        <Divider type="vertical"></Divider>,
        <a onClick={() => handleClick(record)}>详情 &gt;</a>,
      ],
    },
  ];

  return <Table rowKey="id" columns={columns} {...tableProps} />;
};

export default DevicePage;
