import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import SecondaryNavbar from './SecondaryNavbar.tsx';
import Footer from './Footer.tsx';
import { useApp } from '../../context/AppContext.tsx';
import ConfirmModal from '../modals/ConfirmModal.tsx';
import FloatingAIButton from '../FloatingAIButton.tsx';
import FloatingAdminButton from '../FloatingAdminButton.tsx';

const Layout: React.FC = () => {
  const { notifications, modal, hideModal } = useApp();

  const handleModalConfirm = () => {
    modal.onConfirm?.();
    hideModal();
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <SecondaryNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingAIButton />
      <FloatingAdminButton />
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-pulse ${
                notification.type === 'success' ? 'bg-green-500' :
                notification.type === 'error' ? 'bg-red-500' :
                notification.type === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        isOpen={modal.isOpen}
        onClose={hideModal}
        onConfirm={handleModalConfirm}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        confirmText={modal.confirmText}
      />
    </div>
  );
};

export default Layout;
