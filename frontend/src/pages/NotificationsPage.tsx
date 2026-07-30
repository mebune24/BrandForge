import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';
import { useAuth } from '../context/AuthContext';

const STORAGE_KEY = 'brandforge_notifications';

interface Notification {
  id: string;
  message: string;
  type: 'order_update' | 'promotion' | 'system';
  read: boolean;
  timestamp: string;
}

const defaultNotifications: Omit<Notification, 'id' | 'timestamp'>[] = [
  { message: 'Welcome to BrandForge! Explore our latest collections and special offers.', type: 'system', read: false },
  { message: 'Your order #BF-2026-001 has been shipped and is on its way!', type: 'order_update', read: false },
  { message: 'Exclusive 15% discount on all corporate branding packages this week.', type: 'promotion', read: false },
  { message: 'Your design file was successfully uploaded and is ready for production.', type: 'order_update', read: true },
  { message: 'New summer collection is now live. Check out the latest trends.', type: 'promotion', read: true },
];

function getNotifications(): Notification[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Notification[];
    }
  } catch {
    // corrupted data, fall through to defaults
  }

  const seeded: Notification[] = defaultNotifications.map((notif, index) => ({
    ...notif,
    id: `default-${index}`,
    timestamp: new Date(Date.now() - index * 3600000).toISOString(),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveNotifications(notifications: Notification[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

const notificationIcons: Record<Notification['type'], { icon: string; color: string; bg: string }> = {
  order_update: { icon: '📦', color: 'text-blue-600', bg: 'bg-blue-50' },
  promotion: { icon: '🏷️', color: 'text-green-600', bg: 'bg-green-50' },
  system: { icon: '⚙️', color: 'text-gray-600', bg: 'bg-gray-100' },
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(() => getNotifications());

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const sortedNotifications = useMemo(
    () =>
      [...notifications].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [notifications]
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SectionErrorBoundary sectionName="Notifications">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Notifications</span>
              <h1 className="text-4xl font-bold text-dark-blue-primary mt-2">Your Notifications</h1>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {unreadCount} unread
                </span>
              )}
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="bg-blue-accent text-dark-blue-primary px-4 py-2 rounded-md font-semibold hover:bg-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark all as read
              </button>
            </div>
          </div>

          {sortedNotifications.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg">You have no notifications.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNotifications.map(notification => {
                const iconConfig = notificationIcons[notification.type];
                return (
                  <div
                    key={notification.id}
                    className={`flex gap-4 p-5 rounded-xl border transition-colors ${
                      notification.read ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-accent/30'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${iconConfig.bg} ${iconConfig.color} flex items-center justify-center text-2xl`}>
                      {iconConfig.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-dark-blue-primary font-medium'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-accent font-semibold hover:underline flex-shrink-0"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
