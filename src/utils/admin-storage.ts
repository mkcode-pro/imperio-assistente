
import { Order, OrderStatus, OrderComment, StatusChange } from '@/types/admin';

const ORDERS_KEY = 'imperio_pharma_orders';
const AUTH_KEY = 'imperio_pharma_admin_auth';

export class AdminStorage {
  static saveOrder(order: Order): void {
    const orders = this.getAllOrders();
    const existingIndex = orders.findIndex(o => o.id === order.id);
    
    if (existingIndex >= 0) {
      orders[existingIndex] = order;
    } else {
      orders.push(order);
    }
    
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  static getAllOrders(): Order[] {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      return stored ? JSON.parse(stored).map(this.deserializeOrder) : [];
    } catch {
      return [];
    }
  }

  static getOrderById(id: string): Order | null {
    const orders = this.getAllOrders();
    return orders.find(order => order.id === id) || null;
  }

  static updateOrderStatus(orderId: string, newStatus: OrderStatus, note?: string): Order | null {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) return null;
    
    const order = orders[orderIndex];
    const statusChange: StatusChange = {
      from: order.status,
      to: newStatus,
      timestamp: new Date(),
      note
    };
    
    order.status = newStatus;
    order.updatedAt = new Date();
    order.statusHistory.push(statusChange);
    
    this.saveOrder(order);
    return order;
  }

  static addOrderComment(orderId: string, text: string): Order | null {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) return null;
    
    const order = orders[orderIndex];
    const comment: OrderComment = {
      id: Date.now().toString(),
      text,
      timestamp: new Date()
    };
    
    order.comments.push(comment);
    order.updatedAt = new Date();
    
    this.saveOrder(order);
    return order;
  }

  static updateOrderTags(orderId: string, tags: string[]): Order | null {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) return null;
    
    const order = orders[orderIndex];
    order.tags = tags;
    order.updatedAt = new Date();
    
    this.saveOrder(order);
    return order;
  }

  static generateOrderNumber(): string {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const orders = this.getAllOrders();
    const todayOrders = orders.filter(o => 
      o.createdAt.toDateString() === now.toDateString()
    );
    const sequence = (todayOrders.length + 1).toString().padStart(3, '0');
    
    return `IP${year}${month}${day}-${sequence}`;
  }

  static setAuthSession(password: string): void {
    const session = {
      authenticated: true,
      timestamp: Date.now(),
      expires: Date.now() + (4 * 60 * 60 * 1000) // 4 horas
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  }

  static isAuthenticated(): boolean {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (!stored) return false;
      
      const session = JSON.parse(stored);
      return session.authenticated && Date.now() < session.expires;
    } catch {
      return false;
    }
  }

  static clearAuth(): void {
    localStorage.removeItem(AUTH_KEY);
  }

  private static deserializeOrder(order: any): Order {
    return {
      ...order,
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
      statusHistory: order.statusHistory.map((change: any) => ({
        ...change,
        timestamp: new Date(change.timestamp)
      })),
      comments: order.comments.map((comment: any) => ({
        ...comment,
        timestamp: new Date(comment.timestamp)
      }))
    };
  }
}
