import type { Meta, StoryObj } from '@storybook/react';
import PriceChart from '../components/ui/priceChart/PriceChart';

const meta: Meta<typeof PriceChart> = {
  title: 'Components/PriceChart',
  component: PriceChart,
};

export default meta;

interface DataItem {
  timestamp: number;
  price: number;
}

type Story = StoryObj<typeof PriceChart<DataItem>>;

const data = [
  { timestamp: 1617235200000, price: 2000 },
  { timestamp: 1617321600000, price: 1800 },
  { timestamp: 1617408000000, price: 2200 },
  { timestamp: 1617494400000, price: 2400 },
  { timestamp: 1617580800000, price: 2800 },
];

export const Chart: Story = {
  args: {
    data,
    lineLabel: 'price',
    xAxisLabel: 'timestamp',
    width: 400,
    height: 400,
  },
};
