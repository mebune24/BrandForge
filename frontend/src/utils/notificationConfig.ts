import type { AdminNotificationType } from '../context/AdminNotificationContext';

export const ADMIN_NOTIFICATION_TYPES: Record<AdminNotificationType, { label: string; color: string; bg: string; border: string }> = {
  order_update: { label: 'Order Update', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  product_update: { label: 'Product Update', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  customer_action: { label: 'Customer Action', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  payment: { label: 'Payment', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  system: { label: 'System', color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' },
  inventory: { label: 'Inventory', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  delivery: { label: 'Delivery', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
};
