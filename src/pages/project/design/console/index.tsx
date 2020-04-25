import React from 'react';
import { Card, Layout, Button } from 'antd';
import get from 'lodash/get';
import { createUseRestful, useVisualLayout } from '@/hooks';
import { MODULES_API } from '@/services/resources';
import { IModule } from '@/typings/types';
import { ConnectProps } from '@/models/connect';
import classNamesBind from 'classnames/bind';
import { PlusOutlined } from '@ant-design/icons';
import { queryModalVisual } from '@/components/Modules';
import styles from './index.less';

const cx = classNamesBind.bind(styles);

const { Content, Sider } = Layout;

export interface ProductDesignProps extends ConnectProps {}

const ProductDesign: React.FC<ProductDesignProps> = props => {
  const productId = get(props, 'match.params.productId');
  const module = createUseRestful<IModule>(MODULES_API);
  const { data: moduleData } = module.useSWRQuery({ productId });
  const { render, addVisualBlock } = useVisualLayout([]);

  const handleAddModule = (module_: IModule) => {
    addVisualBlock({
      key: Math.floor(Math.random() * 10000),
      visual: queryModalVisual(module_.type)?.[0],
      module: module_,
    });
  };

  return (
    <Layout>
      <Sider className={styles.sider} width={250}>
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
      <Content className={styles.content}>
        <div style={{ position: 'relative' }}>{render()}</div>
      </Content>
    </Layout>
  );
};

export default ProductDesign;
