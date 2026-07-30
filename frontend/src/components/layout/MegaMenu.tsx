import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu } from 'lucide-react';
import { iconMap } from '../../utils/icons';

interface MegaMenuItem {
  label: string;
  href?: string;
  description?: string;
  icon?: string;
  badge?: string;
  children?: MegaMenuItem[];
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

const menuData: MegaMenuSection[] = [
  {
    title: 'Trending',
    items: [
      { label: 'Best Sellers', href: '/products', description: 'Top selling products', icon: 'TrendingUp' },
      { label: 'New Releases', href: '/products', description: 'Latest arrivals', icon: 'Sparkles', badge: 'New' },
      { label: 'Summer Collection', href: '/products?category=apparel', description: 'Lightweight & breathable', icon: 'Sun' },
      { label: 'Corporate Deals', href: '/subscriptions', description: 'Bulk order discounts', icon: 'DollarSign' },
    ],
  },
  {
    title: 'Shop by Category',
    items: [
      { 
        label: 'Apparel', 
        href: '/products?category=apparel', 
        description: 'T-shirts, polos, hoodies',
        icon: 'Shirt',
        children: [
          { label: 'T-Shirts', href: '/products?category=apparel' },
          { label: 'Polo Shirts', href: '/products?category=apparel' },
          { label: 'Hoodies & Sweatshirts', href: '/products?category=apparel' },
          { label: 'Jackets', href: '/products?category=apparel' },
          { label: 'Caps & Hats', href: '/products?category=apparel' },
        ]
      },
      { 
        label: 'Merchandise', 
        href: '/products?category=merchandise', 
        description: 'Promotional items',
        icon: 'Gift',
        children: [
          { label: 'Mugs', href: '/products?category=merchandise' },
          { label: 'Pens & Notebooks', href: '/products?category=merchandise' },
          { label: 'Bags & Totes', href: '/products?category=merchandise' },
          { label: 'Water Bottles', href: '/products?category=merchandise' },
          { label: 'USB Drives', href: '/products?category=merchandise' },
        ]
      },
      { 
        label: 'Uniforms', 
        href: '/products?category=uniform', 
        description: 'School & corporate',
        icon: 'Users',
        children: [
          { label: 'School Uniforms', href: '/products?category=uniform' },
          { label: 'Corporate Uniforms', href: '/products?category=uniform' },
          { label: 'Medical Scrubs', href: '/products?category=uniform' },
          { label: 'Lab Coats', href: '/products?category=uniform' },
          { label: 'Safety Wear', href: '/products?category=safety_wear' },
        ]
      },
      { 
        label: 'Safety Wear', 
        href: '/products?category=safety_wear', 
        description: 'Protective equipment',
        icon: 'ShieldCheck',
        children: [
          { label: 'Safety Vests', href: '/products?category=safety_wear' },
          { label: 'Hard Hats', href: '/products?category=safety_wear' },
          { label: 'Work Boots', href: '/products?category=safety_wear' },
          { label: 'Gloves', href: '/products?category=safety_wear' },
          { label: 'Overalls', href: '/products?category=safety_wear' },
        ]
      },
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'Textile Printing', href: '/services', description: 'DTG, screen, heat transfer', icon: 'Printer' },
      { label: 'Embroidery', href: '/services', description: 'Stitched logos & designs', icon: 'PenTool' },
      { label: 'Corporate Branding', href: '/services', description: 'Complete brand identity', icon: 'Building2' },
      { label: 'Digital Workflows', href: '/services', description: 'Online ordering & tracking', icon: 'Smartphone' },
    ],
  },
  {
    title: 'Solutions',
    items: [
      { label: 'Schools & Universities', href: '/subscriptions', description: 'Bulk uniform ordering', icon: 'GraduationCap' },
      { label: 'Corporate Clients', href: '/subscriptions', description: 'Employee branding', icon: 'Building2' },
      { label: 'NGOs & Events', href: '/subscriptions', description: 'Event merchandise', icon: 'Heart' },
      { label: 'Sports Teams', href: '/products?category=apparel', description: 'Custom jerseys', icon: 'Trophy' },
    ],
  },
  {
    title: 'Account & Support',
    items: [
      { label: 'Your Account', href: '/profile', description: 'Manage settings', icon: 'User' },
      { label: 'Order History', href: '/orders', description: 'Track & reorder', icon: 'FileText' },
      { label: 'Address Book', href: '/address-book', description: 'Delivery addresses', icon: 'MapPin' },
      { label: 'Customer Service', href: '/contact', description: 'Get help', icon: 'Headphones' },
      { label: 'Sign In', href: '/login', description: 'Access your account', icon: 'LogIn' },
    ],
  },
];

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:text-dark-blue-primary transition"
      >
        <Menu size={20} />
        <span className="hidden lg:inline">All</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-0 bg-white rounded-b-xl shadow-2xl border border-t-0 border-gray-100 z-50 w-[900px] max-h-[80vh] overflow-y-auto">
          <div className="flex">
            <div className="w-64 border-r border-gray-100 bg-gray-50">
              {menuData.map((section) => (
                <div key={section.title} className="border-b border-gray-100 last:border-b-0">
                  <h3 className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                    {section.title}
                  </h3>
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href || '#'}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-white hover:text-blue-accent transition group"
                      onClick={() => {
                        if (!item.children) setIsOpen(false);
                      }}
                      onMouseEnter={() => item.children && setActiveSubmenu(item.label)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{iconMap[item.icon || ''] || null}</span>
                        <div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-accent transition">{item.label}</span>
                          {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                        </div>
                      </div>
                      {item.children && <ChevronRight size={14} className="text-gray-400" />}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex-1 p-6">
              {activeSubmenu && (() => {
                const parentItem = menuData.flatMap(s => s.items).find(i => i.label === activeSubmenu);
                if (!parentItem?.children) return null;
                return (
                  <div>
                    <h3 className="text-lg font-bold text-dark-blue-primary mb-4">{parentItem.label}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {parentItem.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href || '#'}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex-1">
                            <span className="text-sm font-semibold text-dark-blue-primary group-hover:text-blue-accent transition">
                              {child.label}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}
              
              {!activeSubmenu && (
                <div>
                  <h3 className="text-lg font-bold text-dark-blue-primary mb-4">Welcome to BrandForge</h3>
                  <p className="text-sm text-gray-600 mb-4">Explore our complete range of custom apparel and branding solutions.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/products" className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                      <p className="text-sm font-semibold text-dark-blue-primary">Browse Products</p>
                      <p className="text-xs text-gray-500">T-shirts, polos, hoodies & more</p>
                    </Link>
                    <Link to="/services" className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                      <p className="text-sm font-semibold text-dark-blue-primary">Our Services</p>
                      <p className="text-xs text-gray-500">Printing, embroidery & branding</p>
                    </Link>
                    <Link to="/subscriptions" className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                      <p className="text-sm font-semibold text-dark-blue-primary">Subscriptions</p>
                      <p className="text-xs text-gray-500">For schools, businesses & teams</p>
                    </Link>
                    <Link to="/contact" className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                      <p className="text-sm font-semibold text-dark-blue-primary">Get Support</p>
                      <p className="text-xs text-gray-500">Contact our team</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
