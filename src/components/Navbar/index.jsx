// src/components/Navbar/index.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../../hooks/useCartContext';
import logo from '../../assets/logo.png';
import bagIcon from '../../assets/bag.png';
import './Navbar.scss';

export default function Navbar() {
  const { items } = useCartContext();
  const itemCount = items?.length ?? 0;

  return (
    <header className="navbar">
      <div className="navbar-content">
        <NavLink to="/" className={({ isActive }) => `navbar-logo ${isActive ? 'active' : ''}`}>
          <img src={logo} alt="Zara logo" />
        </NavLink>

        <NavLink to="/cart" className={({ isActive }) => `navbar-cart ${isActive ? 'hidden' : ''}`}>
          <img src={bagIcon} alt="Bag icon" />
          <span className="navbar-count">{itemCount}</span>
        </NavLink>
      </div>
    </header>
  );
}
