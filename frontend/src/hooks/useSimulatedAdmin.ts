import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'admin123';

export function useSimulatedAdmin() {
  const [isSimulatedAdmin, setIsSimulatedAdmin] = useState(() => localStorage.getItem('brandforge_simulated_admin') === 'true');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const openAdminLogin = () => {
    setShowLoginModal(true);
  };

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('brandforge_simulated_admin', 'true');
      setIsSimulatedAdmin(true);
      setShowLoginModal(false);
      navigate('/admin');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('brandforge_simulated_admin');
    setIsSimulatedAdmin(false);
    navigate('/');
  };

  return {
    isSimulatedAdmin,
    showLoginModal,
    setShowLoginModal,
    openAdminLogin,
    handleAdminLogin,
    handleAdminLogout,
  };
}
