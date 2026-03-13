// src/components/Navbar/index.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../../hooks/useCartContext';
import logo from '../../assets/logo.png';
import bagIcon from '../../assets/bag.png';
export default function Navbar() {
  const { items } = useCartContext();
  const itemCount = items?.length ?? 0;

  return (
    <header style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#2563eb' : '#1f2937',
            fontWeight: isActive ? '600' : '700',
            display: 'flex',
            alignItems: 'center',
            margin: '0 2.5rem',
            gap: '0.5rem',
          })}
        >
          <img src={logo} alt="Zara logo" style={{ height: 24, width: 74, objectFit: 'contain' }} />
        </NavLink>

        <NavLink
          to="/cart"
          style={({ isActive }) => ({
            display: isActive ? 'none' : 'flex',
            textDecoration: 'none',
            color: isActive ? '#2563eb' : '#1f2937',
            fontWeight: isActive ? '600' : '400',
            alignItems: 'center',
            gap: '0.4rem',
          })}
        >
          <img src={bagIcon} alt="Bag icon" style={{ height: 18, width: 18, objectFit: 'contain' }} />
          <span style={{ minWidth: 24 }}>{itemCount}</span>
        </NavLink>
      </div>
    </header>
  );
}
