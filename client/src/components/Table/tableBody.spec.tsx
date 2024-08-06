import { render, screen } from '@/helpers/test-utils';
import { describe, expect, it } from 'vitest';
import TableBody, { TableBodyProps } from './TableBody';

const mockData: TableBodyProps = {
  columns: [
    { label: 'Name', accessor: 'name' },
    { label: 'Rate', accessor: 'price' },
    { label: '% Change', accessor: 'percentChange' },
  ],
  data: [
    { name: 'USD', price: 1.0, percentChange: 10 },
    { name: 'EUR', price: 1.2, percentChange: 11 },
    { name: 'GBP', price: 1.5, percentChange: 15 },
  ],
  lowestValue: 'USD',
  highestValue: 'GBP',
};

const renderTableBody = () => {
  const table = document.createElement('table');

  const { container } = render(<TableBody {...mockData} />, {
    container: document.body.appendChild(table),
  });
  console.log(container);
};

describe('TableBody.tsx', () => {
  it('Renders the data correctly', async () => {
    renderTableBody();
    mockData.data.forEach((data) => {
      screen.getByText(data.name);
      screen.getByText(data.price);
      screen.getByText(`${data.percentChange} %`);
    });
  });

  it('Renders the lowestValue correctly', async () => {
    renderTableBody();
    const highestValueElement = screen.getByText('USD');
    const parentTr = highestValueElement.closest('tr');

    // Now you can make assertions on the parent element
    expect(parentTr).toHaveProperty('className', 'bg-red-200');
  });

  it('Renders the highestValue correctly', async () => {
    renderTableBody();
    const highestValueElement = screen.getByText('GBP');
    const parentTr = highestValueElement.closest('tr');

    // Now you can make assertions on the parent element
    expect(parentTr).toHaveProperty('className', 'bg-green-200');
  });
});
