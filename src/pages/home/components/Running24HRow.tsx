import React, { useMemo } from 'react';
import { Chart, Geom, Axis } from 'bizcharts';
import { Row, Col, Card } from 'antd';

// const { Global } = G2;
// Global.setTheme('dark');

export interface IProps {
  data: any;
  loading: boolean;
  title?: string;
}

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  style: {
    marginBottom: 24,
  },
};

const cols = {
  cpu: {
    alias: 'cpu',
    max: 100,
    min: 0,
  },
  // memory: {
  //   alias: '内存',
  //   max: 100,
  //   min: 0,
  // },
  date: {
    alias: '时间',
    range: [0, 5],
  },
};

const Running24H = (props: IProps) => {
  const { data } = props;

  const chartData = useMemo(() => {
    if (!data) return [];
    const cpu = data.time
      .map((_: any, index: number) => index)
      .reduce(
        (acc: number[], _: any, index: number) => [...acc, acc[index] + 5 * (Math.random() - 0.45)],
        [10],
      );
    const memory = data.time
      .map((_: any, index: number) => index)
      .reduce(
        (acc: number[], _: any, index: number) => [...acc, acc[index] + 5 * (Math.random() - 0.45)],
        [10],
      );
    return data.time.map((_: any, index: number) => ({
      date: index,
      cpu: cpu[index],
      memory: memory[index],
    }));
  }, [data]);

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <Card size="small">
          <Chart
            style={{ boxSizing: 'border-box' }}
            padding={[15, 15, 50, 50]}
            height={300}
            data={chartData}
            scale={cols}
            forceFit
          >
            <Axis grid={null} name="memory" />
            <Axis
              grid={{
                lineStyle: {
                  strokeOpacity: 0.1,
                },
              }}
              name="cpu"
              label={{
                formatter: val => `${val}%`,
              }}
            />

            <Geom color="red" type="line" position="date*cpu" size={1} />
            <Geom type="line" position="date*memory" size={1} />
          </Chart>
        </Card>
      </Col>
      <Col {...topColResponsiveProps}>
        <Card size="small">
          <Chart
            style={{ boxSizing: 'border-box' }}
            padding={[15, 15, 50, 50]}
            height={300}
            data={chartData}
            scale={cols}
            forceFit
          >
            <Axis grid={null} name="memory" />
            <Axis
              grid={{
                lineStyle: {
                  strokeOpacity: 0.1,
                },
              }}
              name="cpu"
              label={{
                formatter: val => `${val}%`,
              }}
            />

            <Geom color="red" type="line" position="date*cpu" size={1} />
            <Geom type="line" position="date*memory" size={1} />
          </Chart>
        </Card>
      </Col>
    </Row>
  );
};

export default Running24H;
