import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/products';
import { useCart } from '../context/CartContext';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ErrorMessage from '../components/loading/ErrorMessage';
import type { Product } from '../types';

const printingPositionLabels: Record<string, string> = {
  front: 'Front',
  back: 'Back',
  left_chest: 'Left Chest',
  right_chest: 'Right Chest',
};

const positionFilters: Record<string, string> = {
  front: 'hue-rotate(0deg) brightness(1)',
  back: 'hue-rotate(180deg) brightness(1.1)',
  left_chest: 'hue-rotate(45deg) brightness(1.05)',
  right_chest: 'hue-rotate(-45deg) brightness(1.05)',
};

export default function MockupPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('front');
  const [mockupGenerated, setMockupGenerated] = useState(false);
  const [mockupLoading, setMockupLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
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

  const productColors = product?.availableColors ?? [];
  const productSizes = product?.availableSizes ?? [];

  const handleGenerateMockup = () => {
    if (!product) return;
    setMockupLoading(true);
    setMockupGenerated(false);
    setTimeout(() => {
      setMockupLoading(false);
      setMockupGenerated(true);
    }, 2000);
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (productColors.length && !selectedColor) {
      alert('Please select a color');
      return;
    }
    if (productSizes.length && !selectedSize) {
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
      printingOption: selectedPosition || undefined,
      designUrl: undefined,
      unitPrice: product.basePrice,
    });
    alert('Added to cart!');
  };

  const currentFilter = positionFilters[selectedPosition] || 'hue-rotate(0deg) brightness(1)';
  const colorTint = selectedColor
    ? { filter: currentFilter, backgroundColor: selectedColor.toLowerCase() === 'white' ? 'transparent' : selectedColor, backgroundBlendMode: 'multiply' as const }
    : { filter: currentFilter };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><ErrorMessage message={error} onRetry={() => window.location.reload()} /></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <SectionErrorBoundary sectionName="Mockup Preview">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Link to={`/products/${id}`} className="text-blue-accent hover:underline mb-4 inline-block">&larr; Back to Product</Link>
          <h1 className="text-3xl font-bold text-dark-blue-primary mt-2">Mockup Preview</h1>
          <p className="text-gray-600 mt-1">{product.name}</p>

          <div className="grid md:grid-cols-2 gap-12 items-start mt-8">
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100" style={{ minHeight: '400px' }}>
                {mockupGenerated ? (
                  <img src={product.imageUrl} alt={`${product.name} mockup`} className="w-full object-cover h-96" style={colorTint} />
                ) : (
                  <img src={product.imageUrl} alt={product.name} className="w-full object-cover h-96" />
                )}
                {mockupLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="text-white text-center">
                      <LoadingSpinner />
                      <p className="mt-3 text-sm font-medium">Generating mockup...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold text-blue-accent mt-2">FCFA{product.basePrice.toLocaleString()}</p>
              <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

              {productColors.length > 0 && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Color</label>
                  <div className="flex gap-3 flex-wrap">
                    {productColors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-md border-2 ${selectedColor === color ? 'border-blue-accent bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {productSizes.length > 0 && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Size</label>
                  <div className="flex gap-3 flex-wrap">
                    {productSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-md border-2 ${selectedSize === size ? 'border-blue-accent bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Printing Position</label>
                <div className="flex gap-3 flex-wrap">
                  {Object.entries(printingPositionLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPosition(key)}
                      className={`px-4 py-2 rounded-md border-2 ${selectedPosition === key ? 'border-blue-accent bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-24 border border-gray-300 rounded-md px-4 py-2"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleGenerateMockup}
                  disabled={mockupLoading}
                  className="bg-blue-accent text-dark-blue-primary px-8 py-3 rounded-md font-semibold hover:bg-blue-400 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mockupLoading ? 'Generating...' : 'Generate Mockup'}
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-dark-blue-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-900 transition"
                >
                  Add to Cart
                </button>
              </div>

              {mockupGenerated && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-700 font-medium">Mockup generated successfully!</p>
                  <p className="text-xs text-green-600 mt-1">Position: {printingPositionLabels[selectedPosition]} | Color: {selectedColor || 'None'} | Size: {selectedSize || 'None'}</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600"><strong>Need help?</strong> Use our <Link to="/ai-assistant" className="text-blue-accent hover:underline">AI Design Assistant</Link> to optimize your artwork before ordering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}