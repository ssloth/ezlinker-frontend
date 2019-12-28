import React, { useState } from 'react';
import styles from './Terminal.less';

const Terminal = () => {
  const [log] = useState('');
  return <div className={styles.terminal}>{log}x</div>;
};

export default Terminal;
