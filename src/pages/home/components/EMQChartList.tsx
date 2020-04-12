import React from 'react';
import { Card, List, Badge } from 'antd';
import moment from 'moment';
import styles from './EMQChartList.less';

const renderState = (state: number) => {
  const statusMap = {
    1: ['green', '正常'],
    0: ['red', '掉线'],
  };
  const [color, text] = statusMap[state] || [];
  return <Badge color={color} text={text}></Badge>;
};

const ListContent = ({ createdAt, ip, port, state }: any) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>状态</span>
      <p>{renderState(state)}</p>
    </div>

    <div className={styles.listContentItem}>
      <span>IP</span>
      <p>
        {ip}:{port}
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

const EMQChartList = ({ loading, data }: { loading: boolean; data: any }) => (
  <Card loading={loading} bordered={false} title="EMQ节点" style={{ marginBottom: 24 }}>
    <List
      size="small"
      rowKey="id"
      loading={!data}
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item>
          <List.Item.Meta title={<span>{item.nodeName}</span>} description={item.description} />
          <ListContent {...item} />
        </List.Item>
      )}
    />
  </Card>
);

export default EMQChartList;
