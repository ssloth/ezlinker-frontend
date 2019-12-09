import React from 'react';
import { Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { get } from 'lodash';
import { useRestful, useTable } from '@/hooks';
import { DEVICES_API } from '@/services/resources';
import { Device } from '@/services/resources/models';
import { ConnectProps } from '@/models/connect';

interface ManageProps extends FormComponentProps, ConnectProps {}

const Manage: React.FC<ManageProps> = props => {
  const projectId = get(props, 'match.params.id');
  const productId = get(props, 'match.params.productId');
  const deviceResource = useRestful<Device>(DEVICES_API);

  const tableProps = useTable(deviceResource, { productId, projectId });

  const columns: any[] = [];

  return <Table key="id" columns={columns} {...tableProps} />;
};

export default Manage;
