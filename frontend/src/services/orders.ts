import { apiPost, apiGet, apiPut } from './api';
import type { Order, CreateOrderInput } from '../types';

export async function createOrder(data: CreateOrderInput, token: string): Promise<Order> {
  return apiPost<Order>('/orders', data, token);
}

export async function getMyOrders(token: string): Promise<Order[]> {
  return apiGet<Order[]>('/orders/mine', token);
}

export async function getAllOrders(token: string): Promise<Order[]> {
  return apiGet<Order[]>('/orders', token);
}

export async function trackOrder(orderCode: string): Promise<Order> {
  return apiGet<Order>(`/orders/track/${orderCode}`);
}

export async function updateOrderStatus(id: string, status: string, token: string): Promise<Order> {
  return apiPut<Order>(`/orders/${id}/status`, { status }, token);
}
