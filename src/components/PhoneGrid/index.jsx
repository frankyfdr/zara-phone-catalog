// src/components/PhoneGrid/index.jsx
import React from 'react';
import PhoneCard from '../PhoneCard';

export default function PhoneGrid({ phones = [] }) {
  console.log('Rendering PhoneGrid with phones:', phones);
  return (
    <div className="phone-grid">
      {phones.map((phone) => (
        <PhoneCard key={phone.id} phone={phone} />
      ))}
    </div>
  );
}
