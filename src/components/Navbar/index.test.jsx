import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './index';
import { useCartContext } from '../../hooks/useCartContext';

// Mock react-router-dom
let navLinkIsActive = false;
vi.mock('react-router-dom', () => ({
  NavLink: ({ children, to, style }) => (
    <a href={to} style={typeof style === 'function' ? style({ isActive: navLinkIsActive && to === '/cart' }) : style}>
      {children}
    </a>
  ),
}));

// Mock useCartContext
vi.mock('../../hooks/useCartContext', () => ({
  useCartContext: vi.fn(),
}));

// Mock assets
vi.mock('../../assets/logo.png', () => 'logo.png');
vi.mock('../../assets/bag.png', () => 'bag.png');

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders logo link', () => {
    useCartContext.mockReturnValue({ items: [] });

    render(<Navbar />);

    const logoLink = screen.getByRole('link', { name: /zara logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('renders cart link with item count', () => {
    useCartContext.mockReturnValue({ items: [{ id: '1' }, { id: '2' }] });

    render(<Navbar />);

    const cartLink = screen.getByRole('link', { name: /bag icon/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('renders cart link with zero count', () => {
    useCartContext.mockReturnValue({ items: [] });

    render(<Navbar />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('cart link is hidden on cart page', () => {
    useCartContext.mockReturnValue({ items: [] });

    // Set navLinkIsActive to true to simulate isActive for cart
    navLinkIsActive = true;

    render(<Navbar />);

    // The cart link should have display: none when isActive
    const cartLink = screen.getByRole('link', { name: /bag icon/i });
    expect(cartLink).toHaveStyle('display: none');

    // Reset navLinkIsActive after test
    navLinkIsActive = false;
  });
});
