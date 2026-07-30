import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuth.ts';

interface StaffRouteProps {
  children: React.ReactNode;
}

const StaffRoute: React.FC<StaffRouteProps> = ({ children }) => {
  const { isAuthenticated, isStaff, isLoading } = useAuthStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-accent"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isStaff) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default StaffRoute;
