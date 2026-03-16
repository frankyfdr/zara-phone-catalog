// src/pages/ProductDetail/ProductDetail.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPhoneDetail } from '../../api/phoneApi';
import useCart from '../../hooks/useCart';
import ProductSpecs from './ProductSpecs';
import PhoneCard from '../../components/PhoneCard';
import './ProductDetail.scss';
import Button from '../../components/Button';
import Typography from '../../components/Typography';

const FALLBACK_PHONE = {
  id: '1',
  name: 'Aurora X1',
  brand: 'Zara Mobile',
  description: 'A premium smartphone with powerful performance and a sleek design.',
  basePrice: 699,
  rating: 4.5,
  specs: {
    screen: '6.1"',
    resolution: '2556 x 1179',
    processor: 'Custom Chip',
    mainCamera: '48MP',
    selfieCamera: '12MP',
    battery: '3500mAh',
    os: 'Android 14',
    screenRefreshRate: '120Hz',
  },
  colorOptions: [
    {
      name: 'Midnight',
      hexCode: '#000000',
      imageUrl: 'https://via.placeholder.com/640x480',
    },
    {
      name: 'Silver',
      hexCode: '#c0c0c0',
      imageUrl: 'https://via.placeholder.com/640x480',
    },
    {
      name: 'Rose',
      hexCode: '#ff69b4',
      imageUrl: 'https://via.placeholder.com/640x480',
    },
  ],
  storageOptions: [
    { capacity: '128GB', price: 699 },
    { capacity: '256GB', price: 799 },
    { capacity: '512GB', price: 899 },
  ],
  similarProducts: [],
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [phone, setPhone] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const detailResp = await getPhoneDetail(id);

        const detail = detailResp?.data;
        const list = detailResp?.data.similarProducts;

        if (!cancelled) {
          setPhone(detail || FALLBACK_PHONE);
          setSimilar((Array.isArray(list) ? list : []).filter((item) => item?.id !== id).slice(0, 4));
        }
      } catch {
        if (!cancelled) {
          setPhone(FALLBACK_PHONE);
          setSimilar([]);
          setError('Unable to load phone details. Showing demo product.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const storageOptions = useMemo(() => phone?.storageOptions ?? [], [phone]);
  const colorOptions = useMemo(() => phone?.colorOptions ?? [], [phone]);

  const selectedColorObj = useMemo(() => colorOptions.find((c) => c.name === selectedColor) ?? null, [selectedColor, colorOptions]);

  const selectedStorageObj = useMemo(() => storageOptions.find((s) => s.capacity === selectedStorage) ?? null, [selectedStorage, storageOptions]);

  const dynamicPrice = useMemo(() => selectedStorageObj?.price ?? phone?.basePrice ?? 0, [phone, selectedStorageObj]);

  const canAddToCart = Boolean(selectedColor && selectedStorage);

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    addItem({
      id: `${phone?.id}-${selectedColor}-${selectedStorage}`,
      name: phone?.name,
      brand: phone?.brand,
      image: selectedColorObj?.imageUrl ?? phone?.colorOptions?.[0]?.imageUrl,
      color: selectedColor,
      storage: selectedStorage,
      price: dynamicPrice,
    });
  };

  if (loading) {
    return (
      <main style={{ padding: '1.5rem' }}>
        <Typography variant="body" style={{ margin: 0 }}>
          Loading product...
        </Typography>
      </main>
    );
  }

  if (!phone) {
    return (
      <main style={{ padding: '1.5rem' }}>
        <Typography variant="body" style={{ margin: 0 }}>
          Product not found.
        </Typography>
      </main>
    );
  }

  return (
    <main className="product-detail-main">
      <button type="button" onClick={() => navigate('/')} className="product-detail-back">
        <Typography variant="label">&lt; BACK</Typography>
      </button>

      {error ? (
        <Typography variant="body" style={{ color: '#c00', margin: 0 }}>
          {error}
        </Typography>
      ) : null}

      <div className="product-detail-container">
        <div className="product-detail-layout">
          <div className="product-detail-image">
            <img src={selectedColorObj?.imageUrl ?? phone?.colorOptions?.[0]?.imageUrl} alt={phone?.name} />
          </div>

          <div className="product-detail-info">
            <section className="product-detail-section" style={{ width: '100%' }}>
              <div className="product-detail-name">{phone.name.toUpperCase()}</div>
              <div className="text-small product-detail-price">{dynamicPrice.toFixed(0)} EUR</div>

              <div style={{ marginBottom: '1.5rem' }}>
                <Typography variant="label" style={{ margin: '2rem 0' }}>
                  STORAGE. CHOOSE YOUR CAPACITY.
                </Typography>
                <div className="storage-options" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {storageOptions.map((storage) => (
                    <button
                      key={storage.capacity}
                      type="button"
                      onClick={() => setSelectedStorage(storage.capacity)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        width: '95px',
                        height: '65px',
                        border: selectedStorage === storage.capacity ? '1px solid #000000' : '1px solid #CCCCCC',
                        cursor: 'pointer',
                        background: 'transparent',
                      }}
                    >
                      {storage.capacity}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <Typography variant="label" style={{ margin: '2rem 0' }}>
                  COLOR. PICK YOUR FAVOURITE.
                </Typography>
                <div className="color-options" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {colorOptions.map((color) => (
                    <div
                      key={color.name}
                      style={{
                        border: selectedColor === color.name ? '1px solid #000000' : '1px solid #CCCCCC',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        padding: 1,
                      }}
                    >
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                        style={{
                          color: 'inherit',
                          width: 24,
                          border: 'none',
                          height: 24,
                          background: color.hexCode,
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-xsmall" style={{ marginTop: 10 }}>
                  {selectedColor.toUpperCase()}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                <Button
                  data-testid="button-add-to-cart"
                  variant={canAddToCart ? 'primary' : 'secondary'}
                  label="AÑADIR"
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      <ProductSpecs specs={{ brand: phone?.brand, name: phone?.name, description: phone?.description, ...phone?.specs }} />

      {similar.length > 0 ? (
        <section className="similar-items" style={{ marginTop: '2.5rem' }}>
          <Typography variant="label" style={{ marginBottom: '1rem', display: 'block' }}>
            SIMILAR ITEMS
          </Typography>
          <div style={{ overflowX: 'auto', display: 'flex' }}>
            {similar.map((item) => (
              <PhoneCard key={item.id} phone={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
