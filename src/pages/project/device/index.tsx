import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormComponentProps } from 'antd/lib/form';
import { get } from 'lodash';
import { Card, Layout, Menu, Icon, Button } from 'antd';
import { useRestful } from '@/hooks';
import { PRODUCTS_API } from '@/services/resources';
import { Product } from '@/services/resources/models';
import { ConnectProps } from '@/models/connect';
import styles from './index.less';
import DeviceTable from './components/DeviceTable/index';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

interface ManageProps extends FormComponentProps, ConnectProps {}

const DeviceLayout: React.FC<ManageProps> = props => {
  const projectId = get(props, 'match.params.id');
  const [productId, setProductId] = useState<string>('');
  const productResource = useRestful<Product>(PRODUCTS_API);
  const { data: productData } = productResource.useSWRQuery({ projectId });

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
          <Button type="primary">创建设备</Button>
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
                    <Icon type="block" />
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
            <DeviceTable productId={productId} />
          </Content>
        </Layout>
      </Card>
    </PageHeaderWrapper>
  );
};

export default DeviceLayout;
