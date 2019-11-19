import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import { getMenuData } from '@ant-design/pro-layout';
import { ConnectProps } from '@/models/connect';
import { Link } from 'umi';
import classNames from 'classnames';
import { urlToList } from '@/utils/pathTools';
import { getMenuMatches, getFlatMenuKeys } from './utils/SiderMenuUtils';
import pathRegexp from 'path-to-regexp';
import './BasicLayout.less';

const { Sider, Header, Content, Footer } = Layout;

const isActive = (path: string, selectedKeys: string[]) => {
  return selectedKeys.some(key => pathRegexp(path).test(key));
};

const BasicLayout: React.SFC<ConnectProps> = props => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const {
    children,
    location,
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const menuData = getMenuData(routes).menuData;
  const flatMenuKeys = getFlatMenuKeys(menuData);

  // Get the currently selected menu
  const getSelectedMenuKeys = (): string[] => {
    return urlToList((location as any).pathname)
      .map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
      .filter(item => item) as string[];
  };

  const handleMenuChange = () => {
    setSelectedKeys(getSelectedMenuKeys());
  };

  return (
    <div className={'wrapper'}>
      <Layout>
        <Sider className={'menusWrapper'} width={60}>
          <div className={'menuBar'}>
            {menuData.map(menuItem => (
              <div
                className={classNames('menuItem', {
                  active: isActive(menuItem.path, selectedKeys),
                })}
                onClick={handleMenuChange}
              >
                <Link to={menuItem.path}>
                  {/* <div className={styles.name}></div> */}
                  <div className={'icon'}>
                    <Icon style={{ fontSize: 22 }} type={menuItem.icon} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Sider>
        {/* <Sider className={styles.subMenus} theme="light" width={150}></Sider> */}
        <Layout>
          <Header className={'header'}></Header>
          <Content className={'content'}>{children}</Content>
          <Footer className={'footer'}></Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default BasicLayout;
