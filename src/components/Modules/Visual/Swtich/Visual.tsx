import React from 'react';
import { Card, Switch, Form } from 'antd';

const FormItem = Form.Item;

export const SwitchVisual = (name: string) => (
  <Card>
    <FormItem label={name}>
      <Switch></Switch>
    </FormItem>
  </Card>
);
