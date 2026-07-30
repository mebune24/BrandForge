import { simulatedApi } from './simulatedApi';
import type { CreateProductInput, CreateOrderInput } from '../types';

export async function apiGet<T>(endpoint: string): Promise<T> {
  if (endpoint === '/products') return simulatedApi.products.getAll() as T;
  if (endpoint.startsWith('/products/')) return simulatedApi.products.getById(endpoint.replace('/products/', '')) as T;
  if (endpoint === '/orders') return simulatedApi.orders.getAll() as T;
  if (endpoint === '/orders/mine') {
    const user = simulatedApi.auth.getCurrentUser();
    return simulatedApi.orders.getMine(user?._id || 'guest') as T;
  }
  if (endpoint.startsWith('/orders/track/')) return simulatedApi.orders.getByCode(endpoint.replace('/orders/track/', '')) as T;
  if (endpoint === '/auth/me') {
    const user = simulatedApi.auth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    return user as T;
  }
  throw new Error(`Unknown GET endpoint: ${endpoint}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function apiPost<T>(endpoint: string, data: unknown, _token?: string): Promise<T> {
  if (endpoint === '/auth/register') return simulatedApi.auth.register(data as { name: string; email: string; password: string; phone?: string }) as T;
  if (endpoint === '/auth/login') return simulatedApi.auth.login(data as { email: string; password: string }) as T;
  if (endpoint === '/products') return simulatedApi.products.create(data as CreateProductInput) as T;
  if (endpoint === '/orders') {
    const user = simulatedApi.auth.getCurrentUser();
    return simulatedApi.orders.create(data as CreateOrderInput, user?._id || 'guest') as T;
  }
  throw new Error(`Unknown POST endpoint: ${endpoint}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function apiPut<T>(endpoint: string, data: unknown, _token?: string): Promise<T> {
  if (endpoint.startsWith('/products/')) return simulatedApi.products.update(endpoint.replace('/products/', ''), data as Partial<CreateProductInput>) as T;
  if (endpoint.startsWith('/orders/') && endpoint.endsWith('/status')) {
    const id = endpoint.replace('/orders/', '').replace('/status', '');
    return simulatedApi.orders.updateStatus(id, (data as { status: string }).status) as T;
  }
  throw new Error(`Unknown PUT endpoint: ${endpoint}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function apiDelete<T>(endpoint: string, _token?: string): Promise<T> {
  if (endpoint.startsWith('/products/')) {
    const deleted = simulatedApi.products.delete(endpoint.replace('/products/', ''));
    if (!deleted) throw new Error('Product not found');
    return { message: 'Deleted' } as T;
  }
  throw new Error(`Unknown DELETE endpoint: ${endpoint}`);
}

export const API_BASE_URL = 'http://localhost:5000/api';
