import React from 'react';
import { Card, Row, Col } from 'antd';
import Pie from './Charts/Pie';

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

const EMQLogCard = ({ data }: { data: any }) => (
  <Card bodyStyle={{ padding: 0 }}>
    <Row gutter={24} type="flex">
      <Col {...topColResponsiveProps}>
      </Col>
      <Col {...topColResponsiveProps}></Col>
      <Col {...topColResponsiveProps}></Col>
      <Col {...topColResponsiveProps}></Col>
    </Row>
  </Card>
);

export default EMQLogCard;
