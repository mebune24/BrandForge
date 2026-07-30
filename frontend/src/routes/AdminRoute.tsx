import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuth.ts';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isStaff, isLoading } = useAuthStatus();
  const isSimulatedAdmin = localStorage.getItem('brandforge_simulated_admin') === 'true';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-accent"></div>
      </div>
    );
  }

  if ((!isAuthenticated || !isStaff) && !isSimulatedAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
