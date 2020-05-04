import { Col, Row } from 'antd';
import React from 'react';
import { UserOutlined, ProjectOutlined, TabletOutlined, CreditCardOutlined } from '@ant-design/icons';
import { ChartCard } from './Charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, data = {} }: { loading: boolean; data: any }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="用户总数"
        total={<div>{data.users}</div>}
        icon={<UserOutlined style={{ fontSize: 50, color: '#a9a3ff77' }}/>}
        contentHeight={46}
      ></ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="项目总数"
        total={<div>{data.projects}</div>}
        icon={<ProjectOutlined style={{ fontSize: 50, color: '#a9a3ff77' }} />}
        contentHeight={46}
      ></ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="产品总数"
        total={<div>{data.products}</div>}
        icon={<TabletOutlined style={{ fontSize: 50, color: '#a9a3ff77' }}/>}
        contentHeight={46}
      ></ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="设备总数"
        total={<div>{data.devices}</div>}
        icon={<CreditCardOutlined style={{ fontSize: 50, color: '#a9a3ff77' }}/>}
        contentHeight={46}
      ></ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
