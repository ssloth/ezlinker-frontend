import React, { SFC } from 'react';
import styles from './Block.less';

const Block: SFC = props => (
  <div className={styles.block} {...props}>
    {props.children}
  </div>
);

export default Block;
