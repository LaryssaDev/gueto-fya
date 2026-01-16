export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export type ProductCategory = 'Camisetas' | 'Bermudas' | 'Calças' | 'Bonés' | 'Toucas' | 'Moletons' | 'Cuecas' | 'Bags';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[]; // ['P', 'M', 'G', 'GG']
  category: ProductCategory;
  stock: number;
}

export interface CartItem extends Product {
  cartId: string; // unique id for cart instance
  quantity: number;
  selectedSize: string; // Mandatory selection in cart
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  orders: string[]; // Order IDs
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string; // ISO Date string
}

export type ViewState = 
  | 'HOME' 
  | 'PRODUCT_DETAILS' 
  | 'CART' 
  | 'CHECKOUT' 
  | 'ADMIN'
  | 'ADMIN_LOGIN';

export interface AdminStats {
  dailyRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  pendingOrders: number;
}