import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSubscription } from '../context/SubscriptionContext';
import { simulatedApi } from '../utils/simulatedApi';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import type { Address } from '../types';

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { selectedPlan, setSelectedPlan } = useSubscription();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>(() => simulatedApi.addresses.getAll());
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [newAddress, setNewAddress] = useState({ label: '', fullName: '', phone: '', street: '', city: '', region: '', country: 'Cameroon' });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mobile_money');
  const [processing, setProcessing] = useState(false);

  const isSubscriptionCheckout = !!selectedPlan;

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.fullName || !newAddress.phone || !newAddress.street || !newAddress.city || !newAddress.region) {
      alert('Please fill all address fields');
      return;
    }
    const addr = simulatedApi.addresses.add({ ...newAddress, isDefault: addresses.length === 0 });
    setAddresses(prev => [...prev, addr]);
    setSelectedAddressId(addr._id!);
    setShowAddressForm(false);
    setNewAddress({ label: '', fullName: '', phone: '', street: '', city: '', region: '', country: 'Cameroon' });
  };

  const handlePayment = () => {
    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const orderCode = 'BF-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      const address = addresses.find(a => a._id === selectedAddressId);
      const order = {
        _id: Date.now().toString(),
        orderCode,
        customer: 'guest',
        items: isSubscriptionCheckout ? [{
          product: selectedPlan.id,
          productName: selectedPlan.name + ' Subscription',
          quantity: 1,
          unitPrice: selectedPlan.price,
        }] : items.map(i => ({
          product: i.productId,
          productName: i.productName,
          quantity: i.quantity,
          color: i.color,
          size: i.size,
          printingOption: i.printingOption,
          designUrl: i.designUrl,
          unitPrice: i.unitPrice,
        })),
        totalAmount: isSubscriptionCheckout ? selectedPlan.price : cartTotal,
        status: 'paid' as const,
        deliveryAddress: address ? `${address.street}, ${address.city}, ${address.region}, ${address.country}` : 'N/A',
        paymentReference: paymentMethod === 'mobile_money' ? `MM-${Date.now()}` : `CARD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const allOrders = JSON.parse(localStorage.getItem('brandforge_simulated_orders') || '[]');
      allOrders.unshift(order);
      localStorage.setItem('brandforge_simulated_orders', JSON.stringify(allOrders));
      clearCart();
      setSelectedPlan(null);
      setProcessing(false);
      navigate(`/order/${orderCode}`);
    }, 2000);
  };

  if (!isSubscriptionCheckout && items.length === 0) {
    return (
      <SectionErrorBoundary sectionName="Checkout">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-dark-blue-primary mb-4">Checkout</h1>
            <p className="text-gray-600 mb-8">Your cart is empty.</p>
            <Link to="/products" className="bg-blue-accent text-dark-blue-primary px-8 py-3 rounded-md font-semibold hover:bg-blue-400 transition">Browse Products</Link>
          </div>
        </section>
      </SectionErrorBoundary>
    );
  }

  return (
    <SectionErrorBoundary sectionName="Checkout">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-dark-blue-primary mb-8">Checkout</h1>
          {isSubscriptionCheckout && (
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h2 className="text-2xl font-bold text-dark-blue-primary mb-2">Subscription Plan</h2>
              <p className="text-xl font-semibold text-blue-accent">{selectedPlan.name}</p>
              <p className="text-gray-600">FCFA{selectedPlan.price.toLocaleString()} / {selectedPlan.period === 'monthly' ? 'month' : 'year'}</p>
              <ul className="mt-4 space-y-2">
                {selectedPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
              {addresses.length > 0 && (
                <div className="space-y-3 mb-4">
                  {addresses.map(addr => (
                    <label key={addr._id} className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer ${selectedAddressId === addr._id ? 'border-blue-accent bg-blue-50' : 'border-gray-200'}`}>
                      <input type="radio" name="address" value={addr._id} checked={selectedAddressId === addr._id} onChange={() => setSelectedAddressId(addr._id!)} className="mt-1" />
                      <div>
                        <p className="font-semibold">{addr.label}</p>
                        <p className="text-sm text-gray-600">{addr.fullName}, {addr.phone}</p>
                        <p className="text-sm text-gray-600">{addr.street}, {addr.city}, {addr.region}, {addr.country}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              <button onClick={() => setShowAddressForm(!showAddressForm)} className="text-blue-accent font-semibold hover:underline mb-4">
                {showAddressForm ? 'Cancel' : '+ Add New Address'}
              </button>
              {showAddressForm && (
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                  <input value={newAddress.label} onChange={e => setNewAddress({ ...newAddress, label: e.target.value })} placeholder="Label (e.g. Office)" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                  <input value={newAddress.fullName} onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })} placeholder="Full Name" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                  <input value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} placeholder="Phone" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                  <input value={newAddress.street} onChange={e => setNewAddress({ ...newAddress, street: e.target.value })} placeholder="Street" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                  <div className="grid grid-cols-2 gap-3">
                    <input value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} placeholder="City" className="border border-gray-300 rounded-md px-3 py-2" />
                    <input value={newAddress.region} onChange={e => setNewAddress({ ...newAddress, region: e.target.value })} placeholder="Region" className="border border-gray-300 rounded-md px-3 py-2" />
                  </div>
                  <button onClick={handleAddAddress} className="bg-blue-accent text-dark-blue-primary px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition">Save Address</button>
                </div>
              )}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {['mobile_money', 'credit_card', 'bank_transfer'].map(method => (
                    <label key={method} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer ${paymentMethod === method ? 'border-blue-accent bg-blue-50' : 'border-gray-200'}`}>
                      <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={e => setPaymentMethod(e.target.value)} />
                      <span className="font-semibold capitalize">{method.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                {isSubscriptionCheckout ? (
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{selectedPlan.name}</p>
                      <p className="text-sm text-gray-500">{selectedPlan.period === 'monthly' ? 'Monthly' : 'Yearly'} Subscription</p>
                    </div>
                    <p className="font-semibold">FCFA{selectedPlan.price.toLocaleString()}</p>
                  </div>
                ) : (
                  items.map(item => (
                    <div key={`${item.productId}-${item.color}-${item.size}`} className="flex justify-between">
                      <div>
                        <p className="font-semibold">{item.productName}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">FCFA{(item.unitPrice * item.quantity).toLocaleString()}</p>
                    </div>
                  ))
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>FCFA{(isSubscriptionCheckout ? selectedPlan.price : cartTotal).toLocaleString()}</span>
                </div>
              </div>
              <button onClick={handlePayment} disabled={processing} className="mt-6 w-full bg-dark-blue-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-900 transition disabled:opacity-50">
                {processing ? 'Processing...' : isSubscriptionCheckout ? 'Subscribe Now' : 'Place Order'}
              </button>
              {processing && <LoadingSpinner />}
            </div>
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
