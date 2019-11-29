import { Col, Icon, Row, Tooltip } from 'antd';
import React from 'react';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

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

const IntroduceRow = ({ loading }: { loading: boolean }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="设备统计"
        action={
          <Tooltip title="所有设备">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={<div>1个</div>}
        footer={<Field label="Daily Sales" value={`123`} />}
        contentHeight={46}
      >
        <Trend
          flag="up"
          style={{
            marginRight: 16,
          }}
        >
          Weekly Changes
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          Daily Changes
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="系统负载"
        action={
          <Tooltip title="系统负载">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={<div></div>}
        footer={<Field label="Daily Visits" value={12345} />}
        contentHeight={46}
      >
        {/* <MiniArea color="#975FE4" data={visitData} /> */}
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Payments"
        action={
          <Tooltip title="Introduce">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={3245}
        footer={<Field label="Conversion Rate" value="60%" />}
        contentHeight={46}
      >
        {/* <MiniBar data={visitData} /> */}
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="Operational Effect"
        action={
          <Tooltip title="Introduce">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total="78%"
        footer={
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <Trend
              flag="up"
              style={{
                marginRight: 16,
              }}
            >
              Weekly Changes
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              Weekly Changes
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
