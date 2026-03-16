import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './index';
import { useCartContext } from '../../hooks/useCartContext';

// Mock react-router-dom
let navLinkIsActive = false;
vi.mock('react-router-dom', () => ({
  NavLink: ({ children, to, style, className, ...props }) => {
    const isActive = navLinkIsActive && to === '/cart';
    const resolvedStyle = typeof style === 'function' ? style({ isActive }) : style;
    const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className;

    return (
      <a href={to} style={resolvedStyle} className={resolvedClassName} {...props}>
        {children}
      </a>
    );
  },
}));

// Mock useCartContext
vi.mock('../../hooks/useCartContext', () => ({
  useCartContext: vi.fn(),
}));

// Mock assets
vi.mock('../../assets/logo.png', () => ({ default: 'logo.png' }));
vi.mock('../../assets/bag.png', () => ({ default: 'bag.png' }));

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navLinkIsActive = false;
  });

  test('renders logo/home link', () => {
    useCartContext.mockReturnValue({ items: [] });

    render(<Navbar />);

    const homeLink = screen.getAllByRole('link').find((link) => link.getAttribute('href') === '/');
    expect(homeLink).toBeInTheDocument();
  });

  test('renders cart link with item count', () => {
    useCartContext.mockReturnValue({ items: [{ id: '1' }, { id: '2' }] });

    render(<Navbar />);

    const cartLink = screen.getByTestId('navbar-cart');
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
    navLinkIsActive = true;

    render(<Navbar />);

    const cartLink = screen.getByTestId('navbar-cart');

    const isHiddenByClass = cartLink.classList.contains('hidden');
    const isHiddenByStyle = cartLink.style.display === 'none';

    expect(isHiddenByClass || isHiddenByStyle).toBe(true);
  });
});
