/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Card, Badge, Table } from 'antd';
import MiniProgress from './Charts/MiniProgress/index';
import styles from './EMQChartListRow.less';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const queryloadStatus = (load15: number): { color: string; text: string } => {
  if (load15) {
    return {
      text: '关闭',
      color: '#444249',
    };
  }
  if (load15 < 80) {
    return {
      text: '正常',
      color: '#01cea2',
    };
  }
  if (load15 < 90) {
    return {
      text: '警告',
      color: '#f0684b',
    };
  }
  return {
    text: '过载',
    color: '#EA3465',
  };
};

const renderState = (state: boolean) => {
  const statusMap = new Map<boolean, any>([
    [false, ['red', '掉线']],
    [true, ['green', '运行']],
  ])
  const [color, text] = statusMap.get(state) || [];
  return <Badge color={color} text={text} />;
};

const columns = [
  {
    title: '节点名称',
    dataIndex: 'nodeName',
    width: 120,
  },
  {
    title: '节点描述',
    dataIndex: 'description',
    width: 150,
  },
  {
    title: '运行状态',
    key: 'state',
    width: 80,
    render: (_: number, record: any) => renderState(!!record.currentRunningState),
  },
  {
    title: '连接数',
    dataIndex: 'currentRunningState.connections',
    width: 80,
    render: (text = '--.--') => text,
  },
  {
    title: '1/5/15分钟平均负载',
    dataIndex: 'currentRunningState',
    width: 175,
    render: (currentRunningState: any) =>
      (currentRunningState
        ? `${currentRunningState.load1} / ${currentRunningState.load5} / ${currentRunningState.load15}`
        : '00.00 / 00.00 / 00.00'),
  },
  {
    title: '近24小时负载情况',
    dataIndex: 'currentRunningState',
    width: 240,
    render: (historyRunningState: any) => (
      <div className={styles['load-24h-chart']}>
        {historyRunningState?.createTime.map((item: number, i:number) => (
          <div key={i.toString()} />
        ))}
      </div>
    ),
  },
  {
    title: '内存使用',
    width: 125,
    key: 'memory_total',
    dataIndex: 'currentRunningState',
    render: (record: any) =>
      (record ? (
        <MiniProgress
          targetLabel={
            <div>
              <p>使用内存：{Math.floor(record.memory_used / 1024 / 1024)} Mb</p>
              <p>分配内存：{Math.floor(record.memory_total / 1024 / 1024)} Mb</p>
            </div>
          }
          strokeWidth={10}
          target={(record.memory_used / record.memory_total) * 100}
          percent={(record.memory_used / record.memory_total) * 100}
        />
      ) : (
        <MiniProgress strokeWidth={10} color="#999999" target={100} percent={100} />
      )),
  },
  {
    title: '运行时间',
    dataIndex: 'createTime',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
];

const EMQChartListRow = ({ loading, data }: { loading: boolean; data: any }) => (
  <Card
    size="small"
    loading={loading}
    bordered={false}
    title="EMQ节点"
    style={{ marginBottom: 24 }}
    bodyStyle={{ padding: 0 }}
  >
    <Table
      size="middle"
      pagination={false}
      columns={columns}
      dataSource={data}
      loading={!data}
     />
  </Card>
);

export default EMQChartListRow;
