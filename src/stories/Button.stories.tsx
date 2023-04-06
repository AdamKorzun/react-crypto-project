import { Button } from '../components/ui/buttons/Buttons';
import type { Meta, StoryObj } from '@storybook/react';

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
