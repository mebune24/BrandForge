import { useAuth } from '../context/AuthContext';

export function useAuthStatus() {
  const { user, isAuthenticated, isLoading } = useAuth();
  return { user, isAuthenticated, isLoading, isAdmin: user?.role === 'admin', isStaff: user?.role === 'admin' || user?.role === 'staff' };
}
