import classNames from 'classnames/bind';
import React from 'react';
import { Button, Card } from 'antd';
import styles from './OperationDeviceDC.less';
import { Feature } from '@/services/resources/models';
import { dispatchAction } from '@/services/device';

const cx = classNames.bind(styles);

interface IOperationProductDCProps {
  id: string;
  features: Feature[];
}

const OperationDeviceDC = (props: IOperationProductDCProps) => {
  const { id, features } = props;

  const handleOparation = (record: Feature) => {
    dispatchAction({ id, cmdKey: record.cmdKey, cmdValues: '' });
  };

  return (
    <div>
      <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
        创建模块
      </Button>

      <div className={cx('feature-list')}>
        {features.map(item => (
          <Card.Grid className={cx('feature-item')} key={item.id}>
            <div className={cx('left')}>
              <div onClick={() => handleOparation(item)} className={cx('name')}>
                {item.name}
              </div>
            </div>
          </Card.Grid>
        ))}
      </div>
    </div>
  );
};

export default OperationDeviceDC;
