// src/components/CartItem/index.jsx
import React from 'react';

export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '20.25rem' }}>
        <img src={item?.image} alt={item?.name} style={{ width: 260, height: 325, objectFit: 'cover', borderRadius: 8 }} />

        <div className="cart-item-container">
          <div>
            <div style={{ marginBottom: '0.5rem' }}>{item?.name.toUpperCase()}</div>
            <div style={{ fontSize: '0.9rem', color: '#555', display: 'flex' }}>{`${item.storage} | ${item.color.toUpperCase()}`}</div>
            <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '2rem' }}>{item?.price?.toFixed?.(0)} EUR</div>
          </div>

          <button
            type="button"
            onClick={onRemove}
            style={{
              color: '#c00',
              background: 'transparent',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              padding: 0,
              border: 'none',
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
