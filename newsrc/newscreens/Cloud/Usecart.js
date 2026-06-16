// ─── Usecart.js ───────────────────────────────────────────────────────────────
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const CartContext = createContext({
  cart: {},
  cartItems: [],
  itemCount: 0,
  cartTotal: 0,
  addItem: () => {},
  changeQty: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getQty: () => 0,
});

export function CartProvider({ children }) {
  // Use ref to avoid stale closures in callbacks
  const cartRef = useRef({});
  const [cartVersion, setCartVersion] = useState(0); // Force re-renders

  // Derive cart items array from the ref (always fresh)
  const cart = cartRef.current;
  const cartItems = Object.values(cart).filter(item => item && item.qty > 0);
  const itemCount = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  const cartTotal = cartItems.reduce((sum, item) => {
    // Handle custom doughnut box pricing
    if (item.isCustomBox && item.finalPrice) {
      return sum + item.finalPrice;
    }
    const addonsTotal = (item.selectedAddons || []).reduce((a, add) => a + (add.p || 0), 0);
    return sum + ((item.price || 0) + addonsTotal) * (item.qty || 0);
  }, 0);

  const triggerUpdate = useCallback(() => {
    setCartVersion(v => v + 1);
  }, []);

  const addItem = useCallback((item, addons = [], qty = 1) => {
    if (!item || !item.id) {
      console.warn('addItem: invalid item', item);
      return;
    }

    const current = cartRef.current;
    const existing = current[item.id];
    const delta = Math.max(1, qty);

    if (existing) {
      // For custom boxes, replace; for normal items, increment
      if (item.isCustomBox) {
        cartRef.current = {
          ...current,
          [item.id]: { ...item, qty: delta },
        };
      } else {
        cartRef.current = {
          ...current,
          [item.id]: {
            ...existing,
            qty: (existing.qty || 0) + delta,
            selectedAddons: addons.length > 0 ? addons : (existing.selectedAddons || []),
          },
        };
      }
    } else {
      cartRef.current = {
        ...current,
        [item.id]: {
          ...item,
          qty: delta,
          selectedAddons: addons || [],
        },
      };
    }

    triggerUpdate();
    console.log('Added to cart:', item.name, 'qty:', delta);
  }, [triggerUpdate]);

  const updateItem = useCallback((item, addons = [], qty = 1) => {
    if (!item || !item.id) {
      console.warn('updateItem: invalid item', item);
      return;
    }

    const current = cartRef.current;
    const normalizedQty = Math.max(0, qty);

    if (normalizedQty === 0) {
      const { [item.id]: _, ...rest } = current;
      cartRef.current = rest || {};
    } else {
      cartRef.current = {
        ...current,
        [item.id]: {
          ...item,
          qty: normalizedQty,
          selectedAddons: addons || [],
        },
      };
    }

    triggerUpdate();
  }, [triggerUpdate]);

  const changeQty = useCallback((itemId, delta) => {
    if (!itemId) return;

    const current = cartRef.current;
    const item = current[itemId];
    if (!item) return;

    const newQty = Math.max(0, (item.qty || 0) + delta);

    if (newQty === 0) {
      const { [itemId]: _, ...rest } = current;
      cartRef.current = rest || {};
    } else {
      cartRef.current = {
        ...current,
        [itemId]: {
          ...item,
          qty: newQty,
        },
      };
    }

    triggerUpdate();
  }, [triggerUpdate]);

  const removeItem = useCallback((itemId) => {
    if (!itemId) return;
    const { [itemId]: _, ...rest } = cartRef.current;
    cartRef.current = rest || {};
    triggerUpdate();
  }, [triggerUpdate]);

  const clearCart = useCallback(() => {
    cartRef.current = {};
    triggerUpdate();
  }, [triggerUpdate]);

  const getQty = useCallback((itemId) => {
    return cartRef.current[itemId]?.qty || 0;
  }, []);

  return (
    <CartContext.Provider value={{
      cart: cartRef.current,
      cartItems,
      itemCount,
      cartTotal,
      addItem,
      changeQty,
      removeItem,
      clearCart,
      getQty,
      updateItem,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    console.error('useCart must be used inside CartProvider!');
    return {
      cart: {},
      cartItems: [],
      itemCount: 0,
      cartTotal: 0,
      addItem: () => {},
      changeQty: () => {},
      removeItem: () => {},
      clearCart: () => {},
      getQty: () => 0,
    };
  }

  return context;
}