import React from 'react';
import { Tabs, Card, Row, Col, Form, Input, Alert, message, Divider, Button } from 'antd';

const { TabPane } = Tabs;
const FormItem = Form.Item;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
};

const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 3 },
};

const Index = () => (
  <Card bodyStyle={{ paddingTop: 5 }}>
    <Tabs>
      {[
        { tab: 'EMQX配置节点', key: '1' },
        { tab: '阿里云配置', key: '2' },
        { tab: '视频流配置', key: '3' },
        { tab: '短信秘钥配置', key: '4' },
        { tab: '邮箱秘钥配置', key: '5' },
      ].map(item => (
        <TabPane style={{ paddingTop: 20 }} tab={item.tab} key={item.key}>
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
              当某个页面需要向用户显示警告的信息时。
              非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。
            </Col>
          </Row>
        </TabPane>
      ))}
    </Tabs>
  </Card>
);

export default Index;
