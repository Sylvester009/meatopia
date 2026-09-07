export interface Order {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  deliveryMethod: string;
  deliveryLocation: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  name: string;
  weight: string;
  quantity: number;
  unitPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateOrderInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  deliveryMethod: string;
  deliveryLocation: string;
  totalAmount: number;
  status?: string;
  items: {
    name: string;
    weight: string;
    quantity: number;
    unitPrice: number;
  }[];
}