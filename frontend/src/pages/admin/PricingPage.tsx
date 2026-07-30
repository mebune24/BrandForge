import { useState, useMemo } from 'react';
import { Edit3, Save, TrendingUp, History } from 'lucide-react';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { SectionErrorBoundary } from '../../components/error-boundary/SectionErrorBoundary';
import { simulatedApi } from '../../services/simulatedApi';
import { useAdminNotifications } from '../../context/AdminNotificationContext';
import type { Product } from '../../types';

interface PriceHistoryEntry {
  productId: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
  changedAt: string;
  changedBy: string;
}

export default function PricingPage() {
  const { addNotification } = useAdminNotifications();
  const [products, setProducts] = useState<Product[]>(() => simulatedApi.products.getAll());
  const [loading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<PriceHistoryEntry[]>(() => {
    try {
      const raw = localStorage.getItem('brandforge_price_history');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  });
  const [showBulk, setShowBulk] = useState(false);
  const [bulkPercent, setBulkPercent] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [saved, setSaved] = useState(false);

  const sortedHistory = useMemo(() => [...history].sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime()), [history]);

  const startEdit = (product: Product) => {
    setEditingId(product._id);
    setEditPrice(prev => ({ ...prev, [product._id]: product.basePrice }));
  };

  const saveSingle = (productId: string) => {
    const newPrice = editPrice[productId];
    if (!newPrice || newPrice < 0) return;
    const product = products.find(p => p._id === productId);
    if (product) {
      const entry: PriceHistoryEntry = {
        productId: product._id,
        productName: product.name,
        oldPrice: product.basePrice,
        newPrice,
        changedAt: new Date().toISOString(),
        changedBy: 'Admin',
      };
      const updated = [...history, entry];
      localStorage.setItem('brandforge_price_history', JSON.stringify(updated));
      setHistory(updated);
      simulatedApi.products.update(productId, { basePrice: newPrice });
      setProducts(prev => prev.map(p => p._id === productId ? { ...p, basePrice: newPrice } : p));
      setEditingId(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      addNotification(`Price updated for "${product.name}": FCFA${product.basePrice.toLocaleString()} → FCFA${newPrice.toLocaleString()}`, 'product_update', `product:${productId}`);
    }
  };

  const applyBulk = () => {
    const pct = parseFloat(bulkPercent);
    if (isNaN(pct)) return;
    const updated = products.map(p => {
      const newPrice = Math.round(p.basePrice * (1 + pct / 100) * 100) / 100;
      return { ...p, basePrice: newPrice };
    });
    const entries: PriceHistoryEntry[] = updated.map(p => {
      const original = products.find(o => o._id === p._id)!;
      return {
        productId: p._id,
        productName: p.name,
        oldPrice: original.basePrice,
        newPrice: p.basePrice,
        changedAt: new Date().toISOString(),
        changedBy: 'Admin',
      };
    });
    const newHistory = [...history, ...entries];
    localStorage.setItem('brandforge_price_history', JSON.stringify(newHistory));
    setHistory(newHistory);
    updated.forEach(p => simulatedApi.products.update(p._id, { basePrice: p.basePrice }));
    setProducts(updated);
    setShowBulk(false);
    setBulkPercent('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    addNotification(`Bulk price adjustment applied: ${pct >= 0 ? '+' : ''}${pct}% across ${updated.length} products`, 'product_update');
  };

  const formatCurrency = (val: number) => `FCFA${val.toLocaleString()}`;

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>;

  return (
    <SectionErrorBoundary sectionName="Pricing">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-dark-blue-primary">Pricing Management</h1>
          <div className="flex gap-3">
            <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
              <History size={18} /> History
            </button>
            <button onClick={() => setShowBulk(!showBulk)} className="flex items-center gap-2 bg-blue-accent text-dark-blue-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">
              <TrendingUp size={18} /> Bulk Adjust
            </button>
          </div>
        </div>

        {showBulk && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-dark-blue-primary mb-4">Bulk Price Adjustment</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-green-600" />
                <input
                  type="number"
                  step="0.01"
                  value={bulkPercent}
                  onChange={e => setBulkPercent(e.target.value)}
                  placeholder="e.g. 10 or -5"
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-accent"
                />
                <span className="text-sm text-gray-600">%</span>
              </div>
              <button onClick={applyBulk} className="bg-dark-blue-primary text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition">Apply to All</button>
              <button onClick={() => { setShowBulk(false); setBulkPercent(''); }} className="text-gray-500 hover:text-gray-700">Cancel</button>
            </div>
            {bulkPercent && !isNaN(parseFloat(bulkPercent)) && (
              <p className="text-sm text-gray-500 mt-2">
                {parseFloat(bulkPercent) >= 0 ? '+' : ''}{bulkPercent}% adjustment will update all product prices.
              </p>
            )}
          </div>
        )}

        {showHistory && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-dark-blue-primary mb-4">Price Change History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Old Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Changed</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Change</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedHistory.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500 text-sm">No price changes yet.</td></tr>
                  ) : sortedHistory.map((entry, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-dark-blue-primary">{entry.productName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(entry.oldPrice)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(entry.newPrice)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{new Date(entry.changedAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`font-semibold ${entry.newPrice >= entry.oldPrice ? 'text-green-600' : 'text-red-600'}`}>
                          {entry.newPrice >= entry.oldPrice ? '+' : ''}{((entry.newPrice - entry.oldPrice) / entry.oldPrice * 100).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-dark-blue-primary">Product Prices</h3>
            {saved && <span className="text-sm text-green-600 font-semibold">Saved!</span>}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-dark-blue-primary">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {editingId === product._id ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editPrice[product._id] ?? product.basePrice}
                          onChange={e => setEditPrice(prev => ({ ...prev, [product._id]: parseFloat(e.target.value) || 0 }))}
                          className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-accent"
                        />
                      ) : (
                        <span className="font-semibold text-dark-blue-primary">{formatCurrency(product.basePrice)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      {editingId === product._id ? (
                        <button onClick={() => saveSingle(product._id)} className="text-green-600 hover:text-green-800 mr-3" title="Save">
                          <Save size={16} />
                        </button>
                      ) : (
                        <button onClick={() => startEdit(product)} className="text-blue-accent hover:text-blue-600" title="Edit Price">
                          <Edit3 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionErrorBoundary>
  );
}
