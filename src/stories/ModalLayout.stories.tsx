import type { Meta, StoryObj } from '@storybook/react';
import ModalLayout from '../components/ui/modals/Layout/ModalLayout';

const meta: Meta<typeof ModalLayout> = {
  title: 'Components/ModalLayout',
  component: ModalLayout,
  argTypes: {
    toggle: { action: 'Clicked outside modal' },
  },
};

export default meta;

type Story = StoryObj<typeof ModalLayout>;

export const EmptyLayout: Story = {
  args: {
    isOpen: true,
  },
};
