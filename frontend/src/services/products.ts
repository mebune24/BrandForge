import { simulatedApi } from './simulatedApi';
import type { Product, CreateProductInput } from '../types';

export async function getProducts(): Promise<Product[]> {
  return simulatedApi.products.getAll();
}

export async function getProductById(id: string): Promise<Product> {
  const product = simulatedApi.products.getById(id);
  if (!product) throw new Error('Product not found');
  return product;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createProduct(data: CreateProductInput, _token: string): Promise<Product> {
  return simulatedApi.products.create(data);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function updateProduct(id: string, data: CreateProductInput, _token: string): Promise<Product> {
  const product = simulatedApi.products.update(id, data);
  if (!product) throw new Error('Product not found');
  return product;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteProduct(id: string, _token: string): Promise<{ message: string }> {
  const deleted = simulatedApi.products.delete(id);
  if (!deleted) throw new Error('Product not found');
  return { message: 'Product deleted successfully' };
}
