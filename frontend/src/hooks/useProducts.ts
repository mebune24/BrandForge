import { useState, useEffect, useCallback } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/products';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import type { Product, CreateProductInput } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { addNotification } = useApp();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    fetchProducts();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [fetchProducts]);

  const addProduct = async (data: CreateProductInput) => {
    if (!token) throw new Error('Not authenticated');
    try {
      const newProduct = await createProduct(data, token);
      setProducts(prev => [...prev, newProduct]);
      addNotification('Product created successfully', 'success');
      return newProduct;
    } catch (err) {
      addNotification(err instanceof Error ? err.message : 'Failed to create product', 'error');
      throw err;
    }
  };

  const editProduct = async (id: string, data: CreateProductInput) => {
    if (!token) throw new Error('Not authenticated');
    try {
      const updated = await updateProduct(id, data, token);
      setProducts(prev => prev.map(p => p._id === id ? updated : p));
      addNotification('Product updated successfully', 'success');
      return updated;
    } catch (err) {
      addNotification(err instanceof Error ? err.message : 'Failed to update product', 'error');
      throw err;
    }
  };

  const removeProduct = async (id: string) => {
    if (!token) throw new Error('Not authenticated');
    try {
      await deleteProduct(id, token);
      setProducts(prev => prev.filter(p => p._id !== id));
      addNotification('Product deactivated', 'success');
    } catch (err) {
      addNotification(err instanceof Error ? err.message : 'Failed to delete product', 'error');
      throw err;
    }
  };

  return { products, loading, error, fetchProducts, addProduct, editProduct, removeProduct };
}
