import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Input, Progress, Radio, Row, Collapse, Avatar } from 'antd';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { StateType } from './model';
import useModal from '@/hook/useModal/index';
import CreateProductFMC from './modules/CreateProductFMC';
import styles from './style.less';
import { BasicListItemDataType } from './data.d';
import { Link } from 'umi';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const { Panel } = Collapse;

const Info: React.FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({
  data: { owner, createdAt, percent, status },
}: {
  data: BasicListItemDataType;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>Owner</span>
      <p>{owner}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>开始时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
    </div>
  </div>
);

const ProductComponents = ({ components }: { components: any[] }) => (
  <Card className={styles.projectList} style={{ marginBottom: 24 }} bodyStyle={{ padding: 0 }}>
    {components.map((item: any) => (
      <Card.Grid className={styles.projectGrid} key={item.id}>
        <Card bodyStyle={{ padding: 0 }} bordered={false}>
          <Card.Meta
            title={
              <div className={styles.cardTitle}>
                <Avatar size="small" src={item.logo} />
                <Link to={item.href}>{item.title}</Link>
              </div>
            }
            description={item.description}
          />
          <div className={styles.projectItemContent}>
            <Link to={item.memberLink}>{item.member || ''}</Link>
            {item.updatedAt && (
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            )}
          </div>
        </Card>
      </Card.Grid>
    ))}
  </Card>
);

interface DevelopProps extends FormComponentProps {
  projectAnddevelop: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const Develop: React.FC<DevelopProps> = props => {
  const { dispatch, projectAnddevelop, form } = props;
  const { list } = projectAnddevelop;

  const [ProductModal, ProductModalMethods] = useModal(CreateProductFMC, {
    title: '产品添加',
    width: 640,
  });

  const handleAdd = () => {
    ProductModalMethods.show();
  };

  useEffect(() => {
    dispatch({
      type: 'projectAnddevelop/fetch',
      payload: {
        count: 5,
      },
    });
  }, []);

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">进行中</RadioButton>
        <RadioButton value="waiting">等待中</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  return (
    <>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个任务" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="产品列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={handleAdd}
            >
              添加
            </Button>
            <Collapse bordered={false}>
              {list.map(item => (
                <Panel key={item.id} header={<ListContent data={item} />}>
                  <Row gutter={12}>
                    <Col lg={16}>
                      <ProductComponents components={list}></ProductComponents>
                    </Col>
                    <Col lg={8}>
                      <Card></Card>
                    </Col>
                  </Row>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </div>
      </PageHeaderWrapper>
      {[ProductModal]}
    </>
  );
};

export default connect(
  ({
    projectAnddevelop,
    loading,
  }: {
    projectAnddevelop: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    projectAnddevelop,
    loading: loading.models.projectAnddevelop,
  }),
)(Form.create<DevelopProps>()(Develop));
