// src/components/SearchBar/index.jsx
import React from 'react';
import './SearchBar.scss';

export default function SearchBar({ value = '', onChange }) {
  return (
    <div className="search-bar">
      <input value={value} onChange={(event) => onChange?.(event.target.value)} placeholder="Search for a smartphone..." className="search-input" />
      {value ? (
        <button type="button" onClick={() => onChange?.('')} aria-label="Clear search" className="clear-button">
          ✕
        </button>
      ) : null}
    </div>
  );
}
