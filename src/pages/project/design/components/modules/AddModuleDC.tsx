import classNames from 'classnames/bind';
import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { IModuleTemplate } from '@/typings/types';
import { SYSTEM_MODULE_API, MODULES_API } from '@/services/resources/index';
import { useFormDrawer, createUseRestful } from '@/hooks';
import styles from './AddModuleDC.less';
import CreateModuleFDC from './CreateModuleFDC';

const cx = classNames.bind(styles);
interface IOperationProductDCProps {
  productId: string;
  cancel: Function;
}

const AddModuleDC = (props: IOperationProductDCProps) => {
  const { productId, cancel } = props;
  const systemModule = createUseRestful<IModuleTemplate>(SYSTEM_MODULE_API);
  const templateModule = createUseRestful<IModuleTemplate>(MODULES_API);
  const { data: moduleData } = systemModule.useSWRQuery({ productId });

  const createModule = useFormDrawer(CreateModuleFDC, templateModule, {
    title: '模块',
    width: 530,
  });

  const handleSelectModule = (record: IModuleTemplate) => {
    createModule.create(
      {
        productId,
        type: record.name,
      },
      { callback: cancel },
    );
  };

  return (
    <div>
      <Card
        className={cx('module-list')}
        style={{ marginBottom: 24 }}
        bordered={false}
        loading={!moduleData}
        bodyStyle={{ padding: 0 }}
      >
        {(moduleData as any)?.map((item: any) => (
          <Card.Grid className={cx('module-item')} key={item.id}>
            <div className={cx('logo')}>
              <img src={item.icon} alt="" />
            </div>
            <div className={cx('left')}>
              <div className={cx('name')}>{item.label}</div>
              <div className={cx('description')}>{item.description}</div>
            </div>
            <div className={cx('right')} onClick={() => handleSelectModule(item)}>
              <RightOutlined></RightOutlined>
            </div>
          </Card.Grid>
        ))}
      </Card>
      {createModule.render()}
    </div>
  );
};

export default AddModuleDC;
