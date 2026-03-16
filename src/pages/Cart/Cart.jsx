// src/pages/Cart/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import useCart from '../../hooks/useCart';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import './Cart.scss';

export default function Cart() {
  const { items, total, removeItem } = useCart();

  return (
    <main className="cart-main">
      <div className="cart-content">
        <Typography className="cart-title" variant="h2" style={{ margin: 0 }}>
          CART ({items.length})
        </Typography>

        <div className="cart-items">
          {items.map((item) => (
            <CartItem key={item.id ?? item.name} item={item} onRemove={() => removeItem(item.id)} />
          ))}
        </div>
      </div>

      <div className="cart-footer">
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
          <div className="cart-total-section">
            <div className="cart-total">
              <Typography variant="label" style={{ margin: 0 }}>
                TOTAL
              </Typography>
              <Typography variant="body" style={{ margin: 0 }}>
                {total.toFixed(0)} EUR
              </Typography>
            </div>
            <div className="cart-footer-button-container">
              <Button data-testid="button-pay" variant="primary" label={'PAY'} onClick={() => alert('Payment not implemented in this demo.')} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
