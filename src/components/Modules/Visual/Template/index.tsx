import React from 'react';
import { Switch, Form } from 'antd';
import { TableProps } from 'antd/lib/table';

const FormItem = Form.Item;

export interface IVisualTable extends TableProps<any> {
  key: number | string;
  structure: any;
}

const VisualTemplate = (props: IVisualTable) => {
  const { key, structure } = props;

  return (
    <FormItem label={}>
      <Switch></Switch>
    </FormItem>
  );
};

export default VisualTable;
