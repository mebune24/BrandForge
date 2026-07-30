import { lazy } from 'react';

export const publicRoutes = [
  { path: '/', element: lazy(() => import('../pages/HomePage')) },
  { path: '/services', element: lazy(() => import('../pages/ServicesPage')) },
  { path: '/about', element: lazy(() => import('../pages/AboutPage')) },
  { path: '/team', element: lazy(() => import('../pages/TeamPage')) },
  { path: '/testimonials', element: lazy(() => import('../pages/TestimonialsPage')) },
  { path: '/blog', element: lazy(() => import('../pages/BlogPage')) },
  { path: '/contact', element: lazy(() => import('../pages/ContactPage')) },
  { path: '/faq', element: lazy(() => import('../pages/FAQPage')) },
  { path: '/products', element: lazy(() => import('../pages/ProductsPage')) },
  { path: '/products/:id', element: lazy(() => import('../pages/ProductDetailPage')) },
  { path: '/products/:id/mockup', element: lazy(() => import('../pages/MockupPreviewPage')) },
  { path: '/cart', element: lazy(() => import('../pages/CartPage')) },
  { path: '/checkout', element: lazy(() => import('../pages/CheckoutPage')) },
  { path: '/ai-assistant', element: lazy(() => import('../pages/AIAssistantPage')) },
  { path: '/artwork-upload', element: lazy(() => import('../pages/ArtworkUploadPage')) },
  { path: '/subscriptions', element: lazy(() => import('../pages/SubscriptionsPage')) },
  { path: '/address-book', element: lazy(() => import('../pages/AddressBookPage')) },
  { path: '/login', element: lazy(() => import('../pages/LoginPage')) },
  { path: '/register', element: lazy(() => import('../pages/RegisterPage')) },
  { path: '/track', element: lazy(() => import('../pages/OrderTrackingPage')) },
  { path: '/order/:orderCode', element: lazy(() => import('../pages/OrderDetailPage')) },
  { path: '/reviews', element: lazy(() => import('../pages/ReviewsPage')) },
];

export const protectedRoutes = [
  { path: '/orders', element: lazy(() => import('../pages/OrdersPage')) },
  { path: '/profile', element: lazy(() => import('../pages/ProfilePage')) },
  { path: '/notifications', element: lazy(() => import('../pages/NotificationsPage')) },
];

export const adminRoutes = [
  { path: '', element: lazy(() => import('../pages/admin/DashboardPage')), index: true },
  { path: 'products', element: lazy(() => import('../pages/admin/ProductsPage')) },
  { path: 'orders', element: lazy(() => import('../pages/admin/OrdersPage')) },
  { path: 'customers', element: lazy(() => import('../pages/admin/CustomersPage')) },
  { path: 'pricing', element: lazy(() => import('../pages/admin/PricingPage')) },
  { path: 'production', element: lazy(() => import('../pages/admin/ProductionDashboard')), index: false },
  { path: 'inventory', element: lazy(() => import('../pages/admin/InventoryPage')), index: false },
  { path: 'delivery', element: lazy(() => import('../pages/admin/DeliveryManagementPage')), index: false },
  { path: 'invoices', element: lazy(() => import('../pages/admin/InvoicePage')), index: false },
  { path: 'blog', element: lazy(() => import('../pages/admin/BlogAdminPage')), index: false },
  { path: 'finance', element: lazy(() => import('../pages/admin/FinancialReportsPage')) },
  { path: 'notifications', element: lazy(() => import('../pages/admin/AdminNotificationsPage')) },
];
