// src/components/ProductSpecs/index.jsx
import React from 'react';

export default function ProductSpecs({ specs }) {
  if (!specs) return null;

  return (
    <div className="product-specs">
      <div style={{ paddingBottom: '1.75rem', borderBottom: '1px solid #CCCCCC' }}>SPECIFICATIONS</div>
      {Object.entries(specs).map(([key, value]) => (
        <div
          key={key}
          style={{
            marginBottom: '0.75rem',
            borderBottom: '1px solid #CCCCCC',
            display: 'flex',
            flexDirection: 'row',
            padding: '1rem 0',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '50%' }} className="text-small">
            {key.toUpperCase()}
          </div>
          <div style={{ textAlign: 'left', width: '50%' }} className="text-small">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
