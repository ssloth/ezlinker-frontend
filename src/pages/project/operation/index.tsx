// import { Avatar, List, Statistic, Divider } from 'antd';
import React, { useLayoutEffect } from 'react';

import classNames from 'classnames/bind';
import { Row, Col } from 'antd';
import styles from './style.less';
import LineChart from '../components/BlockChart/LineChart';

const cx = classNames.bind(styles);

const data = Array.from({ length: 6 }).map((_, index) => ({
  title: `cpu${index}负载`,
  list: Array.from({ length: 60 })
    .map((_, i) => i)
    .reduce((acc, _, index) => [...acc, acc[index] + 10 * (Math.random() - 0.5)], [0])
    .map((item, index) => ({ date: index, value: item })),
}));


const Operation = () => {

  // useLoadAnimate();

  return (
    <div className={cx('wrapper')}>
      <Row gutter={24}>
        {data.map((item, index) => (
          <Col style={{ marginBottom: 10 }} key={item.title} lg={4} md={6} xs={12}>
            <LineChart title={item.title} data={item.list}></LineChart>
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={18}></Col>
      </Row>
    </div>
  );
};

export default Operation;
