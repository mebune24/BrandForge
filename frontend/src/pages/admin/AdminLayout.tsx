import React from 'react';
import { Outlet, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuth';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  FileText,
  Warehouse,
  Factory,
  Users,
  DollarSign,
  Truck,
  Receipt,
  BarChart3,
} from 'lucide-react';
import AdminBellIcon from '../../components/admin/AdminBellIcon';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, isStaff } = useAuthStatus();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isSimulatedAdmin = localStorage.getItem('brandforge_simulated_admin') === 'true';

  if ((!isAuthenticated || !isStaff) && !isSimulatedAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    localStorage.removeItem('brandforge_simulated_admin');
    navigate('/');
  };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/admin/customers', icon: Users, label: 'Customers' },
    { to: '/admin/pricing', icon: DollarSign, label: 'Pricing' },
    { to: '/admin/production', icon: Factory, label: 'Production' },
    { to: '/admin/inventory', icon: Warehouse, label: 'Inventory' },
    { to: '/admin/delivery', icon: Truck, label: 'Delivery' },
    { to: '/admin/invoices', icon: Receipt, label: 'Invoices' },
    { to: '/admin/blog', icon: FileText, label: 'Blog' },
    { to: '/admin/finance', icon: BarChart3, label: 'Finance' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-blue-primary text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X size={24} />
            </button>
          </div>
        </div>
        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive ? 'bg-blue-accent text-white' : 'text-gray-300 hover:bg-dark-blue-secondary'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-blue-secondary transition w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <span className="font-bold text-dark-blue-primary">BrandForge Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <AdminBellIcon />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
