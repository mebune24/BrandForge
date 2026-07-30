import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../data/index.ts';
import { useAuthStatus } from '../../hooks/useAuth.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { useCart } from '../../context/CartContext';
import { Menu, X, LogOut, User, Bell, ShoppingCart, ChevronDown } from 'lucide-react';
import { iconMap } from '../../utils/icons';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, isStaff, user } = useAuthStatus();
  const { logout } = useAuth();
  const { cartCount } = useCart();
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown] && !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(prev => prev === label ? null : label);
  };

  return (
    <nav className="bg-dark-blue-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-accent rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
            <img 
              src="/icons/brandforge.png" 
              alt="BrandForge Logo" 
              className="w-8 h-8 object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight leading-none">BrandForge</span>
            <span className="text-xs text-blue-accent font-semibold tracking-wider">TECH</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              ref={el => { dropdownRefs.current[link.label] = el; }}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => handleDropdownToggle(link.label)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition duration-300 ${
                      activeDropdown === link.label ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-50">
                      <h3 className="text-lg font-bold text-dark-blue-primary mb-4">{link.dropdown.title}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {link.dropdown.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-accent/10 rounded-lg flex items-center justify-center group-hover:bg-blue-accent/20 transition">
                              {iconMap[item.icon || ''] || null}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-dark-blue-primary group-hover:text-blue-accent transition">{item.label}</span>
                                {item.badge && (
                                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-accent text-dark-blue-primary rounded-full">{item.badge}</span>
                                )}
                              </div>
                              {item.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</p>}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `text-sm font-medium transition duration-300 ${
                      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative text-gray-300 hover:text-white transition">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
          </Link>
          
          {isAuthenticated ? (
            <>
              {isStaff && (
                <Link to="/admin" className="text-gray-300 hover:text-white transition text-sm">
                  Admin
                </Link>
              )}
              <Link to="/orders" className="text-gray-300 hover:text-white transition text-sm">Orders</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white transition text-sm">Profile</Link>
              <Link to="/notifications" className="relative text-gray-300 hover:text-white transition">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </Link>
              <Link to="/address-book" className="text-gray-300 hover:text-white transition text-sm">Addresses</Link>
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
              <Link to="/reviews" className="text-gray-300 hover:text-white transition text-sm">Reviews</Link>
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
            <div key={link.label}>
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => handleDropdownToggle(link.label)}
                    className="flex items-center justify-between w-full py-2 text-sm text-gray-300"
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="pl-4 pb-2 space-y-2">
                      {link.dropdown.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block py-1 text-sm text-gray-400 hover:text-white"
                          onClick={() => { setIsOpen(false); setActiveDropdown(null); }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
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
              )}
            </div>
          ))}
          <NavLink to="/cart" className="block py-2 text-sm text-gray-300" onClick={() => setIsOpen(false)}>Cart ({cartCount})</NavLink>
          <div className="border-t border-gray-700 mt-4 pt-4">
            {isAuthenticated ? (
              <>
                {isStaff && (
                  <Link to="/admin" className="block py-2 text-sm text-gray-300" onClick={() => setIsOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/orders" className="block py-2 text-sm text-gray-300" onClick={() => setIsOpen(false)}>My Orders</Link>
                <Link to="/profile" className="block py-2 text-sm text-gray-300" onClick={() => setIsOpen(false)}>Profile</Link>
                <Link to="/notifications" className="block py-2 text-sm text-gray-300" onClick={() => setIsOpen(false)}>Notifications</Link>
                <Link to="/address-book" className="block py-2 text-sm text-gray-300" onClick={() => setIsOpen(false)}>Address Book</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="block py-2 text-sm text-gray-300">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/reviews" className="block py-2 text-sm text-gray-300" onClick={() => setIsOpen(false)}>Reviews</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;