import React from 'react';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';

const DashboardPage: React.FC = () => {
  const { products } = useProducts();
  const { orders } = useOrders(true);

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending_payment' || o.status === 'paid').length;

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Pending Orders', value: pendingOrders, icon: Users, color: 'bg-yellow-500' },
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-blue-primary mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-dark-blue-primary mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-dark-blue-primary mb-4">Recent Activity</h2>
        <p className="text-gray-600">Admin dashboard overview. Use the sidebar to manage products and orders.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
