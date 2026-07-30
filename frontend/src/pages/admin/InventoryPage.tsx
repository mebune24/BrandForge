import { useState, useEffect } from 'react';
import { simulatedApi } from '../../utils/simulatedApi';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import type { InventoryItem } from '../../types';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(simulatedApi.inventory.getAll());
    setLoading(false);
  }, []);

  const handleRestock = (id: string) => {
    const newQty = prompt('Enter new quantity:');
    if (newQty && !isNaN(Number(newQty))) {
      simulatedApi.inventory.update(id, parseInt(newQty));
      setItems(simulatedApi.inventory.getAll());
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-dark-blue-primary mb-6">Inventory Management</h1>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map(item => (
              <tr key={item._id}>
                <td className="px-6 py-4 font-medium text-dark-blue-primary">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.quantity} {item.unit}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.minStock} {item.unit}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.quantity <= item.minStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {item.quantity <= item.minStock ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleRestock(item._id)} className="bg-blue-accent text-dark-blue-primary px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-400 transition">Restock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
