import { Package, Clock, CheckCircle, Truck, PenTool, Settings, Warehouse, Send } from 'lucide-react';

export const PRODUCTION_STAGES = [
  { key: 'pending_payment', label: 'Pending Payment', icon: Clock, color: 'bg-yellow-50 border-yellow-200' },
  { key: 'paid', label: 'Paid / Ready', icon: CheckCircle, color: 'bg-green-50 border-green-200' },
  { key: 'in_design', label: 'In Design', icon: PenTool, color: 'bg-purple-50 border-purple-200' },
  { key: 'in_production', label: 'In Production', icon: Settings, color: 'bg-blue-50 border-blue-200' },
  { key: 'quality_check', label: 'Quality Check', icon: Package, color: 'bg-orange-50 border-orange-200' },
  { key: 'packaging', label: 'Packaging', icon: Warehouse, color: 'bg-indigo-50 border-indigo-200' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, color: 'bg-cyan-50 border-cyan-200' },
  { key: 'delivered', label: 'Delivered', icon: Send, color: 'bg-emerald-50 border-emerald-200' },
] as const;

export type ProductionStageKey = typeof PRODUCTION_STAGES[number]['key'];

export function getStageLabel(key: ProductionStageKey): string {
  const stage = PRODUCTION_STAGES.find(s => s.key === key);
  return stage?.label || key;
}

export { getStageLabel as getStatusLabel };
