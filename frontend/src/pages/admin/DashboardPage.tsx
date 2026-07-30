import React from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';
import { useAdminNotifications } from '../../context/AdminNotificationContext';
import { simulatedApi } from '../../utils/simulatedApi';

const DashboardPage: React.FC = () => {
  const { products } = useProducts();
  const { orders } = useOrders(true);
  const { addNotification } = useAdminNotifications();
  const analytics = simulatedApi.analytics.getData();

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending_payment' || o.status === 'paid').length;

  React.useEffect(() => {
    if (pendingOrders > 0) {
      addNotification(`You have ${pendingOrders} pending order${pendingOrders !== 1 ? 's' : ''} requiring attention`, 'order_update');
    }
    if (orders.filter(o => o.status === 'out_for_delivery').length > 0) {
      addNotification(`${orders.filter(o => o.status === 'out_for_delivery').length} order${orders.filter(o => o.status === 'out_for_delivery').length !== 1 ? 's' : ''} out for delivery`, 'delivery');
    }
  }, [orders, pendingOrders, addNotification]);

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Pending Orders', value: pendingOrders, icon: Users, color: 'bg-yellow-500' },
    { label: 'Total Revenue', value: `FCFA${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Customer Retention', value: `${analytics.customerRetention}%`, icon: TrendingUp, color: 'bg-teal-500' },
    { label: 'Avg Order Value', value: orders.length ? `FCFA${Math.round(totalRevenue / orders.length).toLocaleString()}` : 'FCFA0', icon: BarChart3, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-blue-primary mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-dark-blue-primary mb-4">Top Products</h2>
          <div className="space-y-3">
            {analytics.topProducts.length > 0 ? analytics.topProducts.map((p, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-700">{p.name}</span>
                <span className="font-semibold text-dark-blue-primary">{p.count} sold</span>
              </div>
            )) : <p className="text-gray-500">No sales data yet.</p>}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-dark-blue-primary mb-4">Monthly Revenue</h2>
          <div className="space-y-3">
            {analytics.monthlyRevenue.length > 0 ? analytics.monthlyRevenue.map((m, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-700">{m.month}</span>
                <span className="font-semibold text-dark-blue-primary">FCFA{m.revenue.toLocaleString()}</span>
              </div>
            )) : <p className="text-gray-500">No revenue data yet.</p>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-dark-blue-primary mb-4">Recent Activity</h2>
        <p className="text-gray-600">Admin dashboard overview. Use the sidebar to manage products, orders, blog, inventory, and production.</p>
      </div>
    </div>
  );
};

export default DashboardPage;