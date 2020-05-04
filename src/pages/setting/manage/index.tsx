import React from 'react';
import { Tabs, Card } from 'antd';
import EMQXSetting from './components/EMQXSetting';

const { TabPane } = Tabs;

/**
        { tab: 'EMQX配置节点', key: '1' },
        { tab: '阿里云配置', key: '2' },
        { tab: '视频流配置', key: '3' },
        { tab: '短信秘钥配置', key: '4' },
        { tab: '邮箱秘钥配置', key: '5' },
 */

const Index = () => (
  <Card bodyStyle={{ paddingTop: 5 }}>
    <Tabs>
      <TabPane style={{ paddingTop: 20 }} tab="EMQX配置节点" key="1">
        <EMQXSetting></EMQXSetting>
      </TabPane>
      <TabPane style={{ paddingTop: 20 }} tab="EMQX配置节点" key="2">
        <EMQXSetting></EMQXSetting>
      </TabPane>
      <TabPane style={{ paddingTop: 20 }} tab="EMQX配置节点" key="3">
        <EMQXSetting></EMQXSetting>
      </TabPane>
      <TabPane style={{ paddingTop: 20 }} tab="EMQX配置节点" key="4">
        <EMQXSetting></EMQXSetting>
      </TabPane>
      <TabPane style={{ paddingTop: 20 }} tab="EMQX配置节点" key="5">
        <EMQXSetting></EMQXSetting>
      </TabPane>
    </Tabs>
  </Card>
);

export default Index;
