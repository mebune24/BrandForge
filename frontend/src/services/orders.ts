import { simulatedApi } from './simulatedApi';
import type { Order, CreateOrderInput } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createOrder(data: CreateOrderInput, _token: string): Promise<Order> {
  const user = simulatedApi.auth.getCurrentUser();
  const customerId = user?._id || 'guest';
  return simulatedApi.orders.create(data, customerId);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getMyOrders(_token: string): Promise<Order[]> {
  const user = simulatedApi.auth.getCurrentUser();
  if (!user) return [];
  return simulatedApi.orders.getMine(user._id);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getAllOrders(_token: string): Promise<Order[]> {
  return simulatedApi.orders.getAll();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getStaffOrders(_token: string): Promise<Order[]> {
  const user = simulatedApi.auth.getCurrentUser();
  if (!user) return [];
  return simulatedApi.orders.getStaffOrders(user._id);
}

export async function trackOrder(orderCode: string): Promise<Order> {
  const order = simulatedApi.orders.getByCode(orderCode);
  if (!order) throw new Error('Order not found');
  return order;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function updateOrderStatus(id: string, status: string, _token: string): Promise<Order> {
  const order = simulatedApi.orders.updateStatus(id, status);
  if (!order) throw new Error('Order not found');
  return order;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function assignStaffToOrder(orderId: string, staffId: string, staffName: string, _token: string): Promise<Order> {
  const order = simulatedApi.orders.assignStaff(orderId, staffId, staffName);
  if (!order) throw new Error('Order not found');
  return order;
}
