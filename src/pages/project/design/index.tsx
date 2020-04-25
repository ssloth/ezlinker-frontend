import React from 'react';
// import { PlusOutline } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Col, Input, Radio, Row, List, Tag } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { get } from 'lodash';
import { useFormModal, createUseRestful, useDrawer } from '@/hooks';
import { ConnectProps } from '@/models/connect';
import { PRODUCTS_API } from '@/services/resources';
import { IProduct } from '@/typings/types';
import { ITableList } from '@/typings/server';

import IconFont from '@/components/IconFont';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import moment from 'moment';
import styles from './style.less';
import CreateProductFMC from './components/modules/CreateProductFMC';
import OperationProductDC from './components/modules/OperationProductDC';

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

const Avatar = ({ logo }: { logo: string }) => (
  <div style={{ background: '#333344', width: 50, height: 50, borderRadius: 5 }}>
    <IconFont style={{ fontSize: 50 }} type={logo} />
  </div>
);

const ListContent = ({ createdAt, tags }: any) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>标签</span>
      <p>
        {tags.map((item: any) => (
          <Tag>{item}</Tag>
        ))}
      </p>
    </div>

    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      {/* <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} /> */}
    </div>
  </div>
);

const Develop: React.FC<DevelopProps> = props => {
  const projectId = get(props, 'match.params.id');
  const product = createUseRestful<IProduct>(PRODUCTS_API);

  const createProductModal = useFormModal(CreateProductFMC, product, {
    title: '创建产品',
  });

  const operationProductDC = useDrawer(OperationProductDC, {
    width: 420,
  });

  const { data, error } = product.useSWRQuery({ projectId });
  const list = data as ITableList<IProduct>;

  const handleAdd = () => {
    createProductModal.create({ projectId });
  };

  const handleEdit = (record: IProduct) => {
    createProductModal.edit(record);
  };

  const handleOperation = (record: IProduct) => {
    operationProductDC.show({ productId: record.id }, { title: record.name });
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">开发中</RadioButton>
        <RadioButton value="production">运行中</RadioButton>
        <RadioButton value="archive">锁定</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  return (
    <div>
      <div className={styles.standardList}>
        <Card bordered={false}>
          <Row>
            <Col sm={6} xs={24}>
              <Info title="全部产品" value={8} bordered />
            </Col>
            <Col sm={6} xs={24}>
              <Info title="开发中" value={3} bordered />
            </Col>
            <Col sm={6} xs={24}>
              <Info title="运行中" value={2} />
            </Col>
            <Col sm={6} xs={24}>
              <Info title="已锁定" value={3} />
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
            icon={<PlusOutlined />}
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
                  <Link to={`./develop/product/${item.id}/design`}>设计</Link>,
                  <a key="operation" onClick={() => handleOperation(item)}>
                    模块
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar logo={item.logo} />}
                  title={<span>{item.name}</span>}
                  description={item.description}
                />
                <ListContent createdAt={item.createTime} tags={item.tags}/>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default Form.create<DevelopProps>()(Develop);
