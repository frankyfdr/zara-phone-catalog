import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './index';

describe('CartItem Component', () => {
  const mockItem = {
    id: '1',
    name: 'Aurora X1',
    image: 'image.jpg',
    storage: '128GB',
    color: 'Midnight',
    price: 699,
  };

  const mockOnRemove = vi.fn();

  test('renders item details', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('AURORA X1')).toBeInTheDocument();
    expect(screen.getByText('128GB | MIDNIGHT')).toBeInTheDocument();
    expect(screen.getByText('699 EUR')).toBeInTheDocument();
    expect(screen.getByAltText('Aurora X1')).toBeInTheDocument();
  });

  test('renders eliminar button', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    const button = screen.getByRole('button', { name: 'Eliminar' });
    expect(button).toBeInTheDocument();
  });

  test('calls onRemove when eliminar button is clicked', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    const button = screen.getByRole('button', { name: 'Eliminar' });
    fireEvent.click(button);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  test('handles missing item properties gracefully', () => {
    const incompleteItem = { id: '1' };
    render(<CartItem item={incompleteItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('UNDEFINED')).toBeInTheDocument();
  });
});
