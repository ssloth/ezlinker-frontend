import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useWindowSize } from 'react-use';
import { FormComponentProps } from 'antd/lib/form';
import { get } from 'lodash';
import router from 'umi/router';
import { Card, Layout, Menu, Icon } from 'antd';
import { useRestful } from '@/hooks';
import { PRODUCTS_API } from '@/services/resources';
import { Product } from '@/services/resources/models';
import { ConnectProps } from '@/models/connect';
import styles from './Layout.less';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

interface ManageProps extends FormComponentProps, ConnectProps {}

const DeviceLayout: React.FC<ManageProps> = props => {
  const projectId = get(props, 'match.params.id');
  const [productId, setProductId] = useState<string>('');
  const url = get(props, 'match.url');
  const productResource = useRestful<Product>(PRODUCTS_API);
  const { data: productData } = productResource.useSWRQuery({ projectId });
  const { height } = useWindowSize();

  const handleMenuChange = (record: string) => {
    setProductId(record);
    router.push(`${url}/${record}`);
  };

  useEffect(() => {
    if (productData && productData.records.length > 0) {
      handleMenuChange(`${productData.records[0].id}`);
    }
  }, [productData]);

  return (
    <PageHeaderWrapper
      tabActiveKey={productId}
      // content={[
      //   <Button style={{ marginLeft: 5 }} type="primary">
      //     创建设备
      //   </Button>,
      //   <Button style={{ marginLeft: 15 }} type="primary">
      //     操作1
      //   </Button>,
      //   <Button style={{ marginLeft: 15 }} type="primary">
      //     操作1
      //   </Button>,
      //   <Button style={{ marginLeft: 15 }} type="primary">
      //     操作1
      //   </Button>,
      //   <Button style={{ marginLeft: 15 }} type="primary">
      //     操作1
      //   </Button>,
      //   <Button style={{ marginLeft: 15 }} type="primary">
      //     操作1
      //   </Button>,
      // ]}
    >
      <Card className={styles.layout} bodyStyle={{ padding: 0, height: height - 150 }}>
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
          <Content className={styles.content}>{props.children}</Content>
        </Layout>
      </Card>
    </PageHeaderWrapper>
  );
};

export default DeviceLayout;
