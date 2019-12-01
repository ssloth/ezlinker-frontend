import React, { SFC } from 'react';
import classNames from 'classnames/bind';
import styles from './HealthBlock.less';

const cx = classNames.bind(styles);
const Unit = ({ state }: { state: 'normal' | 'warning' | 'error' | 'down' }) => (
  <div
    title={
      { error: '设备异常掉线！', warning: '数据异常', down: '设备已断开', normal: '设备运行良好' }[
        state
      ]
    }
    className={cx('unit', state)}
  ></div>
);

const data = Array.from({ length: 99 }).map(() => ({ status: 1 }));
const getState = () => {
  const r = Math.random();
  if (r < 0.03) return 'down';
  if (r < 0.04) return 'error';
  if (r < 0.05) return 'warning';
  return 'normal';
};
const HealthBlock: SFC = props => (
  <div style={{ height: 80 }} className={styles['health-block']} {...props}>
    {data.map(() => (
      <Unit state={getState()}></Unit>
    ))}
  </div>
);

export default HealthBlock;
