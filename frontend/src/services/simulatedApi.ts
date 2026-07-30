import type { Product, CreateProductInput, Order, CreateOrderInput, BlogPost, User } from '../types';

interface StoredUser extends User {
  password: string;
  token?: string;
  createdAt?: string;
}

const STORAGE_KEYS = {
  users: 'brandforge_users',
  currentUser: 'brandforge_current_user',
  products: 'brandforge_products',
  orders: 'brandforge_orders',
  blogPosts: 'brandforge_blog_posts',
  inventory: 'brandforge_inventory',
  subscriptions: 'brandforge_subscriptions',
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

const defaultProducts: Product[] = [
  { _id: '1', name: 'Classic T-Shirt', category: 'apparel', description: 'Premium cotton t-shirt perfect for custom printing.', basePrice: 15000, availableColors: ['White', 'Black', 'Navy', 'Red'], availableSizes: ['S', 'M', 'L', 'XL'], printingOptions: ['screen_printing', 'heat_transfer', 'sublimation', 'dtf'], imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Best Sellers' },
  { _id: '2', name: 'Premium Polo', category: 'apparel', description: 'Professional polo shirt for corporate branding.', basePrice: 25000, availableColors: ['White', 'Black', 'Gray'], availableSizes: ['M', 'L', 'XL', 'XXL'], printingOptions: ['embroidery', 'screen_printing'], imageUrl: 'https://images.unsplash.com/photo-1625910513413-5fc02d409f9c?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Best Sellers' },
  { _id: '3', name: 'Hoodie', category: 'apparel', description: 'Warm hoodie ideal for school uniforms and team wear.', basePrice: 35000, availableColors: ['Black', 'Navy', 'Gray', 'Maroon'], availableSizes: ['S', 'M', 'L', 'XL'], printingOptions: ['screen_printing', 'dtf', 'embroidery'], imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Best Sellers' },
  { _id: '4', name: 'Cap', category: 'apparel', description: 'Adjustable cap perfect for events and sports teams.', basePrice: 12000, availableColors: ['White', 'Black', 'Blue', 'Red'], availableSizes: ['One Size'], printingOptions: ['embroidery', 'screen_printing'], imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Best Sellers' },
  { _id: '5', name: 'Tote Bag', category: 'merchandise', description: 'Eco-friendly tote bag for corporate events.', basePrice: 8000, availableColors: ['Natural', 'Black', 'White'], availableSizes: ['Standard'], printingOptions: ['screen_printing', 'heat_transfer'], imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Corporate Deals' },
  { _id: '6', name: 'Mug', category: 'merchandise', description: 'Ceramic mug perfect for corporate gifts.', basePrice: 10000, availableColors: ['White'], availableSizes: ['11oz', '15oz'], printingOptions: ['sublimation'], imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Corporate Deals' },
  { _id: '7', name: 'Summer Tee', category: 'apparel', description: 'Lightweight breathable t-shirt for summer.', basePrice: 18000, availableColors: ['White', 'Yellow', 'Coral'], availableSizes: ['S', 'M', 'L', 'XL'], printingOptions: ['screen_printing', 'dtf'], imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'New Releases' },
  { _id: '8', name: 'Tech Polo', category: 'apparel', description: 'Moisture-wicking polo with anti-odor technology.', basePrice: 28000, availableColors: ['Black', 'Navy', 'Gray'], availableSizes: ['M', 'L', 'XL', 'XXL'], printingOptions: ['embroidery', 'screen_printing'], imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'New Releases' },
  { _id: '9', name: 'Breeze Hoodie', category: 'apparel', description: 'Lightweight hoodie perfect for summer evenings.', basePrice: 32000, availableColors: ['Light Gray', 'Navy', 'White'], availableSizes: ['S', 'M', 'L', 'XL'], printingOptions: ['screen_printing', 'dtf'], imageUrl: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Summer Collection' },
  { _id: '10', name: 'Tank Top', category: 'apparel', description: 'Breathable tank top for active summer wear.', basePrice: 14000, availableColors: ['White', 'Black', 'Pink'], availableSizes: ['S', 'M', 'L'], printingOptions: ['screen_printing', 'heat_transfer'], imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Summer Collection' },
  { _id: '11', name: 'Executive Polo', category: 'apparel', description: 'Premium polo for executive corporate branding.', basePrice: 35000, availableColors: ['White', 'Black', 'Navy'], availableSizes: ['M', 'L', 'XL', 'XXL'], printingOptions: ['embroidery', 'screen_printing'], imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Corporate Deals' },
  { _id: '12', name: 'Corporate Gift Set', category: 'merchandise', description: 'Complete branding package for corporate gifting.', basePrice: 50000, availableColors: ['Multi'], availableSizes: ['Standard'], printingOptions: ['screen_printing', 'sublimation', 'embroidery'], imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), badge: 'Corporate Deals' },
];

const defaultBlogPosts = [
  { id: 1, title: 'The Future of Sustainable Textile Printing', excerpt: 'Exploring eco-friendly printing technologies and their impact on the fashion industry.', image: 'https://images.unsplash.com/photo-1544449792-416fc8ed6a4f?w=800&h=400&fit=crop', date: 'July 15, 2026', category: 'Sustainability', content: 'Full article content here...' },
  { id: 2, title: 'How Digital Workflows Are Revolutionizing Production', excerpt: 'Automation and AI are transforming the way we approach custom apparel manufacturing.', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=400&fit=crop', date: 'July 22, 2026', category: 'Technology', content: 'Full article content here...' },
];

const demoUsers: StoredUser[] = [
  { _id: 'staff-1', name: 'John Staff', email: 'john@brandforge.com', password: 'staff123', phone: '+237 600 000 001', role: 'staff', createdAt: new Date().toISOString() },
  { _id: 'staff-2', name: 'Jane Staff', email: 'jane@brandforge.com', password: 'staff123', phone: '+237 600 000 002', role: 'staff', createdAt: new Date().toISOString() },
  { _id: 'admin-1', name: 'Super Admin', email: 'admin@brandforge.com', password: 'admin123', phone: '+237 600 000 000', role: 'admin', createdAt: new Date().toISOString() },
];

export function seedDemoUsers() {
  const stored = getStorage<StoredUser[]>(STORAGE_KEYS.users, []);
  if (stored.length === 0) {
    setStorage(STORAGE_KEYS.users, demoUsers);
  }
}

export const simulatedApi = {
  auth: {
    register: (data: { name: string; email: string; password: string; phone?: string }) => {
      const users = getStorage<StoredUser[]>(STORAGE_KEYS.users, []);
      if (users.find((u) => u.email === data.email)) {
        throw new Error('User already exists');
      }
      const newUser: StoredUser = {
        _id: Date.now().toString(),
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone || '',
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      setStorage(STORAGE_KEYS.users, users);
      const token = 'simulated_token_' + newUser._id;
      const userWithToken = { ...newUser, token };
      setStorage(STORAGE_KEYS.currentUser, userWithToken);
      return userWithToken;
    },

    login: (data: { email: string; password: string }) => {
      const users = getStorage<StoredUser[]>(STORAGE_KEYS.users, []);
      const user = users.find((u) => u.email === data.email && u.password === data.password);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      const token = 'simulated_token_' + user._id;
      const userWithToken = { ...user, token };
      setStorage(STORAGE_KEYS.currentUser, userWithToken);
      return userWithToken;
    },

    getCurrentUser: (): StoredUser | null => {
      return getStorage<StoredUser | null>(STORAGE_KEYS.currentUser, null);
    },

    getAllUsers: (): StoredUser[] => {
      return getStorage<StoredUser[]>(STORAGE_KEYS.users, []);
    },

    logout: () => {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
    },
  },

  products: {
    getAll: (): Product[] => {
      const stored = getStorage<Product[]>(STORAGE_KEYS.products, []);
      if (stored.length === 0) {
        setStorage(STORAGE_KEYS.products, defaultProducts);
        return defaultProducts;
      }
      return stored;
    },

    getById: (id: string): Product | undefined => {
      return simulatedApi.products.getAll().find((p) => p._id === id);
    },

    create: (data: CreateProductInput): Product => {
      const products = simulatedApi.products.getAll();
      const newProduct = {
        ...data,
        _id: Date.now().toString(),
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Product;
      products.push(newProduct);
      setStorage(STORAGE_KEYS.products, products);
      return newProduct;
    },

    update: (id: string, data: Partial<CreateProductInput>): Product | undefined => {
      const products = simulatedApi.products.getAll();
      const index = products.findIndex((p) => p._id === id);
      if (index === -1) return undefined;
      products[index] = { ...products[index], ...data, updatedAt: new Date().toISOString() };
      setStorage(STORAGE_KEYS.products, products);
      return products[index];
    },

    delete: (id: string): boolean => {
      const products = simulatedApi.products.getAll();
      const filtered = products.filter((p) => p._id !== id);
      if (filtered.length === products.length) return false;
      setStorage(STORAGE_KEYS.products, filtered);
      return true;
    },
  },

  orders: {
    getAll: (): Order[] => {
      return getStorage<Order[]>(STORAGE_KEYS.orders, []);
    },

    getMine: (customerId: string): Order[] => {
      return simulatedApi.orders.getAll().filter((o) => o.customer === customerId || o.customer === 'guest');
    },

    getByCode: (code: string): Order | undefined => {
      return simulatedApi.orders.getAll().find((o) => o.orderCode === code);
    },

    getStaffOrders: (staffId: string): Order[] => {
      return simulatedApi.orders.getAll().filter((o) => o.staffId === staffId);
    },

    create: (data: CreateOrderInput, customerId: string): Order => {
      const orders = simulatedApi.orders.getAll();
      const orderCode = 'BF-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      const items = data.items.map((item) => ({
        product: item.productId,
        productName: '',
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        printingOption: item.printingOption,
        designUrl: item.designUrl,
        unitPrice: 0,
      }));
      const totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      const newOrder: Order = {
        _id: Date.now().toString(),
        orderCode,
        customer: customerId,
        items,
        totalAmount,
        status: 'pending_payment',
        deliveryAddress: data.deliveryAddress,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      orders.unshift(newOrder);
      setStorage(STORAGE_KEYS.orders, orders);
      return newOrder;
    },

    assignStaff: (orderId: string, staffId: string, staffName: string): Order | undefined => {
      const orders = simulatedApi.orders.getAll();
      const index = orders.findIndex((o) => o._id === orderId);
      if (index === -1) return undefined;
      orders[index] = { ...orders[index], staffId, assignedStaffName: staffName, updatedAt: new Date().toISOString() };
      setStorage(STORAGE_KEYS.orders, orders);
      return orders[index];
    },

    updateStatus: (id: string, status: string): Order | undefined => {
      const orders = simulatedApi.orders.getAll();
      const index = orders.findIndex((o) => o._id === id);
      if (index === -1) return undefined;
      orders[index] = { ...orders[index], status: status as Order['status'], updatedAt: new Date().toISOString() };
      setStorage(STORAGE_KEYS.orders, orders);
      return orders[index];
    },
  },

  blog: {
    getAll: (): BlogPost[] => {
      const stored = getStorage<BlogPost[]>(STORAGE_KEYS.blogPosts, []);
      if (stored.length === 0) {
        setStorage(STORAGE_KEYS.blogPosts, defaultBlogPosts);
        return defaultBlogPosts;
      }
      return stored;
    },

    getById: (id: number): BlogPost | undefined => {
      return simulatedApi.blog.getAll().find((p) => p.id === id);
    },

    create: (post: Omit<BlogPost, 'id'>): BlogPost => {
      const posts = simulatedApi.blog.getAll();
      const newPost = { ...post, id: Date.now() };
      posts.unshift(newPost);
      setStorage(STORAGE_KEYS.blogPosts, posts);
      return newPost;
    },

    update: (id: number, updates: Partial<BlogPost>): BlogPost | undefined => {
      const posts = simulatedApi.blog.getAll();
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) return undefined;
      posts[index] = { ...posts[index], ...updates };
      setStorage(STORAGE_KEYS.blogPosts, posts);
      return posts[index];
    },

    delete: (id: number): void => {
      const posts = simulatedApi.blog.getAll().filter((p) => p.id !== id);
      setStorage(STORAGE_KEYS.blogPosts, posts);
    },
  },
};

const demoOrders: Order[] = [
  {
    _id: 'order-1',
    orderCode: 'BF-1B79LGVQ',
    customer: 'guest',
    items: [{ product: '1', productName: 'Classic T-Shirt', quantity: 2, color: 'White', size: 'L', printingOption: 'screen_printing', unitPrice: 15000 }],
    totalAmount: 30000,
    status: 'pending_payment',
    deliveryAddress: '123 Main St, Douala',
    staffId: 'staff-1',
    assignedStaffName: 'John Staff',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: 'order-2',
    orderCode: 'BF-KB7SGCCN',
    customer: 'guest',
    items: [{ product: '2', productName: 'Premium Polo', quantity: 1, color: 'Navy', size: 'M', printingOption: 'embroidery', unitPrice: 25000 }],
    totalAmount: 25000,
    status: 'paid',
    deliveryAddress: '456 Oak Ave, Yaounde',
    staffId: 'staff-1',
    assignedStaffName: 'John Staff',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'order-3',
    orderCode: 'BF-PE2HLS0Y',
    customer: 'guest',
    items: [{ product: '3', productName: 'Hoodie', quantity: 3, color: 'Black', size: 'XL', printingOption: 'dtf', unitPrice: 35000 }],
    totalAmount: 105000,
    status: 'in_design',
    deliveryAddress: '789 Pine Rd, Buea',
    staffId: 'staff-2',
    assignedStaffName: 'Jane Staff',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'order-4',
    orderCode: 'BF-84M1IVZI',
    customer: 'guest',
    items: [{ product: '11', productName: 'Executive Polo', quantity: 10, color: 'White', size: 'L', printingOption: 'embroidery', unitPrice: 35000 }],
    totalAmount: 350000,
    status: 'in_production',
    deliveryAddress: '321 Elm St, Bamenda',
    staffId: 'staff-2',
    assignedStaffName: 'Jane Staff',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    _id: 'order-5',
    orderCode: 'BF-X9Y2ZW3K',
    customer: 'guest',
    items: [{ product: '5', productName: 'Tote Bag', quantity: 50, color: 'Natural', size: 'Standard', printingOption: 'screen_printing', unitPrice: 8000 }],
    totalAmount: 400000,
    status: 'pending_payment',
    deliveryAddress: '654 Cedar Ln, Limbe',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    _id: 'order-6',
    orderCode: 'BF-M3N4OP5Q',
    customer: 'guest',
    items: [{ product: '6', productName: 'Mug', quantity: 100, color: 'White', size: '11oz', printingOption: 'sublimation', unitPrice: 10000 }],
    totalAmount: 1000000,
    status: 'paid',
    deliveryAddress: '987 Birch Blvd, Kumba',
    staffId: 'staff-1',
    assignedStaffName: 'John Staff',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
];

export function seedDemoOrders() {
  const stored = getStorage<Order[]>(STORAGE_KEYS.orders, []);
  if (stored.length === 0) {
    setStorage(STORAGE_KEYS.orders, demoOrders);
  }
}

export function getSimulatedOrders(): Order[] {
  return simulatedApi.orders.getAll();
}
