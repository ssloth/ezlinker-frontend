import React from 'react';
import { Row, Tabs, Col, Form, Input, Button } from 'antd';

const FormItem = Form.Item;
const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
};

const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 3 },
};

const EMQXSettingTabPane = () => (
  <Row>
    <Col style={{ borderRight: '1px solid #797f8f99' }} md={10}>
      <FormItem {...layout} label="ip地址">
        <Input></Input>
      </FormItem>
      <FormItem {...layout} label="TCP端口">
        <Input></Input>
      </FormItem>
      <FormItem {...layout} label="API端口">
        <Input></Input>
      </FormItem>
      <FormItem {...layout} label="秘钥">
        <Input></Input>
      </FormItem>

      <FormItem {...buttonItemLayout}>
        <Button type="primary">提交</Button>
      </FormItem>
    </Col>

    <Col offset={1} md={12}>
      配置EMQ节点
    </Col>
  </Row>
);

export default EMQXSettingTabPane;
