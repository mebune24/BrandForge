import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, X, Check, CheckCheck, Trash2, ExternalLink } from 'lucide-react';
import { useAdminNotifications, type AdminNotificationType } from '../../context/AdminNotificationContext';

const typeConfig: Record<AdminNotificationType, { label: string; color: string; bg: string; border: string }> = {
  order_update: { label: 'Order Update', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  product_update: { label: 'Product Update', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  customer_action: { label: 'Customer Action', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  payment: { label: 'Payment', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  system: { label: 'System', color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' },
  inventory: { label: 'Inventory', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  delivery: { label: 'Delivery', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
};

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function AdminBellIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useAdminNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const recentNotifications = notifications.slice(0, 10);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-dark-blue-primary transition rounded-lg hover:bg-gray-100"
        title="Notifications"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-dark-blue-primary">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500">{unreadCount} unread</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1.5 text-gray-400 hover:text-blue-accent transition rounded-lg hover:bg-gray-50"
                  title="Mark all as read"
                >
                  <CheckCheck size={16} />
                </button>
              )}
              <button
                onClick={clearAll}
                className="p-1.5 text-gray-400 hover:text-red-600 transition rounded-lg hover:bg-gray-50"
                title="Clear all"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition rounded-lg hover:bg-gray-50"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {recentNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No notifications yet</p>
                <p className="text-xs text-gray-400 mt-1">Actions and updates will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentNotifications.map((notification) => {
                  const config = typeConfig[notification.type];
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition cursor-pointer ${!notification.read ? 'bg-blue-50/50' : ''}`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${config.bg} ${config.color} flex items-center justify-center`}>
                          <span className="text-sm font-bold uppercase">{notification.type.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-semibold ${config.color} uppercase tracking-wider`}>
                                  {config.label}
                                </span>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-accent rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-dark-blue-primary font-medium'}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {formatTimeAgo(notification.timestamp)}
                              </p>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="p-1 text-gray-400 hover:text-blue-accent transition flex-shrink-0"
                                title="Mark as read"
                              >
                                <Check size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {recentNotifications.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <Link
                to="/admin/notifications"
                className="flex items-center justify-center gap-1 text-sm text-blue-accent hover:text-blue-600 font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                <span>View all notifications</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
