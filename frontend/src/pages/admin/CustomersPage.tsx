import { useState, useMemo } from 'react';
import { Eye, Shield, Trash2, Search } from 'lucide-react';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { SectionErrorBoundary } from '../../components/error-boundary/SectionErrorBoundary';
import { getSimulatedOrders } from '../../utils/simulatedApi';
import type { User } from '../../types';

interface Customer extends User {
  _id: string;
  createdAt?: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const raw = localStorage.getItem('brandforge_users');
      if (raw) {
        const stored = JSON.parse(raw) as Array<Omit<User, 'password'> & { password: string; createdAt?: string }>;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return stored.map(({ password, ...rest }) => rest as Customer);
      }
    } catch {
      // ignore parse errors
    }
    return [];
  });
  const [loading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [roleModal, setRoleModal] = useState<{ open: boolean; customer: Customer | null }>({ open: false, customer: null });

  const orders = useMemo(() => getSimulatedOrders(), []);

  const getOrderCount = (customerId: string) => orders.filter(o => o.customer === customerId).length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return customers;
    return customers.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
  }, [customers, search]);

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    const raw = localStorage.getItem('brandforge_users');
    if (!raw) return;
    const stored = JSON.parse(raw);
    const updated = stored.filter((u: { _id: string }) => u._id !== id);
    localStorage.setItem('brandforge_users', JSON.stringify(updated));
    setCustomers(prev => prev.filter(c => c._id !== id));
  };

  const handleRoleChange = (customerId: string, newRole: Customer['role']) => {
    const raw = localStorage.getItem('brandforge_users');
    if (!raw) return;
    const stored = JSON.parse(raw);
    const idx = stored.findIndex((u: { _id: string }) => u._id === customerId);
    if (idx !== -1) {
      stored[idx].role = newRole;
      localStorage.setItem('brandforge_users', JSON.stringify(stored));
      setCustomers(prev => prev.map(c => c._id === customerId ? { ...c, role: newRole } : c));
      setRoleModal({ open: false, customer: null });
    }
  };

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      customer: 'bg-gray-100 text-gray-800',
      admin: 'bg-purple-100 text-purple-800',
      staff: 'bg-blue-100 text-blue-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>;

  return (
    <SectionErrorBoundary sectionName="Customers">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-dark-blue-primary">Customer Management</h1>

        <div className="bg-white rounded-xl shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-accent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No customers found.</td></tr>
                ) : filtered.map(customer => (
                  <tr key={customer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-blue-primary">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadge(customer.role)}`}>{customer.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{getOrderCount(customer._id)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => setSelectedCustomer(customer)} className="text-blue-accent hover:text-blue-600 mr-3" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => setRoleModal({ open: true, customer })} className="text-yellow-600 hover:text-yellow-800 mr-3" title="Change Role">
                        <Shield size={16} />
                      </button>
                      <button onClick={() => handleDelete(customer._id)} className="text-red-600 hover:text-red-800" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedCustomer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCustomer(null)}>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-dark-blue-primary mb-4">Customer Details</h2>
              <div className="space-y-3 text-sm">
                <div><span className="font-semibold text-gray-500">Name:</span> <span className="text-dark-blue-primary">{selectedCustomer.name}</span></div>
                <div><span className="font-semibold text-gray-500">Email:</span> <span className="text-dark-blue-primary">{selectedCustomer.email}</span></div>
                <div><span className="font-semibold text-gray-500">Role:</span> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadge(selectedCustomer.role)}`}>{selectedCustomer.role}</span></div>
                <div><span className="font-semibold text-gray-500">Phone:</span> <span className="text-dark-blue-primary">{selectedCustomer.phone || '-'}</span></div>
                <div><span className="font-semibold text-gray-500">Total Orders:</span> <span className="text-dark-blue-primary">{getOrderCount(selectedCustomer._id)}</span></div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="mt-6 w-full bg-dark-blue-primary text-white py-2 rounded-lg hover:bg-blue-900 transition">Close</button>
            </div>
          </div>
        )}

        {roleModal.open && roleModal.customer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setRoleModal({ open: false, customer: null })}>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-dark-blue-primary mb-4">Change Role</h2>
              <p className="text-sm text-gray-600 mb-4">Update role for <strong>{roleModal.customer.name}</strong></p>
              <div className="space-y-2 mb-6">
                {(['customer', 'staff', 'admin'] as const).map(role => (
                  <label key={role} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={roleModal.customer!.role === role}
                      onChange={() => handleRoleChange(roleModal.customer!._id, role)}
                      className="accent-blue-accent"
                    />
                    <span className="capitalize text-sm font-medium text-dark-blue-primary">{role}</span>
                  </label>
                ))}
              </div>
              <button onClick={() => setRoleModal({ open: false, customer: null })} className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </SectionErrorBoundary>
  );
}
