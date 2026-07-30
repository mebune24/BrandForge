import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { Search, SlidersHorizontal, Grid, List, X, TrendingUp, Sparkles, Sun, DollarSign, Package, Shirt } from 'lucide-react';

const badgeConfig: Record<string, { icon: React.ReactNode; description: string }> = {
  'Best Sellers': { icon: <TrendingUp size={28} className="text-blue-accent" />, description: 'Top selling products' },
  'New Releases': { icon: <Sparkles size={28} className="text-blue-accent" />, description: 'Latest arrivals' },
  'Summer Collection': { icon: <Sun size={28} className="text-blue-accent" />, description: 'Lightweight & breathable' },
  'Corporate Deals': { icon: <DollarSign size={28} className="text-blue-accent" />, description: 'Bulk order discounts' },
};

const ProductsPage: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();
  const [search, setSearch] = useState('');
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedBadge) {
      result = result.filter(p => p.badge === selectedBadge);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    return result;
  }, [products, selectedBadge, search]);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, typeof products> = {};
    filteredProducts.forEach(product => {
      const badge = product.badge || 'Other';
      if (!groups[badge]) groups[badge] = [];
      groups[badge].push(product);
    });
    return groups;
  }, [filteredProducts]);

  const clearFilters = () => {
    setSelectedBadge(null);
    setSearch('');
  };

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Products</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Our Product Catalog</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-accent text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Products</span>
          <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Our Product Catalog</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Browse our selection of high-quality apparel and merchandise ready for customization.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products by name, category, or description..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-accent focus:border-transparent bg-white"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition ${
                  showFilters || selectedBadge ? 'border-blue-accent bg-blue-50 text-blue-accent' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <SlidersHorizontal size={18} />
                <span className="font-semibold">Filters</span>
              </button>
              <div className="flex bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-blue-accent text-white' : 'hover:bg-gray-50'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-blue-accent text-white' : 'hover:bg-gray-50'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {Object.keys(badgeConfig).map(badge => (
                  <button
                    key={badge}
                    onClick={() => setSelectedBadge(selectedBadge === badge ? null : badge)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      selectedBadge === badge
                        ? 'bg-blue-accent text-white'
                        : 'bg-white border border-gray-200 hover:border-blue-accent hover:text-blue-accent'
                    }`}
                  >
                    {badgeConfig[badge].icon} {badge}
                  </button>
                ))}
                {(selectedBadge || search) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {Object.keys(groupedProducts).length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <div className="flex justify-center mb-4">
              <Search size={64} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-dark-blue-primary mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="bg-blue-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedProducts).map(([badge, products]) => (
              <div key={badge}>
                <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-gray-200">
                  <span className="text-3xl">{badgeConfig[badge]?.icon || <Package size={32} className="text-blue-accent" />}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-dark-blue-primary">{badge}</h3>
                    <p className="text-sm text-gray-500">{badgeConfig[badge]?.description || ''}</p>
                  </div>
                </div>
                <div className={viewMode === 'grid' ? 'grid md:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                        viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                      }`}
                    >
                      <Link to={`/products/${product._id}`} className={viewMode === 'list' ? 'md:w-64 flex-shrink-0' : ''}>
                        <div className={`bg-gray-100 flex items-center justify-center overflow-hidden ${
                          viewMode === 'list' ? 'h-48 md:h-full' : 'h-48'
                        }`}>
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <Shirt size={64} className="text-gray-300" />
                          )}
                        </div>
                      </Link>
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/products/${product._id}`}>
                            <h3 className="text-dark-blue-primary text-lg font-semibold hover:text-blue-accent transition">{product.name}</h3>
                          </Link>
                          <span className="bg-blue-accent/10 text-blue-accent px-2 py-1 rounded text-xs font-semibold capitalize">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description || 'Premium quality product ready for customization.'}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.availableColors.slice(0, 4).map(color => (
                            <span key={color} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{color}</span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-dark-blue-primary">FCFA{product.basePrice.toLocaleString()}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const defaultColor = product.availableColors[0] || '';
                                const defaultSize = product.availableSizes[0] || '';
                                addItem({
                                  productId: product._id,
                                  productName: product.name,
                                  productImage: product.imageUrl,
                                  basePrice: product.basePrice,
                                  quantity: 1,
                                  color: defaultColor || undefined,
                                  size: defaultSize || undefined,
                                  printingOption: product.printingOptions[0] || undefined,
                                  unitPrice: product.basePrice,
                                });
                              }}
                              className="bg-gray-100 text-dark-blue-primary px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                            >
                              Add to Cart
                            </button>
                            <Link
                              to={`/products/${product._id}`}
                              className="bg-dark-blue-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark-blue-secondary transition"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;