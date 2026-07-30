import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/products';
import { useCart } from '../context/CartContext';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ErrorMessage from '../components/loading/ErrorMessage';
import type { Product } from '../types';

const printingOptionLabels: Record<string, string> = {
  screen_printing: 'Screen Printing',
  heat_transfer: 'Heat Transfer',
  sublimation: 'Sublimation',
  dtf: 'DTF Printing',
  vinyl: 'Vinyl Printing',
  embroidery: 'Embroidery',
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPrint, setSelectedPrint] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [designUrl, setDesignUrl] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError('');
    getProductById(id)
      .then(setProduct)
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.availableColors.length && !selectedColor) {
      alert('Please select a color');
      return;
    }
    if (product.availableSizes.length && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addItem({
      productId: product._id,
      productName: product.name,
      productImage: product.imageUrl,
      basePrice: product.basePrice,
      quantity,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      printingOption: selectedPrint || undefined,
      designUrl: designUrl || undefined,
      unitPrice: product.basePrice,
    });
    alert('Added to cart!');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><ErrorMessage message={error} onRetry={() => window.location.reload()} /></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <SectionErrorBoundary sectionName="Product Detail">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/products" className="text-blue-accent hover:underline mb-4 inline-block">&larr; Back to Products</Link>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <img src={product.imageUrl} alt={product.name} className="w-full rounded-2xl shadow-lg object-cover h-96" />
            </div>
            <div>
              <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">{product.category.replace('_', ' ')}</span>
              <h1 className="text-4xl font-bold text-dark-blue-primary mt-2">{product.name}</h1>
              <p className="text-3xl font-bold text-blue-accent mt-4">FCFA{product.basePrice.toLocaleString()}</p>
              <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

              {product.availableColors.length > 0 && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Color</label>
                  <div className="flex gap-3">
                    {product.availableColors.map(color => (
                      <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 rounded-md border-2 ${selectedColor === color ? 'border-blue-accent bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.availableSizes.length > 0 && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Size</label>
                  <div className="flex gap-3">
                    {product.availableSizes.map(size => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded-md border-2 ${selectedSize === size ? 'border-blue-accent bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.printingOptions.length > 0 && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Printing Option</label>
                  <select value={selectedPrint} onChange={e => setSelectedPrint(e.target.value)} className="w-full md:w-auto border border-gray-300 rounded-md px-4 py-2">
                    <option value="">Select printing option</option>
                    {product.printingOptions.map(opt => (
                      <option key={opt} value={opt}>{printingOptionLabels[opt] || opt}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-6">
                <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Quantity</label>
                <input type="number" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} className="w-24 border border-gray-300 rounded-md px-4 py-2" />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Design URL (optional)</label>
                <input type="url" value={designUrl} onChange={e => setDesignUrl(e.target.value)} placeholder="https://example.com/logo.png" className="w-full md:w-auto border border-gray-300 rounded-md px-4 py-2" />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={handleAddToCart} className="bg-blue-accent text-dark-blue-primary px-8 py-3 rounded-md font-semibold hover:bg-blue-400 transition shadow-lg">
                  Add to Cart
                </button>
                <Link to="/checkout" className="bg-dark-blue-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-900 transition">
                  Buy Now
                </Link>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600"><strong>Need help?</strong> Use our <Link to="/ai-assistant" className="text-blue-accent hover:underline">AI Design Assistant</Link> to optimize your artwork before ordering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
