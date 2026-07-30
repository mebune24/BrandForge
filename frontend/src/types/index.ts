export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'staff';
  phone?: string;
}

export interface Product {
  _id: string;
  name: string;
  category: 'apparel' | 'merchandise' | 'uniform' | 'safety_wear' | 'other';
  description: string;
  basePrice: number;
  availableColors: string[];
  availableSizes: string[];
  printingOptions: ('screen_printing' | 'heat_transfer' | 'sublimation' | 'dtf' | 'vinyl' | 'embroidery')[];
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  badge?: 'Best Sellers' | 'New Releases' | 'Summer Collection' | 'Corporate Deals';
}

export interface OrderItem {
  product: string;
  productName?: string;
  quantity: number;
  color?: string;
  size?: string;
  printingOption?: string;
  designUrl?: string;
  unitPrice: number;
}

export interface Order {
  _id: string;
  orderCode: string;
  customer: string | User;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending_payment' | 'paid' | 'in_design' | 'in_production' | 'quality_check' | 'packaging' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  paymentReference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'staff';
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface CreateOrderInput {
  items: {
    productId: string;
    quantity: number;
    color?: string;
    size?: string;
    printingOption?: string;
    designUrl?: string;
  }[];
  deliveryAddress: string;
}

export interface CreateProductInput {
  name: string;
  category: 'apparel' | 'merchandise' | 'uniform' | 'safety_wear' | 'other';
  description?: string;
  basePrice: number;
  availableColors?: string[];
  availableSizes?: string[];
  printingOptions?: ('screen_printing' | 'heat_transfer' | 'sublimation' | 'dtf' | 'vinyl' | 'embroidery')[];
  imageUrl?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  content?: string;
}

export interface ApiError {
  message: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  basePrice: number;
  quantity: number;
  color?: string;
  size?: string;
  printingOption?: string;
  designUrl?: string;
  unitPrice: number;
}

export interface Address {
  _id?: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  country: string;
  isDefault: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  features: string[];
  target: 'school' | 'business' | 'ngo' | 'individual';
}

export interface InventoryItem {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  unit: string;
  lastRestocked: string;
}

export interface ProductionStage {
  key: string;
  label: string;
  orders: Order[];
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  topProducts: { name: string; count: number }[];
  monthlyRevenue: { month: string; revenue: number }[];
  customerRetention: number;
}
