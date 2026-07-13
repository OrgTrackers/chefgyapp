/**
 * Maps UI address form data to database schema fields
 * Handles all the behind-the-scenes field mapping
 */
export const mapUIToDatabase = (uiData, userId, existingId = null) => {
  return {
    id: existingId || null,
    user_id: userId,
    label: uiData.label || ADDRESS_LABELS.HOME,
    address_line1: uiData.flatNumber || '',
    address_line2: [
      uiData.buildingBlock,
      uiData.landmark,
      uiData.areaName
    ].filter(Boolean).join(', '),
    city: uiData.city || '',
    state: uiData.state || '',
    country: uiData.country || 'India',
    pincode: uiData.pincode || '',
    latitude: uiData.latitude || '',
    longitude: uiData.longitude || '',
  };
};

/**
 * Maps database fields back to UI format for editing
 */
export const mapDatabaseToUI = (dbData) => {
  const parts = (dbData.address_line2 || '').split(', ');

  return {
    id: dbData.id,
    label: dbData.label,
    flatNumber: dbData.address_line1 || '',
    buildingBlock: parts[0] || '',
    landmark: parts[1] || '',
    areaName: parts[2] || '',
    city: dbData.city || '',
    state: dbData.state || '',
    country: dbData.country || '',
    pincode: dbData.pincode || '',
    latitude: dbData.latitude?.toString() || '',
    longitude: dbData.longitude?.toString() || '',
    isPrimary: dbData.is_primary || false,
    receiverName: dbData.receiver_name || '',
    receiverPhone: dbData.receiver_phone || '',
  };
};

/**
 * Formats address for display from DB fields
 */
export const formatAddressDisplay = (dbData) => {
  const parts = [
    dbData.address_line1,
    dbData.address_line2,
    dbData.city,
    dbData.state,
    dbData.pincode
  ].filter(Boolean);

  return parts.join(', ');
};