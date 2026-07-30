import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { AdminNotificationProvider } from './context/AdminNotificationContext';
import Layout from './components/layout/Layout';
import AdminLayout from './pages/admin/AdminLayout';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import { publicRoutes, protectedRoutes, adminRoutes } from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <CartProvider>
              <SubscriptionProvider>
                <ErrorBoundary>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                    <Routes>
                      <Route element={<Layout />}>
                        {publicRoutes.map((route) => (
                          <Route key={route.path} path={route.path} element={<route.element />} />
                        ))}
                        {protectedRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path}
                            element={
                              <ProtectedRoute>
                                <route.element />
                              </ProtectedRoute>
                            }
                          />
                        ))}
                      </Route>

                      <Route
                        path="/admin"
                        element={
                          <AdminNotificationProvider>
                            <AdminRoute>
                              <AdminLayout />
                            </AdminRoute>
                          </AdminNotificationProvider>
                        }
                      >
                        {adminRoutes.map((route) => (
                          <Route
                            key={route.path}
                            index={route.index}
                            path={route.path}
                            element={<route.element />}
                          />
                        ))}
                      </Route>

                      <Route path="*" element={<div className="min-h-screen flex items-center justify-center">404 - Page Not Found</div>} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </SubscriptionProvider>
            </CartProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
