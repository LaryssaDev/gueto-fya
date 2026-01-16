import { Order, Product, Customer } from '../types.ts';
import { INITIAL_PRODUCTS } from '../constants.ts';

const KEYS = {
  PRODUCTS: 'guetofya_products',
  ORDERS: 'guetofya_orders',
  CUSTOMERS: 'guetofya_customers'
};

export const StorageService = {
  getProducts: (): Product[] => {
    const stored = localStorage.getItem(KEYS.PRODUCTS);
    if (!stored) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  saveProducts: (products: Product[]) => {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  getOrders: (): Order[] => {
    const stored = localStorage.getItem(KEYS.ORDERS);
    return stored ? JSON.parse(stored) : [];
  },

  saveOrders: (orders: Order[]) => {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },

  getCustomers: (): Customer[] => {
    const stored = localStorage.getItem(KEYS.CUSTOMERS);
    return stored ? JSON.parse(stored) : [];
  },

  saveCustomers: (customers: Customer[]) => {
    localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(customers));
  }
};