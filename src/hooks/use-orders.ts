
import { useState, useEffect, useMemo } from 'react';
import { Order, OrderFilters, OrderStats, OrderStatus } from '@/types/admin';
import { AdminStorage } from '@/utils/admin-storage';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    setLoading(true);
    const allOrders = AdminStorage.getAllOrders();
    setOrders(allOrders);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    const updatedOrder = AdminStorage.updateOrderStatus(orderId, newStatus, note);
    if (updatedOrder) {
      loadOrders();
      return updatedOrder;
    }
    return null;
  };

  const addComment = (orderId: string, text: string) => {
    const updatedOrder = AdminStorage.addOrderComment(orderId, text);
    if (updatedOrder) {
      loadOrders();
      return updatedOrder;
    }
    return null;
  };

  const updateTags = (orderId: string, tags: string[]) => {
    const updatedOrder = AdminStorage.updateOrderTags(orderId, tags);
    if (updatedOrder) {
      loadOrders();
      return updatedOrder;
    }
    return null;
  };

  const getFilteredOrders = (filters: OrderFilters): Order[] => {
    return orders.filter(order => {
      if (filters.status && order.status !== filters.status) return false;
      
      if (filters.dateFrom && order.createdAt < filters.dateFrom) return false;
      if (filters.dateTo && order.createdAt > filters.dateTo) return false;
      
      if (filters.customerName && 
          !order.customer.fullName.toLowerCase().includes(filters.customerName.toLowerCase()) &&
          !order.orderNumber.toLowerCase().includes(filters.customerName.toLowerCase())) {
        return false;
      }
      
      if (filters.minValue && order.total < filters.minValue) return false;
      if (filters.maxValue && order.total > filters.maxValue) return false;
      
      if (filters.tags && filters.tags.length > 0) {
        const hasTag = filters.tags.some(tag => order.tags.includes(tag));
        if (!hasTag) return false;
      }
      
      return true;
    });
  };

  const stats = useMemo<OrderStats>(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayOrders = orders.filter(o => o.createdAt >= today);
    const weekOrders = orders.filter(o => o.createdAt >= weekStart);
    const monthOrders = orders.filter(o => o.createdAt >= monthStart);

    return {
      totalToday: todayOrders.length,
      totalWeek: weekOrders.length,
      totalMonth: monthOrders.length,
      salesToday: todayOrders.reduce((sum, o) => sum + o.total, 0),
      salesWeek: weekOrders.reduce((sum, o) => sum + o.total, 0),
      salesMonth: monthOrders.reduce((sum, o) => sum + o.total, 0),
      pendingCount: orders.filter(o => o.status === 'PENDENTE').length,
      confirmedCount: orders.filter(o => o.status === 'CONFIRMADO').length,
      canceledCount: orders.filter(o => o.status === 'CANCELADO').length,
    };
  }, [orders]);

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  return {
    orders,
    loading,
    stats,
    loadOrders,
    updateOrderStatus,
    addComment,
    updateTags,
    getFilteredOrders,
    getOrderById
  };
}
