import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Table from '../../components/ui/table/Table';

const headers = {
  id: 'ID',
  name: 'Name',
  button: 'Button',
};

const items = [
  {
    id: 1,
    name: 'Bitcoin',
    button: { text: 'Click Me 1' },
  },
  {
    id: 2,
    name: 'Ethereum',
    button: { text: 'Click Me 2' },
  },
  {
    id: 3,
    name: 'Tether',
    button: { text: 'Click Me 3' },
  },
];

describe('Table', () => {
  let handleClick = (): void => {};

  beforeEach(() => {
    handleClick = jest.fn();
    render(<Table items={items} headers={headers} onRowClick={handleClick} />);
  });

  describe.each(Object.entries(headers))(
    'renders table headers correctly (%s)',
    (key, value) => {
      it(`${key} header is rendered`, () => {
        expect(screen.getByText(value)).toBeInTheDocument();
      });
    },
  );

  it('renders table rows correctly', () => {
    items.forEach((item) => {
      expect(screen.getByText(item.id)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('calls onRowClick with correct row when clicked', () => {
    items.forEach((item) => {
      fireEvent.click(screen.getByText(item.name));
      expect(handleClick).toHaveBeenCalledWith(item);
    });
  });

  it('renders custom renderers correctly', () => {
    const customRenderers = {
      button: (item: {
        button: {
          text:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactFragment
            | React.ReactPortal
            | null
            | undefined;
        };
      }) => (
        <button>
          <span>{item.button.text}</span>
        </button>
      ),
    };
    render(
      <Table
        items={items}
        headers={headers}
        onRowClick={handleClick}
        customRenderers={customRenderers}
      />,
    );
    items.forEach((item) => {
      expect(screen.getByText(item.button.text)).toBeInTheDocument();
    });
  });
});
