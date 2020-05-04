import React, { Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';
import { createUseRestful, useTable } from '@/hooks';
import {
  BIZ_ANALYSE_OVERVIEW,
  USER_LOGS_API,
  MODULES_LOGS_API,
  MONITOR_OS_RUNNING_24H_API,
  MONITOR_EMQX_ALL_API,
} from '@/services/resources';
import ModuleLoginLogCard from './components/ModuleLogCard';
import Running24HRow from './components/Running24HRow';
import EMQChartListRow from './components/EMQChartListRow';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const UserLoginLogCard = React.lazy(() => import('./components/UserLoginLogCard'));

const Overview = () => {
  const { data: homeData } = createUseRestful(BIZ_ANALYSE_OVERVIEW).useSWRQuery();
  const { data: running24HData } = createUseRestful(MONITOR_OS_RUNNING_24H_API).useSWRQuery();
  const { data: emqListData } = createUseRestful(MONITOR_EMQX_ALL_API).useSWRQuery();
  const { tableProps: userLogsTableProps } = useTable(createUseRestful(USER_LOGS_API));
  const { tableProps: moduleLogsTableProps } = useTable(createUseRestful(MODULES_LOGS_API));

  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={<div />}>
          <IntroduceRow loading={!homeData} data={homeData} />
        </Suspense>
        <Suspense fallback={<div />}>
          <Running24HRow loading={!running24HData} data={running24HData as any} />
        </Suspense>
        <Suspense fallback={<div />}>
          <EMQChartListRow loading={!emqListData} data={emqListData} />
        </Suspense>
        <Row gutter={24}>
          <Col style={{ marginBottom: 20 }} xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={<div />}>
              <ModuleLoginLogCard tableProps={moduleLogsTableProps as any} />
            </Suspense>
          </Col>
          <Col style={{ marginBottom: 20 }} xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={<div />}>
              <UserLoginLogCard tableProps={userLogsTableProps as any} />
            </Suspense>
          </Col>
        </Row>
      </React.Fragment>
    </GridContent>
  );
};

export default Overview;
