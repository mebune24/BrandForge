import React from 'react';
import { useOrders } from '../hooks/useOrders';
import { useAuthStatus } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const OrdersPage: React.FC = () => {
  const { isAuthenticated } = useAuthStatus();
  const { orders, loading, error } = useOrders(false);

  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-dark-blue-primary mb-4">My Orders</h2>
          <p className="text-gray-600 mb-8">Please sign in to view your orders.</p>
          <Link to="/login" className="bg-blue-accent text-dark-blue-primary px-8 py-3 rounded-md font-semibold hover:bg-blue-400 transition">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-dark-blue-primary mb-8">My Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 rounded-xl h-24 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

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
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-dark-blue-primary mb-8">My Orders</h2>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet.</p>
            <Link to="/products" className="bg-blue-accent text-dark-blue-primary px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order._id} to={`/order/${order.orderCode}`} className="block bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Code</p>
                    <p className="text-xl font-bold text-dark-blue-primary font-mono">{order.orderCode}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-2">{order.items.length} item(s)</p>
                  <p className="text-2xl font-bold text-dark-blue-primary">FCFA{order.totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
