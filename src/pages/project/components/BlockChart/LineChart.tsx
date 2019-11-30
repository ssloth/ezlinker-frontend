import React from 'react';
import { Chart, Geom } from 'bizcharts';
import Container from './Container';
import styles from './LineChart.less';

export interface IProps {
  data: any[];
  title: string;
}

const cols = {
  value: {
    max: 100,
    min: -100,
  },
  date: {
    range: [0, 1],
  },
};

const CurrentNumber = ({ number }: { number: string }) => {
  const color = ['rgb(0, 201, 159)', 'rgb(147, 116, 74)', 'rgb(152, 161, 196)'];
  return (
    <div
      style={{ color: color[Math.floor(Math.random() * 3)] }}
      className={styles['current-number']}
    >
      {number}
    </div>
  );
};

const LineChart = (props: IProps) => {
  const { data, title } = props;
  return (
    <Container title={title}>
      <Chart padding={0} height={90} data={data} scale={cols} forceFit>
        <Geom type="line" position="date*value" size={1} />
      </Chart>
      <CurrentNumber number="50%" />
    </Container>
  );
};

export default LineChart;
