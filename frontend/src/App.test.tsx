import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders dashboard heading', () => {
    render(<App />);
    expect(screen.getByText('AI Energy Impact Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tokens / second')).toBeInTheDocument();
    expect(screen.getByText('Energy / day')).toBeInTheDocument();
  });
});
