import React from 'react';
import { useBlog } from '../hooks/useBlog';

const BlogPage: React.FC = () => {
  const { posts, loading } = useBlog();

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Blog</span>
          <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Latest Insights</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Stay updated with the latest trends in printing technology and branding.
          </p>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-blue-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-xs mb-2">{post.date}</p>
                  <h3 className="text-dark-blue-primary text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">More articles coming soon. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
