import React from 'react';
import { render } from '@testing-library/react';
import PriceChart from '../../components/ui/priceChart/PriceChart';

global.ResizeObserver = require('resize-observer-polyfill');

describe('PriceChart', () => {
  const data = [
    { timestamp: 1648031720000, price: 50000 },
    { timestamp: 1648031820000, price: 52000 },
    { timestamp: 1648031920000, price: 55000 },
  ];

  it('renders the chart correctly', () => {
    const { container } = render(
      <PriceChart
        data={data}
        xAxisLabel='timestamp'
        lineLabel='price'
        width={400}
        height={300}
      />,
    );

    expect(container.querySelector('.recharts-surface')).toBeInTheDocument();

    const chartWrapper = container.querySelector('.recharts-wrapper');
    expect(chartWrapper).not.toBeNull();
    if (chartWrapper) {
      expect(getComputedStyle(chartWrapper).width).toBe('400px');
      expect(getComputedStyle(chartWrapper).height).toBe('300px');
    }
  });
});
