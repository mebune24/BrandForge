import { useState, useEffect } from 'react';
import { getSimulatedOrders } from '../../utils/simulatedApi';
import { useAdminNotifications } from '../../context/AdminNotificationContext';
import { PRODUCTION_STAGES } from '../../utils/orderStages';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import type { Order } from '../../types';
import { ChevronRight, ChevronLeft, Package } from 'lucide-react';

export default function ProductionDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [scrollPosition, setScrollPosition] = useState(0);
  const { addNotification } = useAdminNotifications();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getSimulatedOrders());
    setLoading(false);
  }, []);

  const moveOrder = (orderId: string, newStatus: string) => {
    const allOrders = JSON.parse(localStorage.getItem('brandforge_simulated_orders') || '[]') as Order[];
    const idx = allOrders.findIndex((o: Order) => o._id === orderId);
    if (idx !== -1) {
      const order = allOrders[idx];
      allOrders[idx].status = newStatus as Order['status'];
      localStorage.setItem('brandforge_simulated_orders', JSON.stringify(allOrders));
      setOrders([...allOrders]);
      const stageLabel = PRODUCTION_STAGES.find(s => s.key === newStatus)?.label || newStatus;
      addNotification(
        `Order ${order.orderCode} moved to ${stageLabel}`,
        'order_update',
        `order:${orderId}`
      );
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter((o: Order) => o.status === filter);

  const scrollBoard = (direction: 'left' | 'right') => {
    const board = document.getElementById('kanban-board');
    if (board) {
      const scrollAmount = 320;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      board.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-blue-primary">Production Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage order production PRODUCTION_STAGES</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-accent focus:border-transparent"
          >
            <option value="all">All Stages</option>
            {PRODUCTION_STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth" id="kanban-board" style={{ scrollbarWidth: 'thin' }}>
          {PRODUCTION_STAGES.map((stage) => {
            const stageOrders = filteredOrders.filter((o: Order) => o.status === stage.key);
            const currentStageIndex = PRODUCTION_STAGES.findIndex(s => s.key === stage.key);

            return (
              <div key={stage.key} className="flex-shrink-0 w-72">
                <div className={`rounded-xl border-2 ${stage.color} p-4 h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <stage.icon size={18} className="text-gray-600" />
                      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{stage.label}</h3>
                    </div>
                    <span className="bg-white text-gray-600 text-xs font-bold px-2 py-1 rounded-full border border-gray-200">
                      {stageOrders.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {stageOrders.length === 0 ? (
                      <div className="bg-white/60 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
                        <Package size={32} className="text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-400">No orders in this stage</p>
                      </div>
                    ) : (
                      stageOrders.map((order: Order) => (
                        <div key={order._id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-bold text-sm text-dark-blue-primary font-mono tracking-wide">{order.orderCode}</p>
                          </div>

                          <div className="mb-3">
                            <p className="text-xs text-gray-500">
                              {typeof order.customer === 'string' ? order.customer : order.customer?.name || 'Guest'}
                            </p>
                            {order.items && order.items.length > 0 && (
                              <p className="text-xs text-gray-400 mt-1">
                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <p className="text-sm font-bold text-dark-blue-primary">
                              FCFA{order.totalAmount.toLocaleString()}
                            </p>
                          </div>

                          <div className="mt-3 flex gap-2">
                            {currentStageIndex > 0 && (
                              <button
                                onClick={() => moveOrder(order._id, PRODUCTION_STAGES[currentStageIndex - 1].key)}
                                className="flex-1 text-xs bg-gray-100 text-gray-700 px-2 py-1.5 rounded hover:bg-gray-200 transition flex items-center justify-center gap-1"
                                title={`Move to ${PRODUCTION_STAGES[currentStageIndex - 1].label}`}
                              >
                                <ChevronLeft size={12} />
                                Back
                              </button>
                            )}
                            {currentStageIndex < PRODUCTION_STAGES.length - 1 && (
                              <button
                                onClick={() => moveOrder(order._id, PRODUCTION_STAGES[currentStageIndex + 1].key)}
                                className="flex-1 text-xs bg-blue-accent text-dark-blue-primary px-2 py-1.5 rounded hover:bg-blue-400 transition font-semibold flex items-center justify-center gap-1"
                                title={`Move to ${PRODUCTION_STAGES[currentStageIndex + 1].label}`}
                              >
                                Advance
                                <ChevronRight size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scrollBoard('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition z-10 border border-gray-200"
          title="Scroll left"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <button
          onClick={() => scrollBoard('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition z-10 border border-gray-200"
          title="Scroll right"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
