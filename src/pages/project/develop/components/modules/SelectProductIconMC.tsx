import React, { useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { range } from 'lodash';
import classNames from 'classnames/bind';
import styles from './SelectProductIconMC.less';

const IconFont = createFromIconfontCN({ scriptUrl: '/iconfont/iconfont.js' });

const iconBlacklist = [1, 2, 6]; // 因为有的图标不能用 所以加入黑名单
const cx = classNames.bind(styles);

export interface SelectProductIconMCProps {
  callback: Function;
}

const SelectProductIconMC = ({ callback }: SelectProductIconMCProps) => {
  const [active, setActive] = useState<number>();
  const handleSelect = (value: number) => {
    setActive(value);
    callback(`icon${value}`);
  };
  return (
    <div className={styles.wrapper}>
      {range(1, 15)
        .filter(item => !iconBlacklist.includes(item))
        .map(item => (
          <div
            key={item}
            onClick={() => handleSelect(item)}
            className={cx('icon', {
              active: item === active,
            })}
          >
            <IconFont className={cx('icon-font')} type={`icon${item}`}></IconFont>
          </div>
        ))}
    </div>
  );
};

export default SelectProductIconMC;
