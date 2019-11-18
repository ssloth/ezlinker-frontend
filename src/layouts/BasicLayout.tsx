import React from 'react';
import { Layout, Icon } from 'antd';
import { getMenuData } from '@ant-design/pro-layout';
import styles from './BasicLayout.less';
import { ConnectProps } from '@/models/connect';
import { Link } from 'umi';

const { Sider, Header, Content, Footer } = Layout;

/**
 * 将首页的menu排到中间
 * @param acc
 * @param val
 * @param index
 */
const sortByCenter = (acc: any, val: any, index: number) => {
  if (index === 0) return [val];
  else if (index % 2 === 1) return [...acc, val];
  else return [val, ...acc];
};

const BasicLayout: React.SFC<ConnectProps> = props => {
  const {
    children,
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const menuData = getMenuData(routes).menuData.reduce(sortByCenter, []);
  return (
    <div className={styles.wrapper}>
      <Layout>
        <Sider className={styles.menusWrapper} width={60}>
          <div className={styles.menuBar}>
            {menuData.map(menuItem => (
              <div className={styles.menuItem}>
                <Link to={menuItem.path}>
                  {/* <div className={styles.name}></div> */}
                  <div className={styles.icon}>
                    <Icon style={{ fontSize: 20 }} type={menuItem.icon} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Sider>
        {/* <Sider className={styles.subMenus} theme="light" width={150}></Sider> */}
        <Layout>
          <Header className={styles.header}></Header>
          <Content className={styles.content}>{children}</Content>
          <Footer className={styles.footer}></Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default BasicLayout;
