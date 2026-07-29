import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useAuthStatus } from '../hooks/useAuth';

const ProductsPage: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { isAuthenticated } = useAuthStatus();

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
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-6xl">👕</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-dark-blue-primary text-lg font-semibold">{product.name}</h3>
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
                  <span className="text-2xl font-bold text-dark-blue-primary">${product.basePrice.toFixed(2)}</span>
                  <Link
                    to={isAuthenticated ? '/orders' : '/login'}
                    className="bg-dark-blue-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark-blue-secondary transition"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
