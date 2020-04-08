import React from 'react';
import { Card, Layout, Button } from 'antd';
import get from 'lodash/get';
import { useRestful } from '@/hooks';
import { MODULES_API } from '@/services/resources';
import { IModule } from '@/typings/types';
import { ConnectProps } from '@/models/connect';
import classNamesBind from 'classnames/bind';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

const cx = classNamesBind.bind(styles);

const { Content, Sider } = Layout;


export interface ProductDesignProps extends ConnectProps {}

const ProductDesign: React.FC<ProductDesignProps> = props => {
  const productId = get(props, 'match.params.productId');
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

          </Card>
        </Content>
      </Layout>
    </Card>
  );
};

export default ProductDesign;
