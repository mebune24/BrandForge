import { useState } from 'react';
import { simulatedApi } from '../../services/simulatedApi';
import { getStatusColor, getStatusLabel, ORDER_STATUSES } from '../../utils/statusConfig';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import type { Order } from '../../types';

export default function DeliveryManagementPage() {
  const [orders, setOrders] = useState<Order[]>(() => simulatedApi.orders.getAll());
  const [loading] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleAssignCourier = (orderId: string) => {
    const courier = prompt('Enter courier name:');
    if (courier) {
      const allOrders = simulatedApi.orders.getAll();
      const order = allOrders.find(o => o._id === orderId);
      if (order) {
        order.deliveryAddress = `${order.deliveryAddress} | Courier: ${courier}`;
        simulatedApi.orders.updateStatus(orderId, 'out_for_delivery');
        setOrders([...allOrders]);
      }
    }
  };

  const handleConfirmDelivery = (orderId: string) => {
    simulatedApi.orders.updateStatus(orderId, 'delivered');
    setOrders(simulatedApi.orders.getAll());
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark-blue-primary">Delivery Management</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2">
          <option value="all">All Orders</option>
          {ORDER_STATUSES.filter(s => ['out_for_delivery', 'delivered'].includes(s.value)).map((status) => (
            <option key={status.value} value={status.value}>{status.label}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono font-bold text-dark-blue-primary">{order.orderCode}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{typeof order.customer === 'object' ? order.customer.name || order.customer.email : order.customer}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>{getStatusLabel(order.status)}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{order.deliveryAddress}</td>
                <td className="px-6 py-4 text-right text-sm">
                  {(order.status === 'paid' || order.status === 'in_design' || order.status === 'in_production') && (
                    <button onClick={() => handleAssignCourier(order._id)} className="text-blue-accent hover:underline mr-3">Assign Courier</button>
                  )}
                  {order.status === 'out_for_delivery' && (
                    <button onClick={() => handleConfirmDelivery(order._id)} className="text-green-600 hover:underline">Confirm Delivery</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
