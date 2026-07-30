import { useMemo } from 'react';
import { useStaffOrders } from '../../hooks/useOrders';

export default function StaffCustomersPage() {
  const { orders, loading } = useStaffOrders();

  const uniqueCustomers = useMemo(() => {
    const customerMap = new Map<string, { name: string; email: string; orderCount: number; totalSpent: number }>();
    orders.forEach((order) => {
      const customer = typeof order.customer === 'object' ? order.customer : { name: 'Guest', email: 'guest@example.com' };
      const key = customer.email || customer.name;
      const existing = customerMap.get(key);
      if (existing) {
        existing.orderCount += 1;
        existing.totalSpent += order.totalAmount;
      } else {
        customerMap.set(key, {
          name: customer.name || 'Guest',
          email: customer.email || 'guest@example.com',
          orderCount: 1,
          totalSpent: order.totalAmount,
        });
      }
    });
    return Array.from(customerMap.values());
  }, [orders]);

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-dark-blue-primary mb-8">My Customers</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 rounded-xl h-24 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-dark-blue-primary mb-8">My Customers</h2>
        {uniqueCustomers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">You have no customers assigned yet.</p>
            <p className="text-sm text-gray-400">Customers will appear here once orders are assigned to you.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {uniqueCustomers.map((customer, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-blue-primary">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.orderCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-dark-blue-primary">FCFA{customer.totalSpent.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
