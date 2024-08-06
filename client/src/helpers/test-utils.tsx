import { render, RenderOptions } from '@testing-library/react';
import '@/index.css';
import React from 'react';
type AllTheProvidersProps = { children: React.ReactNode };

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <>{children}</>;
};
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options });
//fine for testing
export * from '@testing-library/react';
export { customRender as render };
