import React, { useState } from 'react';
import { useOrderTracking } from '../hooks/useOrders';

const OrderTrackingPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [searched, setSearched] = useState(false);
  const { order, loading, error } = useOrderTracking(searched ? code : null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending_payment: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-blue-100 text-blue-800',
      in_design: 'bg-purple-100 text-purple-800',
      in_production: 'bg-orange-100 text-orange-800',
      quality_check: 'bg-teal-100 text-teal-800',
      packaging: 'bg-indigo-100 text-indigo-800',
      out_for_delivery: 'bg-cyan-100 text-cyan-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Track Order</span>
          <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Track Your Order</h2>
          <p className="text-gray-600 mt-4">
            Enter your order code to check the current status of your order.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent font-mono"
              placeholder="e.g. BF-7F3A9C21"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-dark-blue-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-dark-blue-secondary transition shadow-md disabled:opacity-50"
            >
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </div>
        </form>

        {error && !loading && (
          <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {order && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-gray-500">Order Code</p>
                <p className="text-2xl font-bold text-dark-blue-primary font-mono">{order.orderCode}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusColor(order.status)}`}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-dark-blue-primary mb-4">Order Details</h3>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold text-dark-blue-primary">Product #{item.product.toString().slice(-6)}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      {item.printingOption && (
                        <p className="text-xs text-gray-500 capitalize">Printing: {item.printingOption.replace(/_/g, ' ')}</p>
                      )}
                    </div>
                    <p className="font-bold text-dark-blue-primary">FCFA{(item.unitPrice * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Total Amount</span>
                <span className="text-2xl font-bold text-dark-blue-primary">FCFA{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
