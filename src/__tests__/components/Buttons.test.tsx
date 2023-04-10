import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Button } from '../../components/ui/buttons/Buttons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders the text correctly', () => {
    const text = 'Click me';
    const { getByText } = render(<Button text={text} />);
    expect(getByText(text)).toBeInTheDocument();
  });

  it('executes the onClick callback when clicked', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <Button text='Click me' onClick={onClickMock} />,
    );
    fireEvent.click(getByRole('button'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('does not execute the onClick callback when disabled', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <Button text='Click me' onClick={onClickMock} disabled />,
    );
    fireEvent.click(getByRole('button'));
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('renders the icon correctly', () => {
    const { container } = render(
      <Button text='Click me' icon={faMagnifyingGlass} />,
    );
    expect(container.querySelector('.fa-magnifying-glass')).toBeInTheDocument();
  });

  it('renders the tooltip correctly', async () => {
    const tooltipText = 'This is a tooltip';
    const buttonText = 'Click me';
    const { getByText, queryByText } = render(
      <Button text={buttonText} tooltipText={tooltipText} />,
    );
    expect(queryByText(tooltipText)).not.toBeInTheDocument();
    userEvent.hover(getByText(buttonText));
    await waitFor(
      () => {
        expect(queryByText(tooltipText)).toBeVisible();
      },
      { timeout: 500 },
    );
    userEvent.unhover(getByText(buttonText));
    await waitFor(
      () => {
        expect(queryByText(tooltipText)).not.toBeVisible();
      },
      { timeout: 500 },
    );
  });
});
