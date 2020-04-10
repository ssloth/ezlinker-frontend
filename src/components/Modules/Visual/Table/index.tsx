import React from 'react';
import { Table } from 'antd';
import { IVisualBlock } from '../../type';

const structure2columnsAdapter = (structure: any[] | undefined) => {
  const baseField = [{ title: '时间', dataIndex: 'createTime', key: 'createTime' }];

  if (!structure) return baseField;

  const columns = structure
    .map((item: any) => ({
      title: item.description,
      dataIndex: `data.${item.field}`,
      key: item.field,
      render: (field: any) => JSON.stringify(field),
    }))
    .concat(baseField as any);

  return columns;
};

export interface IVisualTable extends IVisualBlock {

}

const VisualTable = (props: IVisualTable) => {
  const { module } = props;
  const columns = structure2columnsAdapter(module.dataAreas);

  return <Table size="small" rowKey="key" columns={columns}></Table>;
};

export default VisualTable;
