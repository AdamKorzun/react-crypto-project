import { Button } from '../components/ui/buttons/Buttons';
import type { Meta, StoryObj } from '@storybook/react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const MainButton: Story = {
  args: {
    text: 'Button',
  },
};

export const DisabledButton: Story = {
  args: {
    text: 'Button',
    disabled: true,
  },
};

export const HoverText: Story = {
  args: {
    text: 'Button',
    tooltipText: 'Tooltip Text',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Button',
    icon: faMagnifyingGlass,
  },
};
