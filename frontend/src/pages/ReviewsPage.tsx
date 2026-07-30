import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import { Package, Send } from 'lucide-react';
import type { Product } from '../types';

const STORAGE_KEY = 'brandforge_reviews';

interface Review {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  reviewerName: string;
  createdAt: string;
}

const defaultReviews: Omit<Review, 'id' | 'createdAt'>[] = [
  { productId: '1', productName: 'Classic T-Shirt', rating: 5, comment: 'Excellent quality fabric and vibrant colors. Highly recommended!', reviewerName: 'James Wilson' },
  { productId: '1', productName: 'Classic T-Shirt', rating: 4, comment: 'Good value for money. Shipping was fast.', reviewerName: 'Lisa Thompson' },
  { productId: '2', productName: 'Corporate Polo', rating: 5, comment: 'Perfect for our company uniforms. The embroidery is top-notch.', reviewerName: 'Robert Martinez' },
  { productId: '3', productName: 'Custom Hoodie', rating: 4, comment: 'Soft and comfortable. The print quality is amazing.', reviewerName: 'Sarah Chen' },
  { productId: '4', productName: 'Promotional Cap', rating: 3, comment: 'Decent quality for the price. Could use better stitching.', reviewerName: 'Michael Brown' },
];

function getReviews(): Review[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Review[];
    }
  } catch {
    // corrupted data, fall through to defaults
  }

  const seeded = defaultReviews.map((review, index) => ({
    ...review,
    id: `default-${index}`,
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveReviews(reviews: Review[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export default function ReviewsPage() {
  const { user } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const [reviews, setReviews] = useState<Review[]>(() => getReviews());
  const [selectedProductId, setSelectedProductId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submitMessage, setSubmitMessage] = useState('');

  const productMap = useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach(p => map.set(p._id, p));
    return map;
  }, [products]);

  const productReviews = useMemo(() => {
    const grouped = new Map<string, Review[]>();
    reviews.forEach(review => {
      const existing = grouped.get(review.productId) || [];
      existing.push(review);
      grouped.set(review.productId, existing);
    });
    return grouped;
  }, [reviews]);

  const overallAverage = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !comment.trim()) return;

    const product = productMap.get(selectedProductId);
    const newReview: Review = {
      id: Date.now().toString(),
      productId: selectedProductId,
      productName: product?.name || selectedProductId,
      rating,
      comment: comment.trim(),
      reviewerName: user?.name || 'Anonymous',
      createdAt: new Date().toISOString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(updated);

    setComment('');
    setRating(5);
    setSelectedProductId('');
    setSubmitMessage('Review submitted successfully!');
    setTimeout(() => setSubmitMessage(''), 3000);
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SectionErrorBoundary sectionName="Reviews">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Reviews</span>
            <h1 className="text-4xl font-bold text-dark-blue-primary mt-2">Product Reviews</h1>
            <p className="text-gray-600 mt-4 max-w-2xl">
              See what our customers are saying or share your own experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {productsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-100 rounded-xl h-32 animate-pulse" />
                  ))}
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                (products.length > 0 ? products : [{ _id: 'all', name: 'All Products' }]).map(product => {
                  const pReviews = product._id === 'all' ? reviews : productReviews.get(product._id) || [];
                  const avg = pReviews.length > 0 ? pReviews.reduce((a, r) => a + r.rating, 0) / pReviews.length : 0;
                  const displayReviews = product._id === 'all' ? pReviews : pReviews.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                  if (product._id !== 'all' && pReviews.length === 0) return null;

                  return (
                    <div key={product._id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-accent/10 flex items-center justify-center text-blue-accent">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-dark-blue-primary">{product.name}</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4, 5].map(star => (
                                <span key={star} className={star <= Math.round(avg) ? '' : 'text-gray-300'}>
                                  ★
                                </span>
                              ))}
                            </div>
                            {pReviews.length > 0 && (
                              <span className="text-sm text-gray-500">
                                {avg.toFixed(1)} ({pReviews.length} review{pReviews.length !== 1 ? 's' : ''})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {displayReviews.length === 0 ? (
                        <p className="text-gray-500 text-sm">No reviews for this product yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {displayReviews.map(review => (
                            <div key={review.id} className="bg-white rounded-lg p-4 border border-gray-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-dark-blue-primary text-sm">{review.reviewerName}</span>
                                <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex text-yellow-400 mb-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <span key={star}>{star <= review.rating ? '★' : '☆'}</span>
                                ))}
                              </div>
                              <p className="text-gray-600 text-sm">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-6">
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-dark-blue-primary mb-2">Average Rating</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-blue-accent">{overallAverage.toFixed(1)}</span>
                    <span className="text-gray-500">/ 5</span>
                  </div>
                  <div className="flex text-yellow-400 text-2xl mt-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star}>{star <= Math.round(overallAverage) ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{reviews.length} total review{reviews.length !== 1 ? 's' : ''}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-dark-blue-primary mb-4">Write a Review</h3>

                  {submitMessage && (
                    <p className="text-green-600 text-sm font-medium mb-4">{submitMessage}</p>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Product</label>
                      <select
                        value={selectedProductId}
                        onChange={e => setSelectedProductId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                        required
                      >
                        <option value="">Select a product</option>
                        {productsLoading ? (
                          <option disabled>Loading products...</option>
                        ) : (
                          products.map(p => (
                            <option key={p._id} value={p._id}>{p.name}</option>
                          ))
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="text-3xl transition-transform hover:scale-110"
                          >
                            <span className={(hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}>
                              ★
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Comment</label>
                      <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-accent resize-none"
                        placeholder="Share your experience..."
                        required
                      />
                    </div>

                     <button
                       type="submit"
                       className="w-full bg-blue-accent text-dark-blue-primary px-6 py-3 rounded-md font-semibold hover:bg-blue-400 transition flex items-center justify-center gap-2"
                     >
                      <Send className="w-4 h-4" />
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
