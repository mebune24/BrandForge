import type { BlogPost, Address, InventoryItem, SubscriptionPlan, AnalyticsData, Order } from '../types';

const STORAGE_KEYS = {
  addresses: 'brandforge_addresses',
  blogPosts: 'brandforge_blog_posts',
  inventory: 'brandforge_inventory',
  subscriptions: 'brandforge_subscriptions',
  orders: 'brandforge_orders',
};

function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const simulatedApi = {
  addresses: {
    getAll: (): Address[] => getStorage<Address[]>(STORAGE_KEYS.addresses, []),
    add: (address: Omit<Address, '_id'>): Address => {
      const addresses = simulatedApi.addresses.getAll();
      const newAddress = { ...address, _id: Date.now().toString() };
      setStorage(STORAGE_KEYS.addresses, [...addresses, newAddress]);
      return newAddress;
    },
    update: (id: string, updates: Partial<Address>): Address | undefined => {
      const addresses = simulatedApi.addresses.getAll();
      const index = addresses.findIndex(a => a._id === id);
      if (index === -1) return undefined;
      addresses[index] = { ...addresses[index], ...updates };
      setStorage(STORAGE_KEYS.addresses, addresses);
      return addresses[index];
    },
    delete: (id: string): void => {
      setStorage(STORAGE_KEYS.addresses, simulatedApi.addresses.getAll().filter(a => a._id !== id));
    },
  },

  blogPosts: {
    getAll: (): BlogPost[] => {
      const stored = getStorage<BlogPost[]>(STORAGE_KEYS.blogPosts, []);
      if (stored.length === 0) {
        const defaults: BlogPost[] = [
          { id: 1, title: 'The Future of Sustainable Textile Printing', excerpt: 'Exploring eco-friendly printing technologies and their impact on the fashion industry.', image: 'https://images.unsplash.com/photo-1544449792-416fc8ed6a4f?w=800&h=400&fit=crop', date: 'July 15, 2026', category: 'Sustainability', content: 'Full article content here...' },
          { id: 2, title: 'How Digital Workflows Are Revolutionizing Production', excerpt: 'Automation and AI are transforming the way we approach custom apparel manufacturing.', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=400&fit=crop', date: 'July 22, 2026', category: 'Technology', content: 'Full article content here...' },
        ];
        setStorage(STORAGE_KEYS.blogPosts, defaults);
        return defaults;
      }
      return stored;
    },
    getById: (id: number): BlogPost | undefined => simulatedApi.blogPosts.getAll().find(p => p.id === id),
    create: (post: Omit<BlogPost, 'id'>): BlogPost => {
      const posts = simulatedApi.blogPosts.getAll();
      const newPost = { ...post, id: Date.now() };
      setStorage(STORAGE_KEYS.blogPosts, [...posts, newPost]);
      return newPost;
    },
    update: (id: number, updates: Partial<BlogPost>): BlogPost | undefined => {
      const posts = simulatedApi.blogPosts.getAll();
      const index = posts.findIndex(p => p.id === id);
      if (index === -1) return undefined;
      posts[index] = { ...posts[index], ...updates };
      setStorage(STORAGE_KEYS.blogPosts, posts);
      return posts[index];
    },
    delete: (id: number): void => {
      setStorage(STORAGE_KEYS.blogPosts, simulatedApi.blogPosts.getAll().filter(p => p.id !== id));
    },
  },

  inventory: {
    getAll: (): InventoryItem[] => {
      const stored = getStorage<InventoryItem[]>(STORAGE_KEYS.inventory, []);
      if (stored.length === 0) {
        const defaults: InventoryItem[] = [
          { _id: '1', name: 'Blank T-Shirts (M)', category: 'Apparel', quantity: 1200, minStock: 200, unit: 'pcs', lastRestocked: '2026-07-20' },
          { _id: '2', name: 'White Ink', category: 'Ink', quantity: 45, minStock: 10, unit: 'liters', lastRestocked: '2026-07-18' },
          { _id: '3', name: 'Vinyl Sheets', category: 'Vinyl', quantity: 80, minStock: 20, unit: 'pcs', lastRestocked: '2026-07-15' },
          { _id: '4', name: 'Polyester Blanks (L)', category: 'Apparel', quantity: 500, minStock: 100, unit: 'pcs', lastRestocked: '2026-07-10' },
        ];
        setStorage(STORAGE_KEYS.inventory, defaults);
        return defaults;
      }
      return stored;
    },
    update: (id: string, quantity: number): void => {
      const items = simulatedApi.inventory.getAll();
      const item = items.find(i => i._id === id);
      if (item) {
        item.quantity = quantity;
        item.lastRestocked = new Date().toISOString().split('T')[0];
        setStorage(STORAGE_KEYS.inventory, items);
      }
    },
  },

  subscriptions: {
    getAll: (): SubscriptionPlan[] => [
      { id: '1', name: 'School Basic', price: 150000, period: 'yearly', features: ['Up to 200 students', '2 uniform designs', 'Free delivery', 'Online portal'], target: 'school' },
      { id: '2', name: 'Business Pro', price: 300000, period: 'yearly', features: ['Up to 50 employees', 'Unified branding', 'Priority support', 'Analytics dashboard'], target: 'business' },
      { id: '3', name: 'NGO Starter', price: 100000, period: 'yearly', features: ['Up to 100 event kits', '1 design per quarter', 'Standard delivery'], target: 'ngo' },
      { id: '4', name: 'Individual Creator', price: 15000, period: 'monthly', features: ['5 designs/month', 'Print-on-demand', 'Revenue sharing', 'Marketing tools'], target: 'individual' },
    ],
  },

  analytics: {
    getData(): AnalyticsData {
      const orders = JSON.parse(localStorage.getItem('brandforge_simulated_orders') || '[]') as Order[];
      const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.totalAmount, 0);
      const totalOrders = orders.length;
      const productCounts: Record<string, number> = {};
      orders.forEach(o => {
        o.items.forEach(item => {
          productCounts[item.productName || item.product] = (productCounts[item.productName || item.product] || 0) + item.quantity;
        });
      });
      const topProducts = Object.entries(productCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));
      const monthlyRevenue: Record<string, number> = {};
      orders.forEach(o => {
        const month = new Date(o.createdAt).toLocaleString('default', { month: 'short' });
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + o.totalAmount;
      });
      return {
        totalRevenue,
        totalOrders,
        topProducts,
        monthlyRevenue: Object.entries(monthlyRevenue).map(([month, revenue]) => ({ month, revenue })),
        customerRetention: 78,
      };
    },
  },
};

export function saveSimulatedOrder(order: Order) {
  const orders = JSON.parse(localStorage.getItem('brandforge_simulated_orders') || '[]') as Order[];
  orders.unshift(order);
  localStorage.setItem('brandforge_simulated_orders', JSON.stringify(orders));
}

export function getSimulatedOrders(): Order[] {
  return JSON.parse(localStorage.getItem('brandforge_simulated_orders') || '[]') as Order[];
}
