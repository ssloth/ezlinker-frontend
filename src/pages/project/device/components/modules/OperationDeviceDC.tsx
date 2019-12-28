import classNames from 'classnames/bind';
import React from 'react';
import { Button, Empty } from 'antd';
import { connect } from 'dva';
import styles from './OperationDeviceDC.less';
import { Device } from '@/services/resources/models';
// import { dispatchAction } from '@/services/device';
import { ConnectProps } from '@/models/connect';

const cx = classNames.bind(styles);

interface IOperationProductDCProps extends Device, ConnectProps {}

const OperationDeviceDC = (props: IOperationProductDCProps) => {
  const { dispatch } = props;

  // const handleOparation = (record: Feature) => {
  //   dispatchAction({ id, cmdKey: record.cmdKey, cmdValues: '' });
  // };

  const handleConnect = () => {
    if (dispatch) dispatch({ type: 'VirtualDevice/show' });
  };

  return (
    <div>
      <div>
        <Empty description="设备未激活"></Empty>
        <Button onClick={handleConnect} style={{ width: '100%', marginTop: 30 }}>
          模拟调试
        </Button>
        <Button style={{ width: '100%', marginTop: 15 }}> 清除调试数据 </Button>
      </div>

      {/* <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus"></Button> */}

      <div key={props.id} className={cx('feature-list')}>
        {/* {features.map(item => (
          <Card.Grid className={cx('feature-item')} key={item.id}>
            <div className={cx('left')}>
              <div onClick={() => handleOparation(item)} className={cx('name')}>
                {item.name}
              </div>
            </div>
          </Card.Grid>
        ))} */}
      </div>
    </div>
  );
};
export default connect()(OperationDeviceDC);
