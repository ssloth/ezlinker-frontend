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
  const [collapsed, setCollapsed] = useState(true);
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
        <Sider className={cx('main-menu-bar')} width={60}>
          <div className={cx('menu-bar')}>
            {menuData.map(menuItem => (
              <div
                className={cx('menu-item', {
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
        <Sider className={cx('sub-menu-bar')} width={150} collapsedWidth={0} collapsed={collapsed}>
          <div
            className={cx('navbar-collapse-wrapper', {
              collapsed,
            })}
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className={cx('navbar-collapse')}>
              <Icon className={cx('icon')} type='right'></Icon>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header className={cx('header')}></Header>
          <Content className={cx('content')}>{children}</Content>
          <Footer className={'footer'}></Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default BasicLayout;
