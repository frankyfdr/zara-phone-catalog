// src/hooks/useCart.js
import { useCartContext } from './useCartContext';

export default function useCart() {
  const { items, addItem, removeItem } = useCartContext();

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  return {
    items,
    total,
    addItem,
    removeItem,
  };
}
