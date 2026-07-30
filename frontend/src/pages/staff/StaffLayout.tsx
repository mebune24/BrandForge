import React from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuth';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const StaffLayout: React.FC = () => {
  const { isAuthenticated, isStaff } = useAuthStatus();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (!isAuthenticated || !isStaff) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { to: '/staff', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/staff/orders', icon: ShoppingCart, label: 'My Orders' },
    { to: '/staff/customers', icon: Users, label: 'Customers' },
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
            <div>
              <h2 className="text-xl font-bold">Staff Panel</h2>
              <p className="text-xs text-blue-accent mt-1">{user?.name}</p>
            </div>
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
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-bold text-dark-blue-primary">BrandForge Staff</span>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition" title="Logout">
            <LogOut size={20} />
          </button>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
