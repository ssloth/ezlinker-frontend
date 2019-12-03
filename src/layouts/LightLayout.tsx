import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import classNames from 'classnames/bind';
import RightContent from '@/components/GlobalHeader/RightContent';
import styles from './LightLayout.less';

const cx = classNames.bind(styles);

const { Header, Content, Footer } = Layout;

const LightLayout: React.SFC = props => (
  <Layout>
    <Header className={cx('header')}>
      <Breadcrumb className={cx('breadcrumb')}>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>项目</Breadcrumb.Item>
        <Breadcrumb.Item>开发模式</Breadcrumb.Item>
      </Breadcrumb>
      <RightContent></RightContent>
    </Header>
    <Content className={cx('content')}>{props.children}</Content>
    <Footer className="footer"></Footer>
  </Layout>
);

export default LightLayout;
