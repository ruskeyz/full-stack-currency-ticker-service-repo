import { render, screen } from '@/helpers/test-utils';
import { act } from 'react-dom/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TableHead, { TableHeadProps } from './TableHead';

const mockData: TableHeadProps = {
  columns: [
    { label: 'Name', accessor: 'name' },
    { label: 'Rate', accessor: 'price' },
    { label: '% Change', accessor: 'percentChange' },
  ],
  handleSorting: vi.fn(), // Mock the sorting function
};

const renderTableHead = () => {
  const table = document.createElement('table');

  const { container } = render(<TableHead {...mockData} />, {
    container: document.body.appendChild(table),
  });
  console.log(container);
};

describe('TableHead.tsx', () => {
  it('Renders the columns correctly', async () => {
    renderTableHead();
    mockData.columns.forEach((data) => {
      screen.getByText(data.label);
    });
  });

  it('calls handleSorting when a column header is clicked', async () => {
    renderTableHead();

    // Simulate a click on a column header
    const currencyCodeHeader = screen.getByText('Name');
    currencyCodeHeader.click();
    act(() => {
      // Check if the handleSorting function was called with the correct parameters
      expect(mockData.handleSorting).toHaveBeenCalledWith('name', 'asc');
    });
  });
});
