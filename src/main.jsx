// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import './styles/global.scss';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);
