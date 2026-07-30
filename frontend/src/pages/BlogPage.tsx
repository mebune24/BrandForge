import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';

const BlogPage: React.FC = () => {
  const { posts, loading } = useBlog();

  return (
    <SectionErrorBoundary sectionName="Blog">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles published yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <Link to={`/blog/${post.id}`} className="block">
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
                      <h3 className="text-dark-blue-primary text-lg font-bold mb-2 group-hover:text-blue-accent transition">{post.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 bg-dark-blue-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-dark-blue-secondary transition shadow-md">
              Read All Articles
              <span className="text-blue-accent">→</span>
            </Link>
          </div>
        </div>
      </div>
    </SectionErrorBoundary>
  );
};

export default BlogPage;
