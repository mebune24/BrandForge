import { useStaffOrders } from '../../hooks/useOrders';
import { getStatusColor } from '../../utils/statusConfig';
import { PRODUCTION_STAGES } from '../../utils/orderStages';
import { Package } from 'lucide-react';

export default function StaffDashboard() {
  const { orders, loading, changeOrderStatus } = useStaffOrders();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-accent"></div>
      </div>
    );
  }

  const totalAssigned = orders.length;
  const pendingCount = orders.filter(o => o.status === 'pending_payment' || o.status === 'paid').length;
  const inProgressCount = orders.filter(o => ['in_design', 'in_production', 'quality_check', 'packaging'].includes(o.status)).length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-blue-primary mb-8">Staff Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Assigned Orders</p>
          <p className="text-3xl font-bold text-dark-blue-primary mt-2">{totalAssigned}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Pending Action</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{inProgressCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Delivered</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{deliveredCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-dark-blue-primary mb-4">My Assigned Orders</h2>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders assigned to you yet.</p>
            <p className="text-sm text-gray-400 mt-2">Contact an admin to get orders assigned.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-dark-blue-primary">
                      {order.orderCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {typeof order.customer === 'object' ? order.customer.name || order.customer.email : order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.items.length} item(s)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-dark-blue-primary">
                      FCFA{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={order.status}
                        onChange={(e) => changeOrderStatus(order._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-0 font-semibold ${getStatusColor(order.status)}`}
                      >
                        <option value="pending_payment">Pending Payment</option>
                        <option value="paid">Paid</option>
                        <option value="in_design">In Design</option>
                        <option value="in_production">In Production</option>
                        <option value="quality_check">Quality Check</option>
                        <option value="packaging">Packaging</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-dark-blue-primary mb-4">Production Pipeline</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {PRODUCTION_STAGES.map((stage) => {
            const stageOrders = orders.filter(o => o.status === stage.key);
            return (
              <div key={stage.key} className={`rounded-xl border-2 ${stage.color} p-4`}>
                <div className="flex items-center gap-2 mb-3">
                  <stage.icon size={16} className="text-gray-600" />
                  <h3 className="text-xs font-bold text-gray-700 uppercase">{stage.label}</h3>
                </div>
                <p className="text-2xl font-bold text-dark-blue-primary">{stageOrders.length}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
