import { useState, useMemo } from 'react';
import { simulatedApi } from '../../services/simulatedApi';
import { SectionErrorBoundary } from '../../components/error-boundary/SectionErrorBoundary';

export default function FinancialReportsPage() {
  const orders = simulatedApi.orders.getAll();
  const [period, setPeriod] = useState('all');

  const filteredOrders = useMemo(() => {
    if (period === 'all') return orders;
    const now = new Date();
    return orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      if (period === 'month') return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      if (period === 'year') return orderDate.getFullYear() === now.getFullYear();
      return true;
    });
  }, [orders, period]);

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = filteredOrders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const pendingOrders = filteredOrders.filter(o => o.status === 'pending_payment').length;

  const productSales = useMemo(() => {
    const sales: Record<string, { count: number; revenue: number }> = {};
    filteredOrders.forEach(o => {
      o.items.forEach(item => {
        const name = item.productName || item.product;
        if (!sales[name]) sales[name] = { count: 0, revenue: 0 };
        sales[name].count += item.quantity;
        sales[name].revenue += item.unitPrice * item.quantity;
      });
    });
    return Object.entries(sales).sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 10);
  }, [filteredOrders]);

  return (
    <SectionErrorBoundary sectionName="Financial Reports">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-dark-blue-primary">Financial Reports</h1>
          <select value={period} onChange={e => setPeriod(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2">
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-dark-blue-primary mt-1">FCFA{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-dark-blue-primary mt-1">{totalOrders}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Average Order Value</p>
            <p className="text-2xl font-bold text-dark-blue-primary mt-1">FCFA{avgOrderValue.toFixed(0)}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-2xl font-bold text-dark-blue-primary mt-1">{pendingOrders}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-dark-blue-primary mb-4">Top Selling Products</h2>
          <div className="space-y-3">
            {productSales.length > 0 ? productSales.map(([name, data], i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-700">{name}</span>
                <div className="text-right">
                  <span className="font-semibold text-dark-blue-primary">{data.count} sold</span>
                  <span className="text-gray-500 text-sm ml-2">FCFA{data.revenue.toLocaleString()}</span>
                </div>
              </div>
            )) : <p className="text-gray-500">No sales data yet.</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-dark-blue-primary mb-4">Revenue Overview</h2>
          <div className="space-y-3">
            {filteredOrders.slice(0, 10).map(order => (
              <div key={order._id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                <div>
                  <p className="font-mono text-sm text-dark-blue-primary">{order.orderCode}</p>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="font-semibold">FCFA{order.totalAmount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionErrorBoundary>
  );
}
