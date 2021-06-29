import { render, screen } from '@testing-library/react';
import App from './App';

describe('App renders correct contents', () => {
  test('renders a loading page at first content paintful', () => {
    render(<App />);
    const dialogTitle = screen.getByText(/Loading.../i);
    expect(dialogTitle).toBeInTheDocument();
  });

  test('renders a sidebar after loading', async () => {
    render(<App />);
    expect(screen.queryByText(/Discover/)).toBeNull();
    expect(await screen.findByRole(/navigation/)).toBeInTheDocument();
  } )

  test('renders main page content after loading', async () => {
    render(<App />);
    expect(await screen.findByRole(/main/)).toBeInTheDocument();
  } )
})

