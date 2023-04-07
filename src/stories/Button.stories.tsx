import { Button } from '../components/ui/buttons/Buttons';
import type { Meta, StoryObj } from '@storybook/react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
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

export const MultipleButtons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button {...args} tooltipText={undefined} icon={undefined} />
      <Button
        {...args}
        disabled={true}
        tooltipText={undefined}
        icon={undefined}
      />
      <Button {...args} icon={undefined} />
      <Button {...args} tooltipText={undefined} />
    </div>
  ),
  args: {
    text: DefaultButton.args?.text,
    icon: WithIcon.args?.icon,
    disabled: DisabledButton.args?.disabled,
    tooltipText: HoverText.args?.tooltipText,
  },
};
