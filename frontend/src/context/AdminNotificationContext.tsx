/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback, createContext, useContext, type ReactNode } from 'react';

export type AdminNotificationType = 'order_update' | 'product_update' | 'customer_action' | 'payment' | 'system' | 'inventory' | 'delivery';

export interface AdminNotification {
  id: string;
  message: string;
  type: AdminNotificationType;
  read: boolean;
  timestamp: string;
  action?: string;
}

const STORAGE_KEY = 'brandforge_admin_notifications';

function getAdminNotifications(): AdminNotification[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as AdminNotification[];
    }
  } catch {
    // corrupted data, fall through to empty
  }
  return [];
}

function saveAdminNotifications(notifications: AdminNotification[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

interface AdminNotificationContextType {
  notifications: AdminNotification[];
  unreadCount: number;
  addNotification: (message: string, type?: AdminNotificationType, action?: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  deleteNotification: (id: string) => void;
}

const AdminNotificationContext = createContext<AdminNotificationContextType | undefined>(undefined);

export function AdminNotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AdminNotification[]>(() => getAdminNotifications());

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((message: string, type: AdminNotificationType = 'system', action?: string) => {
    const newNotification: AdminNotification = {
      id: `admin-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      message,
      type,
      read: false,
      timestamp: new Date().toISOString(),
      action,
    };
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      saveAdminNotifications(updated);
      return updated;
    });
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => (n.id === id ? { ...n, read: true } : n));
      saveAdminNotifications(updated);
      return updated;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      saveAdminNotifications(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    saveAdminNotifications([]);
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      saveAdminNotifications(updated);
      return updated;
    });
  }, []);

  return (
    <AdminNotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearAll, deleteNotification }}>
      {children}
    </AdminNotificationContext.Provider>
  );
}

export function useAdminNotifications() {
  const context = useContext(AdminNotificationContext);
  if (context === undefined) {
    throw new Error('useAdminNotifications must be used within an AdminNotificationProvider');
  }
  return context;
}
