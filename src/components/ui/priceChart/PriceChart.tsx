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

function isValidTimestamp(timestamp: any): boolean {
  const newTimestamp = new Date(timestamp).getTime();
  return !isNaN(Number(newTimestamp));
}
const PriceChart = <T,>(props: {
  data: T[];
  lineLabel: keyof T;
  xAxisLabel: keyof T;
}): JSX.Element => {
  return (
    <ResponsiveContainer width="95%" height="95%">
      <LineChart
        width={400}
        height={400}
        data={props.data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis
          dataKey={props.xAxisLabel as string}
          tickFormatter={(tick) => {
            return isValidTimestamp(tick)
              ? new Date(tick).toLocaleDateString()
              : tick;
          }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={props.lineLabel as string}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
