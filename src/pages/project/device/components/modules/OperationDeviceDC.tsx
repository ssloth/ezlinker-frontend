import classNames from 'classnames/bind';
import React from 'react';
import { Button, Card } from 'antd';
import { IDevice, Feature } from '@/typings/types';
import { useDrawer } from '@/hooks';
import styles from './OperationDeviceDC.less';
import DispatchActionDC from './DispatchActionDC';
// import { dispatchAction } from '@/services/device';

const cx = classNames.bind(styles);

interface IOperationProductDCProps extends IDevice {}

const OperationDeviceDC = (props: IOperationProductDCProps) => (
    <div>
      <div className={cx('feature-list')}>

      </div>
    </div>
  );
export default OperationDeviceDC;
