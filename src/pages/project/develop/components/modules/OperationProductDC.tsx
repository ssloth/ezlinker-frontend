import classNames from 'classnames/bind';
import React from 'react';
import { Button, Card, Icon } from 'antd';
import CreateModuleDC from './CreateModuleFDC';
import styles from './OperationProductDC.less';
import { Module } from '@/services/resources/models';
import { MODULES_API } from '@/services/resources/index';
import { useFormDrawer, useRestful } from '@/hooks';
// import { useDrawer } from '@/hook';

const cx = classNames.bind(styles);
interface IOperationProductDCProps {
  productId: string;
}

const OperationProductDC = (props: IOperationProductDCProps) => {
  const { productId } = props;
  const module = useRestful<Module>(MODULES_API);
  const { data } = module.useQuery({ productId });

  const createDrawer = useFormDrawer(CreateModuleDC, module, {
    title: '创建&编辑 模块',
    width: 300,
  });

  const handleAddModule = () => {
    createDrawer.create({
      productId,
    });
  };

  const handleEditModule = (record: Module) => {
    createDrawer.edit(record);
  };

  return (
    <div>
      <Button
        onClick={handleAddModule}
        type="dashed"
        style={{ width: '100%', marginBottom: 8 }}
        icon="plus"
      >
        创建模块
      </Button>
      <Card
        className={cx('module-list')}
        style={{ marginBottom: 24 }}
        bordered={false}
        loading={!data}
        bodyStyle={{ padding: 0 }}
      >
        {data &&
          data.records.map(item => (
            <Card.Grid className={cx('module-item')} key={item.id}>
              <div className={cx('logo')}></div>
              <div className={cx('left')}>
                <div className={cx('name')}>{item.name}</div>
                <div className={cx('description')}>{item.description}</div>
              </div>
              <div className={cx('right')} onClick={() => handleEditModule(item)}>
                <Icon type="right"></Icon>
              </div>
            </Card.Grid>
          ))}
      </Card>

      <Button
        onClick={handleAddModule}
        type="dashed"
        style={{ width: '100%', marginBottom: 8 }}
        icon="plus"
      >
        创建功能
      </Button>

      {createDrawer.render()}
    </div>
  );
};

export default OperationProductDC;
