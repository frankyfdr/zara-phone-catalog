// src/components/ResultCount/index.jsx
import React from 'react';

export default function ResultCount({ count, total }) {
  return <div style={{ marginBottom: '1rem', color: '#555' }}>{count === 0 ? 'No results' : `${total} RESULTS`}</div>;
}
