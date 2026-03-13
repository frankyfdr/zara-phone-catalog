import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './index';

describe('SearchBar Component', () => {
  test('renders input with placeholder', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Search for a smartphone...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('calls onChange when input value changes', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Search for a smartphone...');
    fireEvent.change(input, { target: { value: 'Aurora' } });

    expect(mockOnChange).toHaveBeenCalledWith('Aurora');
  });

  test('displays value in input', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="Test" onChange={mockOnChange} />);

    const input = screen.getByDisplayValue('Test');
    expect(input).toBeInTheDocument();
  });

  test('shows clear button when value is not empty', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="Test" onChange={mockOnChange} />);

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveTextContent('✕');
  });

  test('does not show clear button when value is empty', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const clearButton = screen.queryByRole('button', { name: 'Clear search' });
    expect(clearButton).not.toBeInTheDocument();
  });

  test('clear button calls onChange with empty string', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="Test" onChange={mockOnChange} />);

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith('');
  });
});
