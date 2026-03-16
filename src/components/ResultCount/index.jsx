// src/components/ResultCount/index.jsx
import React from 'react';
import Typography from '../Typography';

export default function ResultCount({ count, total }) {
  return (
    <Typography variant="label" style={{ marginBottom: '1rem', color: '#555', display: 'block' }}>
      {count === 0 ? 'No results' : `${total} RESULTS`}
    </Typography>
  );
}
