import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../data/index.ts';
import { useAuthStatus } from '../../hooks/useAuth.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { Menu, X, LogOut, User, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isStaff, user } = useAuthStatus();
  const { logout } = useAuth();

  return (
    <nav className="bg-dark-blue-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          BrandForge<span className="text-blue-accent">Tech</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition duration-300 ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {isStaff && (
                <Link to="/admin" className="text-gray-300 hover:text-white transition text-sm">
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <User size={16} />
                <span>{user?.name}</span>
              </div>
              <button onClick={logout} className="text-gray-300 hover:text-white transition">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <button className="relative text-gray-300 hover:text-white transition">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <Link
                to="/login"
                className="bg-blue-accent text-dark-blue-primary px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition shadow-md text-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-dark-blue-primary px-6 pb-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `block py-2 text-sm ${isActive ? 'text-white' : 'text-gray-300'}`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="border-t border-gray-700 mt-4 pt-4">
            {isAuthenticated ? (
              <>
                {isStaff && (
                  <Link to="/admin" className="block py-2 text-sm text-gray-300" onClick={() => setIsOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={() => { logout(); setIsOpen(false); }} className="block py-2 text-sm text-gray-300">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2 text-sm text-blue-accent" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
