export const ORDER_STATUSES = [
  { value: 'pending_payment', label: 'Pending Payment', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'paid', label: 'Paid / Ready', color: 'bg-blue-100 text-blue-800' },
  { value: 'in_design', label: 'In Design', color: 'bg-purple-100 text-purple-800' },
  { value: 'in_production', label: 'In Production', color: 'bg-orange-100 text-orange-800' },
  { value: 'quality_check', label: 'Quality Check', color: 'bg-teal-100 text-teal-800' },
  { value: 'packaging', label: 'Packaging', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
] as const;

export type OrderStatus = typeof ORDER_STATUSES[number]['value'];

export function getStatusColor(status: string): string {
  const found = ORDER_STATUSES.find(s => s.value === status);
  return found?.color || 'bg-gray-100 text-gray-800';
}

export function getStatusLabel(status: string): string {
  const found = ORDER_STATUSES.find(s => s.value === status);
  return found?.label || status;
}
