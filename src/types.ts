export type ProductCategory = 
  | 'Crochet Bags'
  | 'Accessories'
  | 'Home & Decor'
  | 'Custom Creations'
  | 'New Arrivals';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: ProductCategory;
  images: string[];
  description: string;
  shortDescription: string;
  colors: ProductColor[];
  dimensions?: string;
  materials: string;
  careInstructions: string;
  handmadeNotes: string;
  estimatedDelivery: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'upi' | 'card' | 'cod';
  orderDate: string;
}

export interface CustomRequest {
  name: string;
  email: string;
  phone: string;
  productType: string;
  preferredColors: string;
  description: string;
  budget?: string;
}
