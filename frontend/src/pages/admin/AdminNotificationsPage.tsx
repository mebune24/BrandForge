import { useState, useMemo } from 'react';
import { SectionErrorBoundary } from '../../components/error-boundary/SectionErrorBoundary';
import { useAdminNotifications, type AdminNotificationType } from '../../context/AdminNotificationContext';
import { Bell, Check, CheckCheck, Trash2, Filter, X } from 'lucide-react';
import { ADMIN_NOTIFICATION_TYPES } from '../../utils/notificationConfig';

export default function AdminNotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, deleteNotification } = useAdminNotifications();
  const [filter, setFilter] = useState<AdminNotificationType | 'all'>('all');

  const filteredNotifications = useMemo(() => {
    if (filter === 'all') return notifications;
    return notifications.filter(n => n.type === filter);
  }, [notifications, filter]);

  const sortedNotifications = useMemo(
    () =>
      [...filteredNotifications].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [filteredNotifications]
  );

  return (
    <SectionErrorBoundary sectionName="Admin Notifications">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-dark-blue-primary">Notifications</h1>
            <p className="text-sm text-gray-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-blue-accent text-dark-blue-primary rounded-lg font-semibold hover:bg-blue-400 transition text-sm"
              >
                <CheckCheck size={16} />
                <span>Mark all read</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition text-sm"
              >
                <Trash2 size={16} />
                <span>Clear all</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter size={16} className="text-gray-400 flex-shrink-0" />
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  filter === 'all'
                    ? 'bg-dark-blue-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All
              </button>
              {(Object.keys(ADMIN_NOTIFICATION_TYPES) as AdminNotificationType[]).map(type => {
                const config = ADMIN_NOTIFICATION_TYPES[type];
                return (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                      filter === type
                        ? `${config.bg} ${config.color} border ${config.border}`
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {sortedNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No notifications</h3>
              <p className="text-sm text-gray-400">
                {filter === 'all'
                  ? 'You have no notifications yet.'
                  : `No ${ADMIN_NOTIFICATION_TYPES[filter as AdminNotificationType]?.label.toLowerCase()} notifications.`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sortedNotifications.map((notification) => {
                const config = ADMIN_NOTIFICATION_TYPES[notification.type];
                return (
                  <div
                    key={notification.id}
                    className={`p-5 hover:bg-gray-50 transition ${!notification.read ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${config.bg} ${config.color} flex items-center justify-center`}>
                        <span className="text-lg font-bold uppercase">{notification.type.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
                                {config.label}
                              </span>
                              {!notification.read && (
                                <span className="px-2 py-0.5 bg-blue-accent text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                  New
                                </span>
                              )}
                            </div>
                            <p className={`text-sm mt-2 ${notification.read ? 'text-gray-600' : 'text-dark-blue-primary font-medium'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(notification.timestamp).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-2 text-gray-400 hover:text-blue-accent transition rounded-lg hover:bg-gray-100"
                                title="Mark as read"
                              >
                                <Check size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition rounded-lg hover:bg-gray-100"
                              title="Delete"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </SectionErrorBoundary>
  );
}
