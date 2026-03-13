// src/pages/Cart/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import useCart from '../../hooks/useCart';
import Button from '../../components/Button';

export default function Cart() {
  const { items, total, removeItem } = useCart();

  return (
    <main style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
      <div style={{ flex: 1 }}>
        <div style={{ margin: '0 0 1rem' }}>CART ({items.length})</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((item) => (
            <CartItem key={item.id ?? item.name} item={item} onRemove={() => removeItem(item.id)} />
          ))}
        </div>
      </div>

      <div
        className="cart-footer-container"
        style={{
          display: 'flex',
          borderTop: '1px solid #eee',
        }}
      >
        <div className="cart-footer-button-container">
          <Button
            variant="secondary"
            label="CONTINUE SHOPPING"
            onClick={() => {
              window.location.href = '/';
            }}
          />
        </div>

        {items.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', width: '100%', justifyContent: 'flex-end' }}>
            <div className="cart-total">
              <div style={{ fontSize: '0.9rem' }}>TOTAL</div>
              <div style={{ fontSize: '0.9rem' }}>{total.toFixed(0)} EUR</div>
            </div>
            <div className="cart-footer-button-container">
              <Button variant="primary" label={'PAY'} onClick={() => alert('Payment not implemented in this demo.')} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
