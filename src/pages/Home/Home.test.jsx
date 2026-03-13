import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from './Home';
import { getPhones } from '../../api/phoneApi';

// Mock the API
vi.mock('../../api/phoneApi', () => ({
  getPhones: vi.fn(),
}));

// Mock components
vi.mock('../../components/SearchBar', () => ({
  default: ({ value, onChange }) => (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search phones" data-testid="search-input" />
  ),
}));

vi.mock('../../components/ResultCount', () => ({
  default: ({ count }) => <div data-testid="result-count">{count} results</div>,
}));

vi.mock('../../components/PhoneGrid', () => ({
  default: ({ phones }) => (
    <div data-testid="phone-grid">
      {phones.map((phone) => (
        <div key={phone.id} data-testid={`phone-${phone.id}`}>
          {phone.name}
        </div>
      ))}
    </div>
  ),
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state initially', () => {
    getPhones.mockResolvedValue({ data: [] });
    render(<Home />);
    expect(screen.getByText('Loading phones…')).toBeInTheDocument();
  });

  test('renders phones after loading', async () => {
    const mockPhones = [
      { id: '1', name: 'Aurora X1', brand: 'Zara Mobile' },
      { id: '2', name: 'Nova Pro', brand: 'Zara Mobile' },
    ];
    getPhones.mockResolvedValue({ data: mockPhones });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('phone-1')).toBeInTheDocument();
      expect(screen.getByTestId('phone-2')).toBeInTheDocument();
    });

    expect(screen.getByTestId('result-count')).toHaveTextContent('2 results');
  });

  test('filters phones based on search query', async () => {
    const mockPhones = [
      { id: '1', name: 'Aurora X1', brand: 'Zara Mobile' },
      { id: '2', name: 'Nova Pro', brand: 'Zara Mobile' },
    ];
    getPhones.mockResolvedValue({ data: mockPhones });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('phone-1')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Aurora' } });

    await waitFor(() => {
      expect(screen.getByTestId('phone-1')).toBeInTheDocument();
      expect(screen.queryByTestId('phone-2')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('result-count')).toHaveTextContent('1 results');
  });

  test('shows error and fallback phones on API failure', async () => {
    getPhones.mockRejectedValue(new Error('API Error'));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Unable to fetch phones; showing sample data.')).toBeInTheDocument();
    });

    // Should show fallback phones
    expect(screen.getByTestId('phone-1')).toBeInTheDocument();
  });

  test('shows no results message when no phones match', async () => {
    const mockPhones = [{ id: '1', name: 'Aurora X1', brand: 'Zara Mobile' }];
    getPhones.mockResolvedValue({ data: mockPhones });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('phone-1')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText('No matching phones found.')).toBeInTheDocument();
    });
  });
});
