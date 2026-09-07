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

export interface OrderItemWithOrder extends OrderItem {
  order?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}