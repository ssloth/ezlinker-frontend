import React from 'react';
import { Layout } from 'antd';
import styles from './BasicLayout.less';

const MenusSiderBar = (props: any) => {
  const { menus } = props;
  return <div></div>;
};

const SubModuleMenus = (props: any) => {
  const { menus } = props;
  return <div></div>;
};

const Header = (props: any) => <div></div>;
const Content = (props: any) => <div></div>;
const Footer = (props: any) => <div></div>;

const BasicLayout: React.FC = ({ children }) => {
  const x = 1;
  return (
    <div className={styles.wrapper}>
      <div className={styles.splitView}>
        <MenusSiderBar></MenusSiderBar>
      </div>
      <div className={styles.splitView}>
        <MenusSiderBar></MenusSiderBar>
      </div>
      <div className={styles.splitView}>
        <Layout>
          <Header></Header>
          <Content>{children}</Content>
          <Footer></Footer>
        </Layout>
      </div>
    </div>
  );
};

export default BasicLayout;
