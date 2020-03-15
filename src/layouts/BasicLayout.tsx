import { Link } from 'umi';
import { Layout, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { getMenuData } from '@ant-design/pro-layout';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { RightOutlined } from '@ant-design/icons';
import VirtualDevice from '@/components/VirtualDevice';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectProps } from '@/models/connect';
import styles from './BasicLayout.less';

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
              <Tooltip title={menuItem.name} placement="right">
                <div
                  key={menuItem.name}
                  className={cx('menu-item', {
                    active: isActive(menuItem ? menuItem.path || '' : '', pathname),
                  })}
                >
                  <Link to={menuItem.path || ''}>
                    <LegacyIcon
                      className={cx('icon')}
                      style={{ fontSize: 22 }}
                      type={menuItem.icon as any}
                    />
                  </Link>
                </div>
              </Tooltip>
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
              <RightOutlined className={cx('icon')}></RightOutlined>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header className={cx('header')}>
            <RightContent />
          </Header>
          <Content className={cx('content')}>{props.children}</Content>
          <Footer className={cx('footer')}></Footer>
        </Layout>
      </Layout>

      <VirtualDevice></VirtualDevice>
    </div>
  );
};

export default BasicLayout;
