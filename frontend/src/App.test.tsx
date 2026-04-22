import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders dashboard heading and metric cards', () => {
    render(<App />);
    expect(screen.getByText('AI Energy Impact Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tokens / second')).toBeInTheDocument();
    expect(screen.getByText('Energy / day')).toBeInTheDocument();
    expect(screen.getByText('CO2 / day')).toBeInTheDocument();
    expect(screen.getByText('Cost / day')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Models' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Regions' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Research' })).toBeInTheDocument();
  });

  it('renders scenario builder controls', () => {
    render(<App />);
    expect(screen.getByText('Scenario Builder')).toBeInTheDocument();
  });
});
