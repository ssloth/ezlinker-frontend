import classNames from 'classnames/bind';
import React, { useState } from 'react';
import RightContent from '@/components/GlobalHeader/RightContent';
import styles from './BasicLayout.less';
import { ConnectProps } from '@/models/connect';
import { getMenuData } from '@ant-design/pro-layout';
import { Icon, Layout } from 'antd';
import { Link } from 'umi';
const cx = classNames.bind(styles);

const { Header, Content, Footer } = Layout;

const { Sider } = Layout;

const isActive = (activePath: string, pathname: string) =>
  new RegExp(`^${activePath}`).test(pathname);

const BasicLayout: React.SFC<ConnectProps> = props => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    location,
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;

  const { menuData } = getMenuData(routes);
  // const flatMenuKeys = getFlatMenuKeys(menuData);
  const { pathname } = location as any;
  // Get the currently selected menu

  return (
    <div className={cx('wrapper')}>
      <Layout>
        <Sider className={cx('main-menu-bar')} width={60}>
          <div className={cx('menu-bar')}>
            {menuData.map(menuItem => (
              <div
                key={menuItem.name}
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
        <Sider className={cx('sub-menu-bar')} width={200} collapsedWidth={0} collapsed={collapsed}>
          <div
            className={cx('navbar-collapse-wrapper', {
              collapsed,
            })}
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className={cx('navbar-collapse')}>
              <Icon className={cx('icon')} type="right"></Icon>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header className={cx('header')}>
            {/* <Breadcrumb className={cx('breadcrumb')}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>项目</Breadcrumb.Item>
              <Breadcrumb.Item>开发模式</Breadcrumb.Item>
            </Breadcrumb> */}
            <RightContent></RightContent>
          </Header>
          <Content className={cx('content')}>{props.children}</Content>
          <Footer className={cx('footer')}></Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default BasicLayout;
