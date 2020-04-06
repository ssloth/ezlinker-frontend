import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';

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

export interface IVisualTable extends TableProps<any> {
  structure: any;
}

const VisualTable = (props: IVisualTable) => {
  const { structure, ...others } = props;

  const columns = structure2columnsAdapter(structure);

  return <Table rowKey="key" columns={columns} {...others}></Table>;
};

export default VisualTable;
