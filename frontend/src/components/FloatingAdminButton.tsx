import { useSimulatedAdmin } from '../hooks/useSimulatedAdmin';
import AdminLoginModal from './AdminLoginModal';
import { Shield } from 'lucide-react';

export default function FloatingAdminButton() {
  const { openAdminLogin, showLoginModal, setShowLoginModal, handleAdminLogin } = useSimulatedAdmin();

  return (
    <>
      <button
        onClick={openAdminLogin}
        className="fixed bottom-6 left-6 z-50 bg-dark-blue-primary text-white p-4 rounded-full shadow-2xl hover:bg-blue-900 transition-all duration-300 hover:scale-110 group"
        title="Admin Access"
      >
        <Shield size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark-blue-primary text-white text-sm px-3 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Admin
        </span>
      </button>
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleAdminLogin}
      />
    </>
  );
}
