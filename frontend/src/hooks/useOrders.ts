import { useState, useEffect, useCallback } from 'react';
import { getMyOrders, getAllOrders, createOrder, trackOrder, updateOrderStatus, getStaffOrders } from '../services/orders';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import type { Order, CreateOrderInput } from '../types';

export function useOrders(isAdmin = false) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated } = useAuth();
  const { addNotification } = useApp();

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = isAdmin ? await getAllOrders(token) : await getMyOrders(token);
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [token, isAdmin]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (isAuthenticated) {
      fetchOrders();
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [isAuthenticated, fetchOrders]);

  const placeOrder = async (data: CreateOrderInput) => {
    if (!token) throw new Error('Not authenticated');
    try {
      const newOrder = await createOrder(data, token);
      setOrders(prev => [newOrder, ...prev]);
      addNotification('Order placed successfully!', 'success');
      return newOrder;
    } catch (err) {
      addNotification(err instanceof Error ? err.message : 'Failed to place order', 'error');
      throw err;
    }
  };

  const changeOrderStatus = async (id: string, status: string) => {
    if (!token) throw new Error('Not authenticated');
    try {
      const updated = await updateOrderStatus(id, status, token);
      setOrders(prev => prev.map(o => o._id === id ? updated : o));
      addNotification(`Order status updated to ${status}`, 'success');
      return updated;
    } catch (err) {
      addNotification(err instanceof Error ? err.message : 'Failed to update order status', 'error');
      throw err;
    }
  };

  return { orders, loading, error, fetchOrders, placeOrder, changeOrderStatus };
}

export function useStaffOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated, user } = useAuth();
  const { addNotification } = useApp();

  const fetchOrders = useCallback(async () => {
    if (!token || !user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getStaffOrders(token);
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch staff orders');
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (isAuthenticated && user?.role === 'staff') {
      fetchOrders();
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [isAuthenticated, user, fetchOrders]);

  const changeOrderStatus = async (id: string, status: string) => {
    if (!token) throw new Error('Not authenticated');
    try {
      const updated = await updateOrderStatus(id, status, token);
      setOrders(prev => prev.map(o => o._id === id ? updated : o));
      addNotification(`Order ${updated.orderCode} status updated to ${status}`, 'success');
      return updated;
    } catch (err) {
      addNotification(err instanceof Error ? err.message : 'Failed to update order status', 'error');
      throw err;
    }
  };

  return { orders, loading, error, fetchOrders, changeOrderStatus };
}

export function useOrderTracking(orderCode: string | null) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useApp();

  useEffect(() => {
    if (!orderCode) return;
    let cancelled = false;
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await trackOrder(orderCode);
        if (!cancelled) setOrder(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Order not found');
          addNotification('Order not found. Please check the code.', 'error');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchOrder();
    return () => { cancelled = true; };
  }, [orderCode, addNotification]);

  return { order, loading, error };
}
