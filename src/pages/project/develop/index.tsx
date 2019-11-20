import moment from 'moment';
import React from 'react';
import { Button, Card, Col, Form, Input, Progress, Radio, Row, List, Avatar } from 'antd';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { BasicListItemDataType } from './data.d';
import { useFormModal } from '@/hook';
import styles from './style.less';
import CreateProductFMC from './components/modules/CreateProductFMC';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface DevelopProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
}

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

const Develop: React.FC<DevelopProps> = () => {
  const list: any = [];
  const createProductModal = useFormModal(CreateProductFMC, '', {
    title: '创建产品',
  });

  const handleAdd = () => {
    createProductModal.show();
  };

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
          <List
            size="large"
            rowKey="id"
            // loading={loading}
            // pagination={paginationProps}
            dataSource={list}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <a
                    key="edit"
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    编辑
                  </a>,
                  <a href="">操作</a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} shape="square" size="large" />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.subDescription}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
      {[createProductModal.render()]}
    </PageHeaderWrapper>
  );
};

export default Form.create<DevelopProps>()(Develop);
