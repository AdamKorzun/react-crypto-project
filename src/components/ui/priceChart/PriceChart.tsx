import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const PriceChart = (props: { data: any[] }): JSX.Element => {
  return (
    <ResponsiveContainer width="95%" height="95%">
      <LineChart
        width={400}
        height={400}
        data={props.data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        {' '}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="price" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amt"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
