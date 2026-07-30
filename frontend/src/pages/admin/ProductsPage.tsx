import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import type { CreateProductInput, Product } from '../../types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const AdminProductsPage: React.FC = () => {
  const { products, loading, addProduct, editProduct, removeProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<CreateProductInput>({
    name: '',
    category: 'apparel',
    basePrice: 0,
    description: '',
    availableColors: [],
    availableSizes: [],
    printingOptions: [],
    imageUrl: '',
  });

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        basePrice: product.basePrice,
        description: product.description || '',
        availableColors: product.availableColors,
        availableSizes: product.availableSizes,
        printingOptions: product.printingOptions,
        imageUrl: product.imageUrl || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'apparel',
        basePrice: 0,
        description: '',
        availableColors: [],
        availableSizes: [],
        printingOptions: [],
        imageUrl: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await editProduct(editingProduct._id, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
    } catch {
      // Error handled in hook
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to deactivate this product?')) {
      await removeProduct(id);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark-blue-primary">Products</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-400 transition"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-blue-primary">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">FCFA{product.basePrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button onClick={() => openModal(product)} className="text-blue-accent hover:text-blue-600 mr-3">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-dark-blue-primary mb-6">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-dark-blue-primary mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-blue-primary mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CreateProductInput['category'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-accent"
                >
                  <option value="apparel">Apparel</option>
                  <option value="merchandise">Merchandise</option>
                  <option value="uniform">Uniform</option>
                  <option value="safety_wear">Safety Wear</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-blue-primary mb-1">Base Price (FCFA)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-blue-primary mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-accent"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-blue-primary mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-accent"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-dark-blue-primary text-white py-2 rounded-lg hover:bg-dark-blue-secondary transition">
                  {editingProduct ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
