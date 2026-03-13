import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button Component', () => {
  test('renders with label', () => {
    render(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('applies primary variant styles by default', () => {
    render(<Button label="Primary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background: #000');
    expect(button).toHaveStyle('color: #fff');
    expect(button).toHaveStyle('border: none');
  });

  test('applies secondary variant styles', () => {
    render(<Button label="Secondary" variant="secondary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background: transparent');
    expect(button).toHaveStyle('color: #333');
    expect(button).toHaveStyle('border: 1px solid #000');
  });

  test('calls onClick when clicked', () => {
    const mockOnClick = vi.fn();
    render(<Button label="Click Me" onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('has correct width', () => {
    render(<Button label="Test" />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('width: 16.25rem');
  });
});
