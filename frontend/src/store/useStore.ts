import { create } from 'zustand';
import { CartItem, Product, Order, Category } from '../types';
import axiosInstance from '../api/axiosConfig';

interface Store {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  categories: Category[];
  isAuthenticated: boolean;
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void; // Añadir esto
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  setAuthenticated: (status: boolean) => void;
  fetchCategories: () => void;
  fetchProducts: () => void;
  fetchOrders: () => void;
}

export const useStore = create<Store>((set) => ({
  products: [],
  cart: [],
  orders: [],
  categories: [],
  isAuthenticated: false,
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }), // Añadir esto
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  addOrder: (order) =>
    set((state) => ({ orders: [order, ...state.orders] })),
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  fetchCategories: async () => {
    try {
      const response = await axiosInstance.get('/categories');
      set({ categories: response.data });
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  },
  fetchProducts: async () => {
    try {
      const response = await axiosInstance.get('/productos');
      set({ products: response.data });
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  },
  fetchOrders: async () => {
    try {
      const response = await axiosInstance.get('/orders');
      set({ orders: response.data });
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  }
}));