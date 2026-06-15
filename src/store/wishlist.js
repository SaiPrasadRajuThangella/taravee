import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'taravee_wishlist';

// Simple pub/sub so all mounted screens stay in sync
const listeners = new Set();
let cache = [];
let loaded = false;

async function persist(next) {
  cache = next;
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((fn) => fn(next));
}

export async function loadWishlist() {
  if (loaded) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = raw ? JSON.parse(raw) : [];
  } catch {
    cache = [];
  }
  loaded = true;
  return cache;
}

export async function toggleWishlist(id) {
  await loadWishlist();
  const next = cache.includes(id) ? cache.filter((x) => x !== id) : [...cache, id];
  await persist(next);
  return next;
}

// React hook
export function useWishlist() {
  const [ids, setIds] = useState(cache);

  useEffect(() => {
    let mounted = true;
    loadWishlist().then((list) => mounted && setIds([...list]));
    const fn = (next) => setIds([...next]);
    listeners.add(fn);
    return () => {
      mounted = false;
      listeners.delete(fn);
    };
  }, []);

  const toggle = useCallback((id) => toggleWishlist(id), []);
  const has = useCallback((id) => ids.includes(id), [ids]);

  return { ids, toggle, has };
}
