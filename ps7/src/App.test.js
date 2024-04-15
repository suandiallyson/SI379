import { render, screen } from '@testing-library/react';
import LemonTimerApp from './App';

test('renders learn react link', () => {
  render(<LemonTimerApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
