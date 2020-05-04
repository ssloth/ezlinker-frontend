import React, { useMemo } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { Row, Col, Card } from 'antd';

// const { Global } = G2;
// Global.setTheme('dark');

const feckData = [
  {
    type: 'in',
    createTime: '12',
    value: 502,
  },
  {
    type: 'in',
    createTime: '13',
    value: 635,
  },
  {
    type: 'in',
    createTime: '14',
    value: 809,
  },
  {
    type: 'in',
    createTime: '15',
    value: 5268,
  },
  {
    type: 'in',
    createTime: '16',
    value: 4400,
  },
  {
    type: 'in',
    createTime: '17',
    value: 3634,
  },
  {
    type: 'in',
    createTime: '18',
    value: 947,
  },
  {
    type: 'out',
    createTime: '12',
    value: 106,
  },
  {
    type: 'out',
    createTime: '13',
    value: 107,
  },
  {
    type: 'out',
    createTime: '14',
    value: 111,
  },
  {
    type: 'out',
    createTime: '15',
    value: 1766,
  },
  {
    type: 'out',
    createTime: '16',
    value: 221,
  },
  {
    type: 'out',
    createTime: '17',
    value: 767,
  },
  {
    type: 'out',
    createTime: '18',
    value: 133,
  },
];

const feckCols = {
  createTime: {
    type: 'linear',
  },
};

export interface IProps {
  data: { createTime: string[]; physicalUse: number[]; physicalTotal: number[] };
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
  memory: {
    alias: '内存',
    max: 100,
    min: 0,
  },
  date: {
    alias: '时间',
    range: [0, 5],
  },
};

const Running24H = (props: IProps) => {
  const { data } = props;

  const chartData = useMemo(() => {
    if (!data) return [];
    const result = data.createTime.map((item, index) => ({
      createTime: item,
      physical: +((100 * data.physicalUse[index]) / data.physicalTotal[index]).toFixed(2),
      cpu: +(10 * 2 * Math.random()).toFixed(2),
    }));
    return result;
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

            <Tooltip
              crosshairs={{
                type: 'y',
              }}
              containerTpl={`
            <div class="g2-tooltip"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>
            <table>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>名称</td>
                  <th>值</td>
                </tr>
              <thead>
              <tbody
                class="g2-tooltip-list"
              >
              </tbody>
            <table>
            `}
              itemTpl={`
              <tr data-index={index}>'
                <td><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span></td>
                <td>{name}</td>
                <td>{value}</td>
              </tr>
           `}
            />
            <Geom
              shape="circle"
              color="physical"
              type="line"
              position="createTime*physical"
              size={2}
            />
            <Geom shape="circle" color="cpu" type="line" position="createTime*cpu" size={2} />
          </Chart>
        </Card>
      </Col>
      <Col {...topColResponsiveProps}>
        <Card size="small">
          <Chart
            style={{ boxSizing: 'border-box' }}
            padding={[15, 15, 50, 50]}
            height={300}
            forceFit
            data={feckData}
            scale={feckCols}
          >
            <Axis name="createTime" />
            <Axis name="value" />
            <Legend />
            <Tooltip />
            <Geom
              type="areaStack"
              position="createTime*value"
              color={[
                'type',
                [
                  'l (90) 0:rgba(0, 146, 255, 1) 1:rgba(0, 146, 255, 0.1)',
                  'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)',
                ],
              ]}
            />
            <Geom
              type="lineStack"
              position="createTime*value"
              size={2}
              color={['type', ['rgba(0, 146, 255, 1)', '#00ff00']]}
            />
          </Chart>
        </Card>
      </Col>
    </Row>
  );
};

export default Running24H;
