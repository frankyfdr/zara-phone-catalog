// src/components/PhoneCard/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PhoneCard({ phone }) {
  return (
    <Link to={`/product/${phone?.id ?? ''}`} className="phone-card">
      <div className="phone-card__image-container">
        <img src={phone?.imageUrl} alt={phone?.name ?? 'Phone image'} className="phone-card__image" />
      </div>

      <div className="phone-card__details">
        <div>
          <div className="phone-brand">{phone?.brand}</div>
          <div className="phone-model">{phone?.name?.toUpperCase() ?? 'Phone Name'}</div>
        </div>
        <div className="phone-price">{phone?.basePrice?.toFixed?.(0) ?? '0.00'} EUR</div>
      </div>
    </Link>
  );
}
