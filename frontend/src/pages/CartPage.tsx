import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';

export default function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <SectionErrorBoundary sectionName="Cart">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-dark-blue-primary mb-4">Your Cart</h1>
            <p className="text-gray-600 mb-8">Your cart is empty.</p>
            <Link to="/products" className="bg-blue-accent text-dark-blue-primary px-8 py-3 rounded-md font-semibold hover:bg-blue-400 transition">Browse Products</Link>
          </div>
        </section>
      </SectionErrorBoundary>
    );
  }

  return (
    <SectionErrorBoundary sectionName="Cart">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-dark-blue-primary">Your Cart</h1>
            <button onClick={clearCart} className="text-red-600 hover:underline text-sm">Clear Cart</button>
          </div>
          <div className="space-y-4">
            {items.map(item => (
              <div key={`${item.productId}-${item.color}-${item.size}`} className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center">
                <img src={item.productImage} alt={item.productName} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-semibold text-dark-blue-primary">{item.productName}</h3>
                  <p className="text-sm text-gray-500">{item.color && `Color: ${item.color}`} {item.size && ` | Size: ${item.size}`} {item.printingOption && ` | ${item.printingOption}`}</p>
                  <p className="text-blue-accent font-semibold">FCFA{item.unitPrice.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">-</button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">+</button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-dark-blue-primary">FCFA{(item.unitPrice * item.quantity).toLocaleString()}</p>
                  <button onClick={() => removeItem(item.productId)} className="text-red-600 text-sm hover:underline">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between text-xl font-bold text-dark-blue-primary mb-4">
              <span>Total</span>
              <span>FCFA{cartTotal.toLocaleString()}</span>
            </div>
            <Link to="/checkout" className="block w-full bg-blue-accent text-dark-blue-primary text-center px-8 py-3 rounded-md font-semibold hover:bg-blue-400 transition shadow-lg">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
