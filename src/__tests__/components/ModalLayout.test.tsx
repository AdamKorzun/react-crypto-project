import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ModalLayout from '../../components/ui/modals/Layout/ModalLayout';

describe('ModalLayout', () => {
  it('renders the modal content when isOpen is true', () => {
    const { getByText } = render(
      <ModalLayout isOpen={true} toggle={() => {}}>
        <div>Modal Content</div>
      </ModalLayout>,
    );
    expect(getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal content when isOpen is false', () => {
    const { queryByText } = render(
      <ModalLayout isOpen={false} toggle={() => {}}>
        <div>Modal Content</div>
      </ModalLayout>,
    );
    expect(queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls the toggle function when clicking outside the modal', () => {
    const toggleMock = jest.fn();
    const { getByTestId } = render(
      <ModalLayout isOpen={true} toggle={toggleMock}>
        <div>Modal Content</div>
      </ModalLayout>,
    );
    fireEvent.click(getByTestId('overlay'));
    expect(toggleMock).toHaveBeenCalled();
  });

  it('does not call the toggle function when clicking inside the modal', () => {
    const toggleMock = jest.fn();
    const { getByTestId } = render(
      <ModalLayout isOpen={true} toggle={toggleMock}>
        <div>Modal Content</div>
      </ModalLayout>,
    );
    fireEvent.click(getByTestId('content'));
    expect(toggleMock).not.toHaveBeenCalled();
  });
});
