import React from 'react';

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import getDate from '../../../utils/getDateFromTimestamp';

interface Props<T> {
  data: T[];
  lineLabel: keyof T;
  xAxisLabel: keyof T;
  width?: string | number;
  height?: string | number;
}

const PriceChart = <T,>(props: Props<T>): JSX.Element => {
  return (
    <ResponsiveContainer
      width={props.width ?? '95%'}
      height={props.height ?? '95%'}
    >
      <LineChart
        data={props.data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey={String(props.xAxisLabel)} tickFormatter={getDate} />
        <YAxis />
        <Tooltip labelFormatter={getDate} />
        <Legend />
        <Line
          type='monotone'
          dataKey={String(props.lineLabel)}
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
