import React from 'react';
import { Button, Row, Col } from 'antd';

const list = [
  { label: '开机开机开机开机开机' },
  { label: '关' },
  { label: '重' },
  { label: '重' },
  { label: '重' },
];

const FeatureContent = (props: any) => {
  const { features } = props;
  return (
    <Row gutter={10}>
      {features.map((feature: any) => (
        <Col style={{ marginBottom: 10 }} span={6}>
          <Button style={{ width: '100%' }}>{feature.label}</Button>
        </Col>
      ))}
    </Row>
  );
};

const OperationProductContent = (props: any) => (
  <div>
    <FeatureContent {...props} features={list} />
  </div>
);

export default OperationProductContent;
