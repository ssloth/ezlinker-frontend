import React, { useState, useReducer } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Card, Layout, Button, message, Tabs } from 'antd';
import get from 'lodash/get';
import { useRestful, useVisualLayout } from '@/hooks';
import { MODULES_API } from '@/services/resources';
import { IModule } from '@/services/resources/models';
import { ConnectProps } from '@/models/connect';
import classNamesBind from 'classnames/bind';
import { PlusOutlined } from '@ant-design/icons';
import renderLayout from '@/modules/render';
import { IVisual } from '@/modules/Layout';
import styles from './index.less';

const cx = classNamesBind.bind(styles);

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface ProductDesignProps extends ConnectProps {}

const ProductDesign: React.FC<ProductDesignProps> = props => {
  const productId = get(props, 'match.params.productId');
  const initLayout = '';
  const { layoutRender, setLayout } = useVisualLayout(initLayout);
  const module = useRestful<IModule>(MODULES_API);
  const { data: moduleData } = module.useSWRQuery({ productId });

  const handleAddModule = (module_: IModule) => {};

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Layout>
        <Sider width={250}>
          <Card size="small" title="模块" className={cx('module-list')} extra={<Button></Button>}>
            {moduleData?.records.map(item => (
              <Card.Grid className={cx('module-item')} key={item.id}>
                <div className={cx('logo')}>
                  <img src={item.icon} alt="" />
                </div>
                <div className={cx('left')}>
                  <div className={cx('name')}>{item.name}</div>
                  <div className={cx('description')}>{item.description}</div>
                </div>
                <div className={cx('right')} onClick={() => handleAddModule(item)}>
                  <PlusOutlined></PlusOutlined>
                </div>
              </Card.Grid>
            ))}
          </Card>
        </Sider>
        <Content>
          <Card
            style={{ height: '100%' }}
            size="small"
            title="控制台"
            extra={<Button type="primary">保存</Button>}
          >
            <Tabs>
              {layouts.map(layout => (
                <TabPane>
                  <ResponsiveReactGridLayout
                    className="layout"
                    onLayoutChange={layout => setLayout(layout.keys, layout)}
                  >
                    {layout.render()}
                  </ResponsiveReactGridLayout>
                </TabPane>
              ))}
            </Tabs>
          </Card>
        </Content>
      </Layout>
    </Card>
  );
};

export default ProductDesign;
