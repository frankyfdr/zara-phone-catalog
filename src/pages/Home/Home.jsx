// src/pages/Home/Home.jsx
import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import ResultCount from '../../components/ResultCount';
import PhoneGrid from '../../components/PhoneGrid';
import Typography from '../../components/Typography';
import { getPhones } from '../../api/phoneApi';
import './Home.scss';

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
    <main className="home-main">
      <div className="home-content">
        <SearchBar value={query} onChange={setQuery} />

        <ResultCount count={phonesToShow.length} total={phonesToShow.length} />

        {error ? (
          <Typography variant="body" style={{ color: '#c00', margin: 0 }}>
            {error}
          </Typography>
        ) : loading ? (
          <Typography variant="body" style={{ color: '#555', margin: 0 }}>
            Loading phones…
          </Typography>
        ) : phonesToShow.length === 0 ? (
          <Typography variant="body" style={{ color: '#555', margin: 0 }}>
            No matching phones found.
          </Typography>
        ) : (
          <PhoneGrid phones={phonesToShow} />
        )}
      </div>
    </main>
  );
}
