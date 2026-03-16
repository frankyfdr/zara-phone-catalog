import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductDetail from './ProductDetail';
import { getPhoneDetail } from '../../api/phoneApi';
import useCart from '../../hooks/useCart';
import { useParams, useNavigate } from 'react-router-dom';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

// Mock API
vi.mock('../../api/phoneApi', () => ({
  getPhoneDetail: vi.fn(),
}));

// Mock useCart
vi.mock('../../hooks/useCart', () => ({
  default: vi.fn(),
}));

// Mock components
vi.mock('../../components/ProductSpecs', () => ({
  default: ({ specs }) => <div data-testid="product-specs">{specs.name}</div>,
}));

vi.mock('../../components/PhoneCard', () => ({
  default: ({ phone }) => <div data-testid={`phone-card-${phone.id}`}>{phone.name}</div>,
}));

describe('ProductDetail Page', () => {
  const mockNavigate = vi.fn();
  const mockAddItem = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useParams.mockReturnValue({ id: '1' });
    useNavigate.mockReturnValue(mockNavigate);
    useCart.mockReturnValue({ addItem: mockAddItem });
  });

  test('renders loading state', () => {
    getPhoneDetail.mockResolvedValue({ data: null });
    render(<ProductDetail />);
    expect(screen.getByText('Loading product...')).toBeInTheDocument();
  });

  test('renders product details after loading', async () => {
    const mockPhone = {
      id: '1',
      name: 'Aurora X1',
      brand: 'Zara Mobile',
      basePrice: 699,
      colorOptions: [
        { name: 'Midnight', hexCode: '#000000', imageUrl: 'image1.jpg' },
        { name: 'Silver', hexCode: '#c0c0c0', imageUrl: 'image2.jpg' },
      ],
      storageOptions: [
        { capacity: '128GB', price: 699 },
        { capacity: '256GB', price: 799 },
      ],
      specs: { screen: '6.1"' },
      similarProducts: [{ id: '2', name: 'Nova Pro' }],
    };

    getPhoneDetail.mockResolvedValue({ data: mockPhone });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.getByText('AURORA X1')).toBeInTheDocument();
    });

    expect(screen.getByText('699 EUR')).toBeInTheDocument();
    expect(screen.getByTestId('product-specs')).toBeInTheDocument();
    expect(screen.getByTestId('phone-card-2')).toBeInTheDocument();
  });

  test('back button navigates to home', async () => {
    getPhoneDetail.mockResolvedValue({ data: { id: '1', name: 'Test Phone', basePrice: 699, colorOptions: [], storageOptions: [] } });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.getByText('< BACK')).toBeInTheDocument();
    });

    const backButton = screen.getByText('< BACK');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('storage selection updates price', async () => {
    const mockPhone = {
      id: '1',
      name: 'Aurora X1',
      basePrice: 699,
      colorOptions: [{ name: 'Midnight', hexCode: '#000000', imageUrl: 'image1.jpg' }],
      storageOptions: [
        { capacity: '128GB', price: 699 },
        { capacity: '256GB', price: 799 },
      ],
    };

    getPhoneDetail.mockResolvedValue({ data: mockPhone });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.getByText('699 EUR')).toBeInTheDocument();
    });

    const storage256Button = screen.getByText('256GB');
    fireEvent.click(storage256Button);

    expect(screen.getByText('799 EUR')).toBeInTheDocument();
  });

  test('color selection updates selected color display', async () => {
    const mockPhone = {
      id: '1',
      name: 'Aurora X1',
      basePrice: 699,
      colorOptions: [
        { name: 'Midnight', hexCode: '#000000', imageUrl: 'image1.jpg' },
        { name: 'Silver', hexCode: '#c0c0c0', imageUrl: 'image2.jpg' },
      ],
      storageOptions: [{ capacity: '128GB', price: 699 }],
    };

    getPhoneDetail.mockResolvedValue({ data: mockPhone });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.getByText('AURORA X1')).toBeInTheDocument();
    });

    const colorButton = screen.getAllByRole('button').find((btn) => btn.style.background === 'rgb(192, 192, 192)');
    fireEvent.click(colorButton);

    expect(screen.getByText('SILVER')).toBeInTheDocument();
  });

  test('add to cart button is disabled when no selections', async () => {
    const mockPhone = {
      id: '1',
      name: 'Aurora X1',
      basePrice: 699,
      colorOptions: [{ name: 'Midnight', hexCode: '#000000', imageUrl: 'image1.jpg' }],
      storageOptions: [{ capacity: '128GB', price: 699 }],
    };

    getPhoneDetail.mockResolvedValue({ data: mockPhone });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.getByText('AÑADIR')).toBeInTheDocument();
    });

    const addButton = screen.getByTestId('button-add-to-cart');
    expect(addButton).toBeDisabled();
  });

  test('add to cart button is enabled when selections made', async () => {
    const mockPhone = {
      id: '1',
      name: 'Aurora X1',
      basePrice: 699,
      colorOptions: [{ name: 'Midnight', hexCode: '#000000', imageUrl: 'image1.jpg' }],
      storageOptions: [{ capacity: '128GB', price: 699 }],
    };

    getPhoneDetail.mockResolvedValue({ data: mockPhone });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.getByText('AÑADIR')).toBeInTheDocument();
    });

    const storageButton = screen.getByText('128GB');
    const colorButton = screen.getAllByRole('button').find((btn) => btn.style.background === 'rgb(0, 0, 0)');

    fireEvent.click(storageButton);
    fireEvent.click(colorButton);

    const addButton = screen.getByTestId('button-add-to-cart');
    expect(addButton).not.toBeDisabled();
  });

  test('add to cart calls addItem with correct data', async () => {
    const mockPhone = {
      id: '1',
      name: 'Aurora X1',
      brand: 'Zara Mobile',
      basePrice: 699,
      colorOptions: [{ name: 'Midnight', hexCode: '#000000', imageUrl: 'image1.jpg' }],
      storageOptions: [{ capacity: '128GB', price: 699 }],
    };

    getPhoneDetail.mockResolvedValue({ data: mockPhone });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.getByText('AÑADIR')).toBeInTheDocument();
    });

    const storageButton = screen.getByText('128GB');
    const colorButton = screen.getAllByRole('button').find((btn) => btn.style.background === 'rgb(0, 0, 0)');

    fireEvent.click(storageButton);
    fireEvent.click(colorButton);

    const addButton = screen.getByTestId('button-add-to-cart');
    fireEvent.click(addButton);

    expect(mockAddItem).toHaveBeenCalledWith({
      id: '1-Midnight-128GB',
      name: 'Aurora X1',
      brand: 'Zara Mobile',
      image: 'image1.jpg',
      color: 'Midnight',
      storage: '128GB',
      price: 699,
    });
  });

  test('shows not found state on API failure', async () => {
    getPhoneDetail.mockRejectedValue(new Error('API Error'));

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.getByText('Product not found.')).toBeInTheDocument();
    });
  });
});
