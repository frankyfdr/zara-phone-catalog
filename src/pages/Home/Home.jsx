// src/pages/Home/Home.jsx
import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ResultCount from '../../components/ResultCount';
import PhoneGrid from '../../components/PhoneGrid';
import { getPhones } from '../../api/phoneApi';

const FALLBACK_PHONES = [
  {
    id: '1',
    name: 'Aurora X1',
    brand: 'Zara Mobile',
    price: 699.0,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Nova Pro',
    brand: 'Zara Mobile',
    price: 799.0,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Zara Lite',
    brand: 'Zara Mobile',
    price: 499.0,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'PixelFlow',
    brand: 'Zara Mobile',
    price: 649.0,
    image: 'https://via.placeholder.com/150',
  },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getPhones();
        console.log('Fetched phones:', response);
        const data = response?.data ?? [];
        if (!cancelled) {
          setPhones(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) {
          setPhones(FALLBACK_PHONES);
          setError('Unable to fetch phones; showing sample data.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const phonesToShow = useMemo(() => {
    if (!query) return phones.filter((phone, index, self) => index === self.findIndex((p) => p.id === phone.id)).slice(0, 20);

    const lowerQuery = query.toLowerCase();
    return phones
      .filter((phone) => phone.name?.toLowerCase().includes(lowerQuery) || phone.brand?.toLowerCase().includes(lowerQuery))
      .filter((phone, index, self) => index === self.findIndex((p) => p.id === phone.id))
      .slice(0, 20);
  }, [query, phones]);

  return (
    <main className="home-container" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <SearchBar value={query} onChange={setQuery} />

        <ResultCount count={phonesToShow.length} total={phonesToShow.length} />

        {error ? (
          <p style={{ color: '#c00' }}>{error}</p>
        ) : loading ? (
          <p style={{ color: '#555' }}>Loading phones…</p>
        ) : phonesToShow.length === 0 ? (
          <p style={{ color: '#555' }}>No matching phones found.</p>
        ) : (
          <PhoneGrid phones={phonesToShow} />
        )}
      </div>
    </main>
  );
}
