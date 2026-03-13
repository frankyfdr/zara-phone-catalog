// src/hooks/useCartContext.js
import { useContext } from 'react';
import { CartContext } from '../context/cartContextBase';

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
