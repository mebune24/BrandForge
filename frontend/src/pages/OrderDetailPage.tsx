import { useParams, Link } from 'react-router-dom';
import { getSimulatedOrders } from '../utils/simulatedApi';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';

const statusColors: Record<string, string> = {
  pending_payment: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  in_design: 'bg-purple-100 text-purple-800',
  in_production: 'bg-orange-100 text-orange-800',
  quality_check: 'bg-indigo-100 text-indigo-800',
  packaging: 'bg-pink-100 text-pink-800',
  out_for_delivery: 'bg-teal-100 text-teal-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrderDetailPage() {
  const { orderCode } = useParams<{ orderCode: string }>();
  const order = getSimulatedOrders().find(o => o.orderCode === orderCode);

  if (!order) {
    return (
      <SectionErrorBoundary sectionName="Order Detail">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-dark-blue-primary mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">We could not find an order with code "{orderCode}".</p>
            <Link to="/track" className="bg-blue-accent text-dark-blue-primary px-8 py-3 rounded-md font-semibold hover:bg-blue-400 transition">Track Another Order</Link>
          </div>
        </section>
      </SectionErrorBoundary>
    );
  }

  return (
    <SectionErrorBoundary sectionName="Order Detail">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-dark-blue-primary">Order {order.orderCode}</h1>
              <p className="text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>{order.status.replace('_', ' ')}</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-lg">
                  <div>
                    <p className="font-semibold">{item.productName || item.product}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    {item.printingOption && <p className="text-sm text-gray-500">Print: {item.printingOption}</p>}
                  </div>
                  <p className="font-bold">FCFA{(item.unitPrice * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>FCFA{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
            <p className="text-gray-600">{order.deliveryAddress}</p>
          </div>

          {order.paymentReference && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-2">Payment</h2>
              <p className="text-gray-600">Reference: {order.paymentReference}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Link to="/orders" className="bg-blue-accent text-dark-blue-primary px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition">My Orders</Link>
            <Link to="/products" className="bg-dark-blue-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-900 transition">Order Again</Link>
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
