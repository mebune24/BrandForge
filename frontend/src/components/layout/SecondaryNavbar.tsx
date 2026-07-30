import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { iconMap } from '../../utils/icons';

import MegaMenu from './MegaMenu';

export default function SecondaryNavbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('brandforge_dark_mode');
    return saved ? saved === 'true' : false;
  });
  const [language, setLanguage] = useState('en');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeMenu && menuRefs.current[activeMenu] && !menuRefs.current[activeMenu]?.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu]);

  useEffect(() => {
    localStorage.setItem('brandforge_dark_mode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const menuItems = [
    {
      id: 'industries',
      label: 'Industries',
      sections: [
        {
          title: 'By Sector',
          items: [
            { label: 'Education', href: '/subscriptions', description: 'Schools, universities, colleges', icon: 'GraduationCap' },
            { label: 'Healthcare', href: '/subscriptions', description: 'Hospitals, clinics, labs', icon: 'Heart' },
            { label: 'Corporate', href: '/subscriptions', description: 'Offices, startups, enterprises', icon: 'Building2' },
            { label: 'Sports', href: '/products?category=apparel', description: 'Teams, clubs, events', icon: 'Trophy' },
            { label: 'Government', href: '/contact', description: 'Public sector & institutions', icon: 'Shield' },
            { label: 'NGOs', href: '/subscriptions', description: 'Non-profits & charities', icon: 'Users' },
          ],
        },
      ],
    },
    {
      id: 'technologies',
      label: 'Technologies',
      sections: [
        {
          title: 'Printing Methods',
          items: [
            { label: 'DTG Printing', href: '/services', description: 'Direct-to-garment', icon: 'Printer' },
            { label: 'Screen Printing', href: '/services', description: 'Traditional bulk printing', icon: 'Printer' },
            { label: 'Embroidery', href: '/services', description: 'Stitched logos & text', icon: 'PenTool' },
            { label: 'DTF Printing', href: '/services', description: 'Heat transfer film', icon: 'Printer' },
            { label: 'Sublimation', href: '/services', description: 'All-over print', icon: 'Zap' },
            { label: 'Vinyl Cutting', href: '/services', description: 'Heat transfer vinyl', icon: 'Scissors' },
          ],
        },
      ],
    },
    {
      id: 'resources',
      label: 'Resources',
      sections: [
        {
          title: 'Learn & Grow',
          items: [
            { label: 'Design Templates', href: '/ai-assistant', description: 'Free downloadable templates', icon: 'Layout' },
            { label: 'Video Tutorials', href: '/blog', description: 'Step-by-step guides', icon: 'Video' },
            { label: 'Case Studies', href: '/blog', description: 'Success stories', icon: 'BookOpen' },
            { label: 'Webinars', href: '/blog', description: 'Live training sessions', icon: 'Calendar' },
            { label: 'Size Charts', href: '/contact', description: 'Find your perfect fit', icon: 'Ruler' },
            { label: 'Color Matching', href: '/ai-assistant', description: 'Pantone to RGB tools', icon: 'Palette' },
          ],
        },
      ],
    },
    {
      id: 'vip',
      label: 'VIP Bonus',
      sections: [
        {
          title: 'VIP Program',
          items: [
            { label: 'Loyalty Points', href: '/profile', description: 'Earn points on every order', icon: 'Award', badge: 'VIP' },
            { label: 'Referral Rewards', href: '/profile', description: 'Get 10% off per referral', icon: 'Users', badge: 'Hot' },
            { label: 'Exclusive Discounts', href: '/products', description: 'Members-only pricing', icon: 'DollarSign' },
            { label: 'Priority Support', href: '/contact', description: '24/7 dedicated line', icon: 'Headphones' },
            { label: 'Free Design Reviews', href: '/ai-assistant', description: 'Expert design feedback', icon: 'CheckCircle' },
            { label: 'Early Access', href: '/products', description: 'New products first', icon: 'Zap', badge: 'New' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <MegaMenu />
            {menuItems.map((menu) => (
              <div
                key={menu.id}
                className="relative"
                ref={(el) => { menuRefs.current[menu.id] = el; }}
              >
                <button
                  onClick={() => setActiveMenu(prev => prev === menu.id ? null : menu.id)}
                  onMouseEnter={() => setActiveMenu(menu.id)}
                  className={`flex items-center gap-1 px-4 py-3 text-sm font-medium transition duration-300 ${
                    activeMenu === menu.id ? 'text-blue-accent' : 'text-gray-600 hover:text-dark-blue-primary'
                  }`}
                >
                  {menu.label}
                  <ChevronDown size={14} className={`transition-transform ${activeMenu === menu.id ? 'rotate-180' : ''}`} />
                </button>
                {activeMenu === menu.id && (
                  <div
                    className="absolute top-full left-0 mt-0 bg-white rounded-b-xl shadow-2xl border border-t-0 border-gray-100 z-40"
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className="flex">
                      {menu.sections.map((section, sIdx) => (
                        <div key={sIdx} className={`${sIdx > 0 ? 'ml-8 pl-8 border-l border-gray-100' : ''} min-w-[240px]`}>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-4">{section.title}</h4>
                          <div className="space-y-1">
                            {section.items.map((item) => (
                              <Link
                                key={item.label}
                                to={item.href}
                                className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition group"
                                onClick={() => setActiveMenu(null)}
                              >
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-accent/10 rounded-lg flex items-center justify-center group-hover:bg-blue-accent/20 transition text-sm">
                                  {iconMap[item.icon || ''] || null}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-dark-blue-primary group-hover:text-blue-accent transition">{item.label}</span>
                                    {item.badge && (
                                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full">{item.badge}</span>
                                    )}
                                  </div>
                                  {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-500 hover:text-blue-accent transition" title="Facebook">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-accent transition" title="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-accent transition" title="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-accent transition" title="LinkedIn">
                <FaLinkedin size={18} />
              </a>
            </div>

            <div className="w-px h-6 bg-gray-200"></div>

            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-accent transition"
              >
                {language === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}
                <ChevronDown size={12} />
              </button>
              {showLangDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 min-w-[100px]">
                  <button
                    onClick={() => { setLanguage('en'); setShowLangDropdown(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-gray-50 ${language === 'en' ? 'text-blue-accent font-semibold' : 'text-gray-700'}`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => { setLanguage('fr'); setShowLangDropdown(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-gray-50 ${language === 'fr' ? 'text-blue-accent font-semibold' : 'text-gray-700'}`}
                  >
                    🇫🇷 Français
                  </button>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-gray-200"></div>

            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-accent transition"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
