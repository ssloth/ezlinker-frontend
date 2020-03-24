import classNames from 'classnames/bind';
import React from 'react';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { ModuleTemplate } from '@/services/resources/models';
import { MODULES_API } from '@/services/resources/index';
import { useRestful, useDrawer } from '@/hooks';
import styles from './OperationProductDC.less';
import AddModuleDC from './AddModuleDC';

const cx = classNames.bind(styles);
interface IOperationProductDCProps {
  productId: string;
}

const OperationProductDC = (props: IOperationProductDCProps) => {
  const { productId } = props;
  const module = useRestful<ModuleTemplate>(MODULES_API);
  const { data: moduleData } = module.useSWRQuery({ productId });

  const addModule = useDrawer(AddModuleDC, {
    title: '选择模块类型',
    width: 450,
  });

  const handleAddModule = () => {
    addModule.show({
      productId,
      cancel: addModule.cancle,
    });
  };

  const handleEditModule = (item: any) => {
    item();
  };

  return (
    <div>
      <Button
        onClick={handleAddModule}
        type="dashed"
        style={{ width: '100%', marginBottom: 8 }}
        icon={<PlusOutlined />}
      >
        创建模块
      </Button>
      <Card
        className={cx('module-list')}
        style={{ marginBottom: 24 }}
        bordered={false}
        loading={!moduleData}
        bodyStyle={{ padding: 0 }}
      >
        {moduleData?.records.map(item => (
          <Card.Grid className={cx('module-item')} key={item.id}>
            <div className={cx('logo')}>
              <img src={item.icon} alt="" />
            </div>
            <div className={cx('left')}>
              <div className={cx('name')}>{item.name}</div>
              <div className={cx('description')}>{item.description}</div>
            </div>
            <div className={cx('right')} onClick={() => handleEditModule(item)}>
              <RightOutlined></RightOutlined>
            </div>
          </Card.Grid>
        ))}
      </Card>
      {addModule.render()}
    </div>
  );
};

export default OperationProductDC;
