import classNames from 'classnames/bind';
import React from 'react';
import { Button, Card } from 'antd';
import styles from './OperationDeviceDC.less';
import { Device, Feature } from '@/services/resources/models';
import { useDrawer } from '@/hooks';
import DispatchActionDC from './DispatchActionDC';
// import { dispatchAction } from '@/services/device';

const cx = classNames.bind(styles);

interface IOperationProductDCProps extends Device {}

const OperationDeviceDC = (props: IOperationProductDCProps) => {
  const { features } = props;
  const dispatchAction = useDrawer(DispatchActionDC, {
    title: '执行操作',
    width: 500,
  });

  const handleOparation = (record: Feature) => {
    dispatchAction.show({ device: props, feature: record });
  };

  return (
    <div>
      <div className={cx('feature-list')}>
        {features.map(item => (
          <Card.Grid className={cx('feature-item')} key={item.id}>
            <Button className={cx('button')} onClick={() => handleOparation(item)}>
              {item.label}
            </Button>
          </Card.Grid>
        ))}
      </div>
      {dispatchAction.render()}
    </div>
  );
};
export default OperationDeviceDC;
