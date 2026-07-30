import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
}

export default function AdminLoginModal({ isOpen, onClose, onLogin }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(password);
    if (!success) {
      setError('Invalid admin password');
    }
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-dark-blue-primary rounded-full flex items-center justify-center">
            <Shield size={32} className="text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-dark-blue-primary text-center mb-2">Admin Access</h2>
        <p className="text-gray-600 text-center mb-6">Enter the admin password to access the dashboard.</p>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6">
          <p className="text-xs text-blue-800 text-center">
            <strong>Demo Password:</strong> admin123
          </p>
        </div>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-dark-blue-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition">
              Login
            </button>
            <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
