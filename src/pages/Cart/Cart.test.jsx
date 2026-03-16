import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';
import useCart from '../../hooks/useCart';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock useCart hook
vi.mock('../../hooks/useCart', () => ({
  default: vi.fn(),
}));

// Mock CartItem
vi.mock('../../components/CartItem', () => ({
  default: ({ item, onRemove }) => (
    <div data-testid={`cart-item-${item.id}`}>
      {item.name}
      <button onClick={onRemove} data-testid={`remove-${item.id}`}>
        Eliminar
      </button>
    </div>
  ),
}));

// Mock Button
vi.mock('../../components/Button', () => ({
  default: ({ label, onClick, variant }) => (
    <button onClick={onClick} data-testid={`button-${label.toLowerCase().replace(' ', '-')}`} data-variant={variant}>
      {label}
    </button>
  ),
}));

describe('Cart Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders empty cart', () => {
    useCart.mockReturnValue({
      items: [],
      total: 0,
      removeItem: vi.fn(),
    });

    render(<Cart />);

    expect(screen.getByText(/CART\s*\(0\)/i)).toBeInTheDocument();
    expect(screen.getByTestId('button-continue-shopping')).toBeInTheDocument();
    expect(screen.queryByTestId('button-pay')).not.toBeInTheDocument();
    expect(screen.queryByText(/TOTAL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/0\s*EUR/i)).not.toBeInTheDocument();
  });

  test('renders cart items', () => {
    const mockItems = [
      { id: '1', name: 'Aurora X1', price: 699 },
      { id: '2', name: 'Nova Pro', price: 799 },
    ];

    useCart.mockReturnValue({
      items: mockItems,
      total: 1498,
      removeItem: vi.fn(),
    });

    render(<Cart />);

    expect(screen.getByText('CART (2)')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
    expect(screen.getByText('1498 EUR')).toBeInTheDocument();
  });

  test('calls removeItem when remove button is clicked', () => {
    const mockRemoveItem = vi.fn();
    const mockItems = [{ id: '1', name: 'Aurora X1', price: 699 }];

    useCart.mockReturnValue({
      items: mockItems,
      total: 699,
      removeItem: mockRemoveItem,
    });

    render(<Cart />);

    const removeButton = screen.getByTestId('remove-1');
    fireEvent.click(removeButton);

    expect(mockRemoveItem).toHaveBeenCalledWith('1');
  });

  test('continue shopping button navigates to home', () => {
    useCart.mockReturnValue({
      items: [],
      total: 0,
      removeItem: vi.fn(),
    });

    // Mock window.location
    delete window.location;
    window.location = { href: '' };

    render(<Cart />);

    const continueButton = screen.getByTestId('button-continue-shopping');
    fireEvent.click(continueButton);

    expect(window.location.href).toBe('/');
  });

  test('pay button shows alert', () => {
    const mockItems = [{ id: '1', name: 'Aurora X1', price: 699 }];
    useCart.mockReturnValue({
      items: mockItems,
      total: 699,
      removeItem: vi.fn(),
    });

    // Mock alert
    const mockAlert = vi.fn();
    window.alert = mockAlert;

    render(<Cart />);

    const payButton = screen.getByTestId('button-pay');
    fireEvent.click(payButton);

    expect(mockAlert).toHaveBeenCalledWith('Payment not implemented in this demo.');
  });
});
