// src/components/CartItem/index.jsx
import React from 'react';
import Typography from '../Typography';
import './CartItem.scss';

export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-content">
        <img src={item?.image} alt={item?.name} className="cart-item-image" />

        <div className="cart-item-container">
          <div>
            <Typography className="cart-item-details" variant="h2" style={{ margin: 0, fontSize: '0.9rem' }}>
              {item?.name.toUpperCase()}
            </Typography>
            <Typography className="cart-item-specs" variant="body" style={{ margin: '0.2rem 0' }}>
              {`${item.storage} | ${item.color.toUpperCase()}`}
            </Typography>
            <Typography className="cart-item-price" variant="body" style={{ margin: 0 }}>
              {item?.price?.toFixed?.(0)} EUR
            </Typography>
          </div>

          <button type="button" onClick={onRemove} className="cart-item-remove">
            <Typography variant="body" style={{ margin: 0, color: '#DF0000' }}>
              Eliminar
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
}
