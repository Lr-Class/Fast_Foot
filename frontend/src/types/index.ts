export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category_id: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  customerInfo: CustomerInfo;
}
