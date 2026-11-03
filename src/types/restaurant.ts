export type SpiceLevel = 'Mild' | 'Spicy' | 'Fiery Lava';

export type Category = 
  | 'All'
  | 'Pizzas'
  | 'Loaded Fries'
  | 'Burgers'
  | 'Rolls & Shawarma'
  | 'Sandwiches'
  | 'BBQ & Platters'
  | 'Beverages & Dips';

export interface AddonOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  urduSubtitle?: string;
  category: Category;
  price: number; // in PKR
  description: string;
  image: string;
  isSignature?: boolean;
  isPopular?: boolean;
  spiceLevel?: SpiceLevel;
  portions?: string;
  prepTime?: string;
  addons?: AddonOption[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedSpice: SpiceLevel;
  selectedAddons: AddonOption[];
  specialInstructions?: string;
  itemTotal: number;
}

export type OrderType = 'delivery' | 'takeaway';

export interface OrderDetails {
  orderType: OrderType;
  customerName: string;
  phone: string;
  area: string;
  address: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
}

export interface Testimonial {
  id: string;
  name: string;
  roleOrArea: string;
  review: string;
  favouriteItem: string;
  rating: number;
  date: string;
}

export interface RestaurantLocationInfo {
  name: string;
  address: string;
  area: string;
  city: string;
  landmark: string;
  timings: {
    weekdays: string;
    weekends: string;
  };
  phone: string;
  whatsapp: string;
  googleMapsUrl: string;
  deliveryAreas: string[];
}
