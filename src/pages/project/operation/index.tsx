// import { Avatar, List, Statistic, Divider } from 'antd';
import React from 'react';
import classNames from 'classnames/bind';
import { Row, Col } from 'antd';
import styles from './style.less';
import LineChart from '../components/BlockChart/LineChart';
import OperationBlock from './components/dark/OperationBlock';
import HealthBlock from './components/dark/HealthBlock';

const cx = classNames.bind(styles);

const data = Array.from({ length: 6 }).map((__, i) => ({
  title: `cpu${i}负载`,
  list: Array.from({ length: 60 })
    .map((_, index) => index)
    .reduce((acc, _, index) => [...acc, acc[index] + 10 * (Math.random() - 0.5)], [0])
    .map((item, index) => ({ date: index, value: item })),
}));

const Operation = () => (
  <div className={cx('wrapper')}>
    <h2 style={{ color: 'rgb(210, 220, 230)', fontSize: 15 }}>系统负载监控</h2>
    <Row gutter={24}>
      {data.map(item => (
        <Col style={{ marginBottom: 10 }} key={item.title} lg={4} xs={8}>
          <LineChart title={item.title} data={item.list}></LineChart>
        </Col>
      ))}
    </Row>
    <Row gutter={24}>
      <Col lg={16} md={16} xs={24}>
        <h2 style={{ color: 'rgb(210, 220, 230)', fontSize: 15 }}>设备健康监控</h2>
        <Row>
          <Col xs={6}>
            <HealthBlock></HealthBlock>
          </Col>
          <Col xs={6}>
            <HealthBlock></HealthBlock>
          </Col>
          <Col xs={6}>
            <HealthBlock></HealthBlock>
          </Col>
          <Col xs={6}>
            <HealthBlock></HealthBlock>
          </Col>
        </Row>
      </Col>
      <Col lg={8} md={8} xs={24}>
        <h2 style={{ color: 'rgb(210, 220, 230)', fontSize: 15 }}>操作</h2>
        <OperationBlock></OperationBlock>
      </Col>
    </Row>
  </div>
);
export default Operation;
