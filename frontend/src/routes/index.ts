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
  { path: '/login', element: lazy(() => import('../pages/LoginPage')) },
  { path: '/register', element: lazy(() => import('../pages/RegisterPage')) },
  { path: '/track', element: lazy(() => import('../pages/OrderTrackingPage')) },
];

export const protectedRoutes = [
  { path: '/orders', element: lazy(() => import('../pages/OrdersPage')) },
];

export const adminRoutes = [
  { path: '', element: lazy(() => import('../pages/admin/DashboardPage')), index: true },
  { path: 'products', element: lazy(() => import('../pages/admin/ProductsPage')) },
  { path: 'orders', element: lazy(() => import('../pages/admin/OrdersPage')) },
];
