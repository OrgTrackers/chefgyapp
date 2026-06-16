// ─────────────────────────────────────────────────────────────────────────────
// UserApp / viewmodels / useVendorListVM.js
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react';
//import { getAllVendors } from '../services/userFoodService';
import { getAllVendors } from './userFoodService';

/**
 * ViewModel for the Vendor List screen.
 * Provides vendors, loading state, and a refresh function.
 */
export function useVendorListVM() {
  const [vendors, setVendors]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);
  const [search,  setSearch]    = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllVendors();
      setVendors(data);
    } catch (e) {
      setError('Could not load vendors. Pull down to retry.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = search.trim()
    ? vendors.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        (v.cuisineType || '').toLowerCase().includes(search.toLowerCase())
      )
    : vendors;

  return { vendors: filtered, loading, error, search, setSearch, refresh: load };
}
