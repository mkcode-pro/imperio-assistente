
export interface OrderItem {
  productId: string;
  productName: string;
  productBrand: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productImage: string;
}

export interface ShippingInfo {
  name: string;
  price: number;
}

export interface CustomerData {
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export interface StatusChange {
  from: OrderStatus;
  to: OrderStatus;
  timestamp: Date;
  note?: string;
}

export type OrderStatus = 'PENDENTE' | 'CONFIRMADO' | 'CANCELADO';

export interface OrderComment {
  id: string;
  text: string;
  timestamp: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  customer: CustomerData;
  items: OrderItem[];
  shipping: ShippingInfo | null;
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  statusHistory: StatusChange[];
  comments: OrderComment[];
  tags: string[];
  paymentProofName?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  dateFrom?: Date;
  dateTo?: Date;
  customerName?: string;
  minValue?: number;
  maxValue?: number;
  tags?: string[];
}

export interface OrderStats {
  totalToday: number;
  totalWeek: number;
  totalMonth: number;
  salesToday: number;
  salesWeek: number;
  salesMonth: number;
  pendingCount: number;
  confirmedCount: number;
  canceledCount: number;
}
