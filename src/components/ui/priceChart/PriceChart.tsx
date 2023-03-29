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

const PriceChart = <T,>(props: {
  data: T[];
  lineLabel: keyof T;
  xAxisLabel: keyof T;
}): JSX.Element => {
  function isValidTimestamp(timestamp: keyof T): boolean {
    const newTimestamp = new Date(Number(timestamp)).getTime();
    return !isNaN(Number(newTimestamp));
  }

  return (
    <ResponsiveContainer width="95%" height="95%">
      <LineChart
        width={400}
        height={400}
        data={props.data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis
          dataKey={String(props.xAxisLabel)}
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
          dataKey={String(props.lineLabel)}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
