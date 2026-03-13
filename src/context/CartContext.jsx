// src/context/CartContext.jsx
import React, { useEffect, useState } from 'react';
import { CartContext } from './cartContextBase';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => [...prev, item]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return <CartContext.Provider value={{ items, addItem, removeItem }}>{children}</CartContext.Provider>;
};
