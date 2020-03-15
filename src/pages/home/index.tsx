import React, { Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';
import { useRestful, useTable } from '@/hooks';
import { ANALYSE_DATA_API, USER_LOGS_API, MODULES_LOGS_API } from '@/services/resources';
import ModuleLoginLogCard from './components/ModuleLogCard';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const UserLoginLogCard = React.lazy(() => import('./components/UserLoginLogCard'));

const Index = () => {
  const { data: homeData } = useRestful(ANALYSE_DATA_API).useSWRQuery();
  const { tableProps: userLogsTableProps } = useTable(useRestful(USER_LOGS_API));
  const { tableProps: moduleLogsTableProps } = useTable(useRestful(MODULES_LOGS_API));

  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={<div />}>
          <IntroduceRow loading={!homeData} data={homeData}></IntroduceRow>
        </Suspense>
        <Row gutter={24}>
          <Col style={{ marginBottom: 20 }} xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ModuleLoginLogCard tableProps={moduleLogsTableProps}></ModuleLoginLogCard>
            </Suspense>
          </Col>
          <Col style={{ marginBottom: 20 }} xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <UserLoginLogCard tableProps={userLogsTableProps}></UserLoginLogCard>
            </Suspense>
          </Col>
        </Row>
      </React.Fragment>
    </GridContent>
  );
};

export default Index;
