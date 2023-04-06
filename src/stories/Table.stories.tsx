import type { Meta, StoryObj } from '@storybook/react';
import Table from '../components/ui/table/Table';
import React from 'react';
import { Button } from '../components/ui/buttons/Buttons';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    onRowClick: { action: 'Row Clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Table<(typeof mockCurrencies)[0]>>;

const mockCurrencies = [
  {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    priceUsd: '2000000',
    supply: '5000000',
    maxSupply: '1000000',
    vwap24Hr: '1000000',
    marketCapUsd: '1000000',
    volumeUsd24Hr: '1000000',
    changePercent24Hr: '1000000',
    button: { text: 'Add', width: '100%' },
  },
  {
    id: 'ethereum',
    rank: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    priceUsd: '2000000',
    supply: '5000000',
    maxSupply: '1000000',
    vwap24Hr: '1000000',
    marketCapUsd: '1000000',
    volumeUsd24Hr: '1000000',
    changePercent24Hr: '1000000',
    button: { text: 'Add', width: '100%' },
  },
];

export const DefaultTable: Story = {
  args: {
    headers: {
      id: 'Id',
      rank: 'Rank',
      symbol: 'Symbol',
      name: 'Name',
      priceUsd: 'Price',
      supply: 'Supply',
      maxSupply: 'Max Supply',
      vwap24Hr: 'VWAP 24h',
      marketCapUsd: 'Market Cap',
      volumeUsd24Hr: 'Volume 24h',
      changePercent24Hr: 'Change 24h',
      button: 'Add',
    },
    items: mockCurrencies,
    customRenderers: {
      button: (it) => <Button text={it.button.text} width='100%' />,
    },
  },
};
