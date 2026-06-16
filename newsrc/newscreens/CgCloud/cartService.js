// ─────────────────────────────────────────────────────────────────────────────
// UserApp / services / cartService.js
//
// Pure functions for managing the cart (no AsyncStorage so state lives in the
// ViewModel; persistence can be layered on by calling JSON.stringify + storage).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Adds or increments a serving in the cart.
 * For combos the caller must supply groupSelections before the item is "valid",
 * but we allow partial addition and validate at checkout.
 *
 * @param {import('../models').CartLine[]} cart
 * @param {import('../models').Serving}    serving
 * @param {string}                         vendorId
 * @returns {import('../models').CartLine[]}
 */
export function addToCart(cart, serving, vendorId) {
  const existing = cart.find(
    (l) => l.servingId === serving.servingId && l.vendorId === vendorId
  );
  if (existing) {
    return cart.map((l) =>
      l.servingId === serving.servingId && l.vendorId === vendorId
        ? { ...l, quantity: l.quantity + 1 }
        : l
    );
  }
  return [
    ...cart,
    {
      servingId:          serving.servingId,
      vendorId:           String(vendorId),
      serving,
      quantity:           1,
      groupSelections:    {},   // groupId → Dish[]
      optionalSelections: [],
    },
  ];
}

/**
 * Decrements quantity; removes the line if quantity reaches 0.
 */
export function removeFromCart(cart, servingId, vendorId) {
  return cart
    .map((l) =>
      l.servingId === servingId && l.vendorId === vendorId
        ? { ...l, quantity: l.quantity - 1 }
        : l
    )
    .filter((l) => l.quantity > 0);
}

/**
 * Updates the group selections for a combo line.
 * @param {import('../models').CartLine[]} cart
 * @param {string} servingId
 * @param {string} vendorId
 * @param {string} groupId
 * @param {import('../models').Dish[]} selectedDishes
 */
export function updateGroupSelection(cart, servingId, vendorId, groupId, selectedDishes) {
  return cart.map((l) =>
    l.servingId === servingId && l.vendorId === vendorId
      ? { ...l, groupSelections: { ...l.groupSelections, [groupId]: selectedDishes } }
      : l
  );
}

/**
 * Toggles an optional item for a combo line.
 */
export function toggleOptionalItem(cart, servingId, vendorId, dish) {
  return cart.map((l) => {
    if (l.servingId !== servingId || l.vendorId !== vendorId) return l;
    const exists = l.optionalSelections.some((d) => d.id === dish.id);
    return {
      ...l,
      optionalSelections: exists
        ? l.optionalSelections.filter((d) => d.id !== dish.id)
        : [...l.optionalSelections, dish],
    };
  });
}

/** Total item count shown on the cart badge. */
export function cartCount(cart) {
  return cart.reduce((sum, l) => sum + l.quantity, 0);
}

/** Monetary total. */
export function cartTotal(cart) {
  return cart.reduce((sum, l) => sum + l.serving.price * l.quantity, 0);
}

/**
 * Returns lines for a specific vendor (multi-vendor orders are grouped at checkout).
 */
export function cartLinesForVendor(cart, vendorId) {
  return cart.filter((l) => l.vendorId === String(vendorId));
}

/**
 * Validates that all combo group selections are complete.
 * Returns an array of validation messages (empty = valid).
 */
export function validateCart(cart) {
  const errors = [];
  cart.forEach((line) => {
    if (line.serving.type === 'item') return;
    const combo = line.serving.combo;
    if (!combo) return;
    combo.groups.forEach((group) => {
      const chosen = (line.groupSelections[group.groupId] ?? []).length;
      if (chosen < group.selectCount) {
        errors.push(
          `"${line.serving.name}" – ${group.groupName}: choose ${group.selectCount - chosen} more item(s).`
        );
      }
    });
  });
  return errors;
}
