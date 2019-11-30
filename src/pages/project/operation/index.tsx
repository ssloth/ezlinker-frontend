// import { Avatar, List, Statistic } from 'antd';
import React from 'react';

import classNames from 'classnames/bind';
import { Row, Col } from 'antd';
import styles from './style.less';
import LineChart from '../components/BlockChart/LineChart';

const cx = classNames.bind(styles);

const data = Array.from({ length: 6 }).map(() =>
  Array.from({ length: 60 })
    .map((_, i) => i)
    .reduce((acc, _, index) => [...acc, acc[index] + 10 * (Math.random() - 0.5)], [0])
    .map((item, index) => ({ date: index, value: item })),
);

const Operation = () => (
  <div className={cx('wrapper')}>
    <Row gutter={24}>
      {data.map(item => (
        <Col style={{ marginBottom: 10 }} key={item.toString()} lg={4} md={6} xs={12}>
          <LineChart title="cpu 负载" data={item}></LineChart>
        </Col>
      ))}
    </Row>
  </div>
);

export default Operation;
