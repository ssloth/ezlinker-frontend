import React, { Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';
import { useRestful, useTable } from '@/hooks';
import {
  ANALYSE_DATA_API,
  USER_LOGS_API,
  MODULES_LOGS_API,
  ANALYSE_RUNNING_24H,
  SYSTEM_CONFIG_EMQ_CONFIG_LIST,
} from '@/services/resources';
import ModuleLoginLogCard from './components/ModuleLogCard';
import Running24HRow from './components/Running24HRow';
import EMQChartList from './components/EMQChartList';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const UserLoginLogCard = React.lazy(() => import('./components/UserLoginLogCard'));

const Index = () => {
  const { data: homeData } = useRestful(ANALYSE_DATA_API).useSWRQuery();
  const { data: running24HData } = useRestful(ANALYSE_RUNNING_24H).useSWRQuery();
  const { data: emqListData } = useRestful(SYSTEM_CONFIG_EMQ_CONFIG_LIST).useSWRQuery();
  const { tableProps: userLogsTableProps } = useTable(useRestful(USER_LOGS_API));
  const { tableProps: moduleLogsTableProps } = useTable(useRestful(MODULES_LOGS_API));

  console.log(emqListData)

  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={<div />}>
          <IntroduceRow loading={!homeData} data={homeData}></IntroduceRow>
        </Suspense>
        <Suspense fallback={<div />}>
          <Running24HRow loading={!running24HData} data={running24HData}></Running24HRow>
        </Suspense>
        <Suspense fallback={<div />}>
          <EMQChartList loading={!emqListData} data={emqListData?.records}></EMQChartList>
        </Suspense>
        <Row gutter={24}>
          <Col style={{ marginBottom: 20 }} xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={<div />}>
              <ModuleLoginLogCard tableProps={moduleLogsTableProps as any}></ModuleLoginLogCard>
            </Suspense>
          </Col>
          <Col style={{ marginBottom: 20 }} xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={<div />}>
              <UserLoginLogCard tableProps={userLogsTableProps as any}></UserLoginLogCard>
            </Suspense>
          </Col>
        </Row>
      </React.Fragment>
    </GridContent>
  );
};

export default Index;
