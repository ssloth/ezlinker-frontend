import moment from 'moment';
import React from 'react';
import { Button, Card, Col, Form, Input, Progress, Radio, Row, List, Avatar } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { BasicListItemDataType } from './data.d';
import { useFormModal, useRestful } from '@/hook';
import { CreateProductFMC, OperationProductContent } from './components/modules';
import { ConnectProps } from '@/models/connect';
import { PRODUCTS_API } from '@/services/resources';
import { Product } from '@/services/resources/models';
import { ITableList } from '@/typings/server';
import useDrawer from '@/hook/useModal/useDrawer';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface DevelopProps extends FormComponentProps, ConnectProps {
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

const Develop: React.FC<DevelopProps> = props => {
  const { match } = props;
  const projectId = (match as any).params.id;
  const product = useRestful<Product>(PRODUCTS_API);

  const createProductModal = useFormModal(CreateProductFMC, product, {
    title: '创建产品',
  });

  const operationProductContent = useDrawer(OperationProductContent, {
    width: 365,
  });

  const { data, error } = product.useQuery({ projectId });
  const list = data as ITableList<Product>;

  const handleAdd = () => {
    createProductModal.create({ projectId });
  };

  const handleEdit = (record: Product) => {
    createProductModal.edit(record);
  };

  const handleOperation = (record: Product) => {
    operationProductContent.show(record, {
      title: record.name,
    });
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
            loading={!list || !!error}
            // pagination={paginationProps}
            dataSource={list && list.records}
            renderItem={item => (
              <List.Item
                actions={[
                  <a key="edit" onClick={() => handleEdit(item)}>
                    编辑
                  </a>,
                  <a key="operation" onClick={() => handleOperation(item)}>
                    操作
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} shape="square" size="large" />}
                  title={<span>{item.name}</span>}
                  description={item.description}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default Form.create<DevelopProps>()(Develop);
