// src/components/CartItem/index.jsx
import React from 'react';
import './CartItem.scss';

export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-content">
        <img src={item?.image} alt={item?.name} className="cart-item-image" />

        <div className="cart-item-container">
          <div>
            <div className="cart-item-details">{item?.name.toUpperCase()}</div>
            <div className="cart-item-specs">{`${item.storage} | ${item.color.toUpperCase()}`}</div>
            <div className="cart-item-price">{item?.price?.toFixed?.(0)} EUR</div>
          </div>

          <button type="button" onClick={onRemove} className="cart-item-remove">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
