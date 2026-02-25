import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@skyscanner/backpack-web/bpk-component-button', () => {
  return function MockButton({ children, ...props }) {
    return <button {...props}>{children}</button>;
  };
});

test('renders without crashing', () => {
  render(<App />);
  const headerElement = screen.getByText(/Flight Schedule/i);
  expect(headerElement).toBeInTheDocument();
});
