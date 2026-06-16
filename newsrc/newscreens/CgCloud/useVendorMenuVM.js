// ─────────────────────────────────────────────────────────────────────────────
// UserApp / viewmodels / useVendorMenuVM.js
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback, useMemo } from 'react';
//import { getServingsByVendor } from '../services/userFoodService';
import { getServingsByVendor } from './userFoodService';
// import {
//   addToCart,
//   removeFromCart,
//   updateGroupSelection,
//   toggleOptionalItem,
//   cartCount,
//   cartTotal,
//   validateCart,
// } from '../services/cartService';

import {  addToCart,
  removeFromCart,
  updateGroupSelection,
  toggleOptionalItem,
  cartCount,
  cartTotal,
  validateCart, } from './cartService';

/**
 * ViewModel for the Vendor Menu screen.
 * Owns cart state for the full session (passed down as prop or via Context).
 *
 * @param {import('../models').Vendor} vendor
 * @param {import('../models').CartLine[]} cart
 * @param {Function} setCart   – lifts cart state up to parent/context
 */
export function useVendorMenuVM(vendor, cart = [], setCart = () => {}) {
  const [servings,  setServings]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [filter,    setFilter]    = useState('all'); // 'all' | 'item' | 'combo'

  // Which combo's detail sheet is open (servingId | null)
  const [activeCombo, setActiveCombo] = useState(null);

  const load = useCallback(async () => {
    if (!vendor) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getServingsByVendor(vendor.vendorId, vendor.serviceId);
      setServings(data);
    } catch (e) {
      setError('Could not load menu. Pull down to retry.');
    } finally {
      setLoading(false);
    }
  }, [vendor]);

  useEffect(() => { load(); }, [load]);

  // ── Derived ───────────────────────────────────────────────────────────────

  const displayed = useMemo(() => {
    if (filter === 'all')   return servings;
    if (filter === 'item')  return servings.filter((s) => s.type === 'item');
    if (filter === 'combo') return servings.filter((s) => s.type === 'combo' || s.type === 'mixed');
    return servings;
  }, [servings, filter]);

  const vendorCart    = (cart || []).filter((l) => l.vendorId === String(vendor?.vendorId));
  const totalCount    = cartCount(vendorCart);
  const totalPrice    = cartTotal(vendorCart);

  function quantityFor(servingId) {
    return vendorCart.find((l) => l.servingId === servingId)?.quantity ?? 0;
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  function onAdd(serving) {
    setCart((prev) => addToCart(prev, serving, vendor.vendorId));
  }

  function onRemove(servingId) {
    setCart((prev) => removeFromCart(prev, servingId, String(vendor.vendorId)));
  }

  function onGroupSelect(servingId, groupId, dishes) {
    setCart((prev) =>
      updateGroupSelection(prev, servingId, String(vendor.vendorId), groupId, dishes)
    );
  }

  function onToggleOptional(servingId, dish) {
    setCart((prev) =>
      toggleOptionalItem(prev, servingId, String(vendor.vendorId), dish)
    );
  }

  function groupSelectionsFor(servingId) {
    return vendorCart.find((l) => l.servingId === servingId)?.groupSelections ?? {};
  }

  function optionalSelectionsFor(servingId) {
    return vendorCart.find((l) => l.servingId === servingId)?.optionalSelections ?? [];
  }

  const cartErrors = validateCart(vendorCart);

  return {
    // data
    servings: displayed,
    loading,
    error,
    filter,
    setFilter,
    // cart summary
    totalCount,
    totalPrice,
    cartErrors,
    // per-serving helpers
    quantityFor,
    groupSelectionsFor,
    optionalSelectionsFor,
    // actions
    onAdd,
    onRemove,
    onGroupSelect,
    onToggleOptional,
    refresh: load,
    // combo detail sheet
    activeCombo,
    setActiveCombo,
  };
}
