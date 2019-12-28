import React from 'react';
import { Layout, Menu, Icon, Tabs, Form, Button } from 'antd';
import { connect } from 'dva';
import { FormProps } from 'antd/lib/form';
import styles from './VirtualDevice.less';
import Terminal from './Terminal';
import TableForm from './TableForm';
import { useSocketIO } from '@/hooks';
import { ConnectProps } from '@/models/connect';
import { Device } from '@/services/resources/models';

const { Sider, Content, Footer } = Layout;
const { TabPane } = Tabs;

export interface IVirtualDeviceProps extends FormProps, ConnectProps {
  VirtualDevice: any;
  devices: Device[];
}

const VirtualDevice = (props: IVirtualDeviceProps) => {
  const {
    form,
    VirtualDevice: { visible },
    dispatch,
    devices,
  } = props;
  const { modules } = devices;
  const { messages } = useSocketIO('xxxx', modules[0].id);

  return (
    <div
      className={styles['virtual-device-manage']}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <Button
        onClick={() => {
          if (dispatch) dispatch({ type: 'VirtualDevice/cancel' });
        }}
      >
        关闭
      </Button>
      <Layout>
        <Sider>
          <Menu>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>设备A</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <Header></Header> */}
          <Content>
            <Tabs type="card">
              <TabPane tab="模块A" key="1">
                {messages}
                <Terminal></Terminal>
              </TabPane>
            </Tabs>
          </Content>
          <Footer>
            <TableForm form={form} fields={[]}></TableForm>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

// eslint-disable-next-line no-shadow
export default connect(({ VirtualDevice }: { VirtualDevice: any }) => ({ VirtualDevice }))(
  Form.create()(VirtualDevice),
);
