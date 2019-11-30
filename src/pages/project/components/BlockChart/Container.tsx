import React from 'react';
import styles from './Container.less';

interface IContainer {
  children: any;
  title: string;
}

const Container = (props: IContainer) => {
  const { title } = props;
  return (
    <div className={styles.container} {...props}>
      <div className={styles.tltle}>{title}</div>
      {props.children}
    </div>
  );
};

export default Container;
