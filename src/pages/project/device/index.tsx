import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { get } from 'lodash';
import { BlockOutlined } from '@ant-design/icons';
import { Card, Layout, Menu, Button, Spin } from 'antd';
import { useRestful, useFormModal } from '@/hooks';
import { PRODUCTS_API, DEVICES_API } from '@/services/resources';
import { Product, Device } from '@/services/resources/models';
import { ConnectProps } from '@/models/connect';
import styles from './index.less';
import DeviceTable from './components/DeviceTable/index';
import CreateDeviceFMC, { CreateDeviceFMCProps } from './components/modules/CreateDeviceFMC';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

interface ManageProps extends FormComponentProps, ConnectProps {}

const DeviceLayout: React.FC<ManageProps> = props => {
  const projectId = get(props, 'match.params.id');
  const [productId, setProductId] = useState<string>('');
  const [random, setRandom] = useState<number>(0); // 使用随机数刷新表格依赖
  const productResource = useRestful<Product>(PRODUCTS_API);
  const deviceResource = useRestful<Device>(DEVICES_API);
  const deviceModal = useFormModal<CreateDeviceFMCProps>(CreateDeviceFMC, deviceResource, {
    title: '创建设备',
    callback: () => setRandom(Math.random()),
  });
  const { data: productData } = productResource.useSWRQuery({ projectId });

  const handleCreateDevice = () => {
    deviceModal.show({ productId, productList: productData ? productData.records : [] });
  };

  const handleMenuChange = (record: string) => {
    setProductId(record);
  };

  useEffect(() => {
    if (productData && productData.records.length > 0) {
      handleMenuChange(`${productData.records[0].id}`);
    }
  }, [productData]);

  return (
    <PageHeaderWrapper>
      <Card className={styles.header} style={{ marginBottom: 6 }} bodyStyle={{ padding: 12 }}>
        <div className={styles.right}>
          <Button onClick={handleCreateDevice} type="primary">
            创建设备
          </Button>
        </div>
      </Card>

      <Card className={styles.layout} bodyStyle={{ padding: 0 }}>
        <Layout>
          <Sider className={styles.sider}>
            <Menu
              mode="inline"
              selectedKeys={[productId]}
              defaultSelectedKeys={[productId]}
              defaultOpenKeys={['product']}
            >
              <SubMenu
                key="product"
                title={
                  <span>
                    <BlockOutlined />
                    产品列表
                  </span>
                }
              >
                {productData &&
                  productData.records.map(item => (
                    <Menu.Item onClick={() => handleMenuChange(`${item.id}`)} key={item.id}>
                      {item.name}
                    </Menu.Item>
                  ))}
              </SubMenu>
            </Menu>
          </Sider>
          <Content className={styles.content}>
            {productId ? (
              <DeviceTable projectId={projectId} productId={productId} random={random} />
            ) : (
              <Spin></Spin>
            )}
          </Content>
        </Layout>
      </Card>
    </PageHeaderWrapper>
  );
};

export default DeviceLayout;
