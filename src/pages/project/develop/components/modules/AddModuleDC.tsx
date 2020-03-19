import classNames from 'classnames/bind';
import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { ModuleTemplate } from '@/services/resources/models';
import { SYSTEM_MODULE_API } from '@/services/resources/index';
import { useFormDrawer, useRestful } from '@/hooks';
import styles from './AddModuleDC.less';
import CreateModuleFDC from './CreateModuleFDC';

const cx = classNames.bind(styles);
interface IOperationProductDCProps {
  productId: string;
}

const AddModuleDC = (props: IOperationProductDCProps) => {
  const { productId } = props;
  const module = useRestful<ModuleTemplate>(SYSTEM_MODULE_API);
  const { data: moduleData } = module.useSWRQuery({ productId });

  const createModule = useFormDrawer(CreateModuleFDC, module, {
    title: '模块',
    width: 530,
  });

  const handleSelectModule = (record: ModuleTemplate) => {
    createModule.create({
      productId,
      type: record.name,
    });
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
              <img src={item.icon} alt=""/>
            </div>
            <div className={cx('left')}>
              <div className={cx('name')}>{item.name}</div>
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
