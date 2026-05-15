 export const ADDRESS_LABELS = {
  HOME: 'Home',
  WORK: 'Work',
  OTHER: 'Other',
};

export const ADDRESS_FIELDS = {
  id: 'serial',
  user_id: 'integer',
  label: 'varchar(50)',
  address_line1: 'text',
  address_line2: 'text',
  city: 'varchar(100)',
  state: 'varchar(100)',
  country: 'varchar(100)',
  pincode: 'varchar(10)',
  latitude: 'float8',
  longitude: 'float8',
  is_primary: 'boolean',
  is_enabled: 'boolean',
  is_deleted: 'boolean',
  inserted_by: 'varchar(100)',
  inserted_date: 'timestamp',
  modified_date: 'timestamp',
  location: 'geography',
};

export const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with actual key






