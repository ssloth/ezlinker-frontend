import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import { getMenuData } from '@ant-design/pro-layout';
import { ConnectProps } from '@/models/connect';
import { Link } from 'umi';
import classNames from 'classnames/bind';
import pathRegexp from 'path-to-regexp';
import styles from './BasicLayout.less';
const cx = classNames.bind(styles);

const { Sider, Header, Content, Footer } = Layout;

const isActive = (activePath: string, pathname: string) => {
  return pathRegexp(pathname).test(activePath);
};

const BasicLayout: React.SFC<ConnectProps> = props => {

  const {
    children,
    location,
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const menuData = getMenuData(routes).menuData;
  // const flatMenuKeys = getFlatMenuKeys(menuData);
  const pathname = (location as any).pathname;
  // Get the currently selected menu

  return (
    <div className={cx('wrapper')}>
      <Layout>
        <Sider className={cx('menusWrapper')} width={60}>
          <div className={cx('menuBar')}>
            {menuData.map(menuItem => (
              <div
                className={cx('menuItem', {
                  active: isActive(menuItem.path, pathname),
                })}
              >
                <Link to={menuItem.path}>
                  {/* <div className={styles.name}></div> */}
                  <div className={cx('icon')}>
                    <Icon style={{ fontSize: 22 }} type={menuItem.icon} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Sider>
        {/* <Sider className={styles.subMenus} theme="light" width={150}></Sider> */}
        <Layout>
          <Header className={cx('header')}>

            123
          </Header>
          <Content className={cx('content')}>{children}</Content>
          <Footer className={'footer'}></Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default BasicLayout;
