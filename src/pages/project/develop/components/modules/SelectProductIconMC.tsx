import React from 'react';
import styles from './SelectProductIconMC.less';
import productIcon from '@/assets/icon/products';

export interface SelectProductIconMCProps {
  callback: Function;
}

const SelectProductIconMC = ({ callback }: SelectProductIconMCProps) => (
  <div className={styles.wrapper}>
    {productIcon.map(item => (
      <div onClick={() => callback(item)} className={styles.icon}>
        <img src={item} alt="" />
      </div>
    ))}
  </div>
);

export default SelectProductIconMC;
