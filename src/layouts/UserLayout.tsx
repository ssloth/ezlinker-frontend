/* eslint-disable no-plusplus */
import React, { useLayoutEffect } from 'react';
import { connect } from 'dva';
// import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import { createLoginEffect } from './loginEffect';

const UserLayout: React.SFC<any> = (props: any) => {
  // const copyright: string = '2020 EzLinker 版权所有';
  const { children } = props;

  useLayoutEffect(() => {
    setTimeout(() => {
      createLoginEffect();
    }, 500);
  });

  return (
    <>
      <div id="login-container" />
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default connect(({ settings }: { settings: any }) => ({ ...settings }))(UserLayout);
