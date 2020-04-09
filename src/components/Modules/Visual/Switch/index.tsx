import React from 'react';
import { Card, Switch, Form } from 'antd';
import { IVisualBlock } from '../../type';

const FormItem = Form.Item;

export interface IVisualSwitch extends IVisualBlock {
  key: number | string;
  structure: any;
}

const VisualSwitch = (props: IVisualSwitch) => (
  <Card>
    <FormItem label={props.module.name}>
      <Switch></Switch>
    </FormItem>
  </Card>
);

export default VisualSwitch;
