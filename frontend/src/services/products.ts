import { apiGet, apiPost, apiPut, apiDelete } from './api';
import type { Product, CreateProductInput } from '../types';

export async function getProducts(): Promise<Product[]> {
  return apiGet<Product[]>('/products');
}

export async function getProductById(id: string): Promise<Product> {
  return apiGet<Product>(`/products/${id}`);
}

export async function createProduct(data: CreateProductInput, token: string): Promise<Product> {
  return apiPost<Product>('/products', data, token);
}

export async function updateProduct(id: string, data: CreateProductInput, token: string): Promise<Product> {
  return apiPut<Product>(`/products/${id}`, data, token);
}

export async function deleteProduct(id: string, token: string): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/products/${id}`, token);
}
