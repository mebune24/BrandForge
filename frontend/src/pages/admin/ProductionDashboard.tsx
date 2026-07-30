import { useState, useEffect } from 'react';
import { getSimulatedOrders } from '../../utils/simulatedApi';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import type { Order } from '../../types';

const stages = [
  { key: 'pending_payment', label: 'Pending Payment' },
  { key: 'paid', label: 'Paid / Ready' },
  { key: 'in_design', label: 'In Design' },
  { key: 'in_production', label: 'In Production' },
  { key: 'quality_check', label: 'Quality Check' },
  { key: 'packaging', label: 'Packaging' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
];

export default function ProductionDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getSimulatedOrders());
    setLoading(false);
  }, []);

  const moveOrder = (orderId: string, newStatus: string) => {
    const allOrders = JSON.parse(localStorage.getItem('brandforge_simulated_orders') || '[]') as Order[];
    const idx = allOrders.findIndex(o => o._id === orderId);
    if (idx !== -1) {
      allOrders[idx].status = newStatus as Order['status'];
      localStorage.setItem('brandforge_simulated_orders', JSON.stringify(allOrders));
      setOrders([...allOrders]);
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark-blue-primary">Production Dashboard</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2">
          <option value="all">All Orders</option>
          {stages.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {stages.map(stage => (
          <div key={stage.key} className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">{stage.label}</h3>
            <div className="space-y-3">
              {filteredOrders.filter(o => o.status === stage.key).map(order => (
                <div key={order._id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <p className="font-semibold text-sm text-dark-blue-primary">{order.orderCode}</p>
                  <p className="text-xs text-gray-500 mt-1">{typeof order.customer === 'string' ? order.customer : order.customer.name}</p>
                  <p className="text-xs text-gray-500">FCFA{order.totalAmount.toLocaleString()}</p>
                  <div className="mt-2 flex gap-1">
                    {stages.findIndex(s => s.key === order.status) > stages.findIndex(s => s.key === stage.key) && (
                      <button onClick={() => moveOrder(order._id, stage.key)} className="text-xs bg-blue-accent text-dark-blue-primary px-2 py-1 rounded hover:bg-blue-400 transition">Move Here</button>
                    )}
                    {stages.findIndex(s => s.key === order.status) < stages.findIndex(s => s.key === stage.key) && (
                      <button onClick={() => {
                        const currentIdx = stages.findIndex(s => s.key === order.status);
                        if (currentIdx < stages.length - 1) moveOrder(order._id, stages[currentIdx + 1].key);
                      }} className="text-xs bg-dark-blue-primary text-white px-2 py-1 rounded hover:bg-blue-900 transition">Advance</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
