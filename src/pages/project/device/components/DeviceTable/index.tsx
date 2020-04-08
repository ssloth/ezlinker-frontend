import React, { forwardRef, Ref } from 'react';
import { Badge, Tag } from 'antd';
import { Link } from 'umi';
import { useRestful, useDrawer } from '@/hooks';
import { DEVICES_API } from '@/services/resources';
import { IDevice } from '@/typings/types';
import ProTable, { ProTableProps } from '@ant-design/pro-table';
import { tableData2ProTableAdapter } from '@/utils/adapter';
import OperationDeviceDC from '../modules/OperationDeviceDC';
import { getDeviceStatus, DEVICE_STATUS } from '../../utils';

interface IDeviceTableProps extends ProTableProps<any, any> {
  ref: Ref<any>;
  projectId: string;
  productId: string | undefined;
}

const renderState = (record: IDevice) => {
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

const DeviceTable: React.FC<IDeviceTableProps> = forwardRef((props, ref) => {
  const { productId, projectId } = props;
  const deviceResource = useRestful<IDevice>(DEVICES_API);
  const operation = useDrawer(OperationDeviceDC, {
    title: '操作设备',
    width: 500,
  });

  // const handleClick = (record: Device) => record;
  const handleOperation = (record: IDevice) => {
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
      render: (record: IDevice) => renderState(record),
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
      render: (tags: string[]) => tags.map(tag => <Tag key={tag}>{tag}</Tag>),
    },
    {
      title: '操作',
      fixed: 'right',
      valueType: 'option',
      width: 200,
      render: (record: IDevice) => [
        <Link to={`/project/${projectId}/device/${record.id}`}>查看数据</Link>,
        <a onClick={() => handleOperation(record)}>操作&gt;</a>,
      ],
    },
  ];

  return (
    <ProTable
      rowKey={record => record.id}
      actionRef={ref as any}
      columns={columns}
      request={params =>
        (productId === undefined
          ? Promise.resolve({ data: [], current: 0, pageSize: 10 })
          : deviceResource
              .query({ ...params, productId, projectId })
              .then(tableData2ProTableAdapter))
      }
      {...props}
    ></ProTable>
  );
});

export default DeviceTable;
