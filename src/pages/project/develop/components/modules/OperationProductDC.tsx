import classNames from 'classnames/bind';
import React from 'react';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { ModuleTemplate, Feature } from '@/services/resources/models';
import { MODULES_API, FEATURES_API } from '@/services/resources/index';
import { useFormDrawer, useRestful } from '@/hooks';
import styles from './OperationProductDC.less';
import CreateModuleFDC from './CreateModuleFDC';
import CreateFeatureFDC from './CreateFeatureFDC';
// import { useDrawer } from '@/hook';

const cx = classNames.bind(styles);
interface IOperationProductDCProps {
  productId: string;
}

const OperationProductDC = (props: IOperationProductDCProps) => {
  const { productId } = props;
  const module = useRestful<ModuleTemplate>(MODULES_API);
  const feature = useRestful<Feature>(FEATURES_API);
  const { data: moduleData } = module.useSWRQuery({ productId });
  const { data: featureData } = feature.useSWRQuery({ productId });

  const createModule = useFormDrawer(CreateModuleFDC, module, {
    title: '模块',
    width: 575,
  });

  const createFeature = useFormDrawer(CreateFeatureFDC, feature, {
    title: '功能',
    width: 575,
  });

  const handleAddModule = () => {
    createModule.create({
      productId,
    });
  };

  const handleEditModule = (record: ModuleTemplate) => {
    createModule.edit(record);
  };

  const handleAddFeature = () => {
    createFeature.create({
      productId,
    });
  };

  const handleEditFeature = (record: Feature) => {
    createFeature.edit(record);
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
        {moduleData &&
          moduleData.records.map(item => (
            <Card.Grid className={cx('module-item')} key={item.id}>
              <div className={cx('logo')}></div>
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

      <Button
        onClick={handleAddFeature}
        type="dashed"
        style={{ width: '100%', marginBottom: 8 }}
        icon={<PlusOutlined />}
      >
        创建功能
      </Button>

      <div className={cx('feature-list')}>
        {featureData &&
          featureData.records.map(item => (
            <Card.Grid className={cx('feature-item')} key={item.id}>
              <div onClick={() => handleEditFeature(item)} className={cx('left')}>
                <div className={cx('name')}>{item.name}</div>
              </div>
            </Card.Grid>
          ))}
      </div>

      {createModule.render()}
      {createFeature.render()}
    </div>
  );
};

export default OperationProductDC;
