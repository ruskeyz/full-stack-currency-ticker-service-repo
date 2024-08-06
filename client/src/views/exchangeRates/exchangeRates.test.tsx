//check that sorting works

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import ExchangeRates from './ExchangeRates';

describe('ExchangeRates Component', () => {
  it('Check that sorting works', async () => {
    render(<ExchangeRates />);
    //const sortingButton = screen.getByRole('th', { name: '% Change' });
    const sortingButton = screen.getByText('% Change');
    fireEvent.click(sortingButton);
    const data = screen.getAllByRole('td', { name: /%/ });
    console.log(data);
  });
});
