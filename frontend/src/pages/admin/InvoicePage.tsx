import { useState } from 'react';
import { simulatedApi } from '../../services/simulatedApi';
import { SectionErrorBoundary } from '../../components/error-boundary/SectionErrorBoundary';
import type { Order } from '../../types';

export default function InvoicePage() {
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [invoice, setInvoice] = useState<Order | null>(null);

  const orders = simulatedApi.orders.getAll();

  const handleGenerate = () => {
    const order = orders.find(o => o._id === selectedOrderId);
    setInvoice(order || null);
  };

  return (
    <SectionErrorBoundary sectionName="Invoice Generator">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-dark-blue-primary mb-6">Invoice & Receipt Generator</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Select Order</label>
              <select value={selectedOrderId} onChange={e => setSelectedOrderId(e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2">
                <option value="">-- Select an order --</option>
                {orders.map(order => (
                  <option key={order._id} value={order._id}>{order.orderCode} - FCFA{order.totalAmount.toLocaleString()}</option>
                ))}
              </select>
            </div>
            <button onClick={handleGenerate} className="bg-blue-accent text-dark-blue-primary px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition">Generate Invoice</button>
          </div>
        </div>

        {invoice && (
          <div className="bg-white rounded-xl shadow p-8 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark-blue-primary">BrandForge Technologies</h2>
              <p className="text-gray-600">123 Innovation Drive, Tech City</p>
              <p className="text-gray-600">Tel: +1 (555) 123-4567 | Email: info@brandforgetech.com</p>
            </div>
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Invoice To:</p>
                  <p className="font-semibold">Customer</p>
                  <p className="text-sm text-gray-600">{invoice.deliveryAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Invoice Number:</p>
                  <p className="font-mono font-bold">{invoice.orderCode}</p>
                  <p className="text-sm text-gray-500 mt-2">Date:</p>
                  <p className="text-sm">{new Date(invoice.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <table className="min-w-full mb-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3">{item.productName || item.product}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">FCFA{item.unitPrice.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">FCFA{(item.unitPrice * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${invoice.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{invoice.status.replace('_', ' ')}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-dark-blue-primary">FCFA{invoice.totalAmount.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => window.print()} className="bg-dark-blue-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-900 transition">Print Invoice</button>
            </div>
          </div>
        )}
      </div>
    </SectionErrorBoundary>
  );
}
