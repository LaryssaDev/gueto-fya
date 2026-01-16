import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Customer, OrderStatus, ViewState } from '../types.ts';
import { StorageService } from '../services/storageService.ts';

interface StoreContextType {
  // Navigation
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  selectedProductId: string | null;
  viewProduct: (id: string) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;

  // Data
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cartId: string) => void;
  updateCartItemSize: (cartId: string, size: string) => void;
  clearCart: () => void;
  
  orders: Order[];
  createOrder: (customer: Customer) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  customers: Customer[];

  // Computed
  cartTotalQuantity: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load initial data
  useEffect(() => {
    setProducts(StorageService.getProducts());
    setOrders(StorageService.getOrders());
    setCustomers(StorageService.getCustomers());
    
    const adminSession = sessionStorage.getItem('guetofya_admin');
    if (adminSession === 'true') setIsAdminLoggedIn(true);
  }, []);

  const viewProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('PRODUCT_DETAILS');
  };

  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('guetofya_admin', 'true');
    setCurrentView('ADMIN');
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('guetofya_admin');
    setCurrentView('HOME');
  };

  // Product Actions
  const addProduct = (product: Product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    StorageService.saveProducts(newProducts);
  };
  
  const updateProduct = (updatedProduct: Product) => {
    const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(newProducts);
    StorageService.saveProducts(newProducts);
  };

  const deleteProduct = (id: string) => {
    const newProducts = products.filter(p => p.id !== id);
    setProducts(newProducts);
    StorageService.saveProducts(newProducts);
  };

  // Cart Actions
  const addToCart = (product: Product) => {
    const newItem: CartItem = {
      ...product,
      cartId: Math.random().toString(36).substr(2, 9),
      quantity: 1,
      selectedSize: '' // User must select this in cart
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const updateCartItemSize = (cartId: string, size: string) => {
    setCart(cart.map(item => item.cartId === cartId ? { ...item, selectedSize: size } : item));
  };

  const clearCart = () => setCart([]);

  // Computed Cart Values
  const cartTotalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  let discountRate = 0;
  if (cartTotalQuantity >= 4) discountRate = 0.15;
  else if (cartTotalQuantity === 3) discountRate = 0.10;
  else if (cartTotalQuantity === 2) discountRate = 0.05;

  const cartDiscount = cartSubtotal * discountRate;
  const cartTotal = cartSubtotal - cartDiscount;

  // Order Actions
  const createOrder = (customerData: Omit<Customer, 'id' | 'orders'>) => {
    // Check if customer exists or create new
    let customer = customers.find(c => c.email === customerData.email);
    
    if (!customer) {
      customer = {
        ...customerData,
        id: Math.random().toString(36).substr(2, 9),
        orders: []
      };
      const newCustomers = [...customers, customer];
      setCustomers(newCustomers);
      StorageService.saveCustomers(newCustomers);
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customer: customer,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      total: cartTotal,
      status: OrderStatus.PENDING, // Always pending initially
      createdAt: new Date().toISOString()
    };

    const newOrders = [newOrder, ...orders];
    setOrders(newOrders);
    StorageService.saveOrders(newOrders);

    // Update customer history
    const updatedCustomers = customers.map(c => 
      c.id === customer!.id 
      ? { ...c, orders: [...c.orders, newOrder.id] } 
      : c
    );
    setCustomers(updatedCustomers);
    StorageService.saveCustomers(updatedCustomers);

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const newOrders = orders.map(o => o.id === orderId ? { ...o, status } : o);
    setOrders(newOrders);
    StorageService.saveOrders(newOrders);
  };

  return (
    <StoreContext.Provider value={{
      currentView,
      setCurrentView,
      selectedProductId,
      viewProduct,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      cart,
      addToCart,
      removeFromCart,
      updateCartItemSize,
      clearCart,
      orders,
      createOrder,
      updateOrderStatus,
      customers,
      cartTotalQuantity,
      cartSubtotal,
      cartDiscount,
      cartTotal
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};