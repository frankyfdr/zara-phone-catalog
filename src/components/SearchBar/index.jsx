// src/components/SearchBar/index.jsx
import React from 'react';

export default function SearchBar({ value = '', onChange }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Search for a smartphone..."
        style={{
          width: '100%',
          padding: '0.75rem',
          paddingRight: '2.5rem',
          border: '0px',
          borderBottom: '1px solid #ccc',
          color: '#333',
        }}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange?.('')}
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: '#999',
            fontSize: '0.625rem',
            padding: 0,
          }}
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
