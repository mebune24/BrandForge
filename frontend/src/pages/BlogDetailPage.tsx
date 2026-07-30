import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, loading } = useBlog();
  const post = posts.find(p => p.id === Number(id));

  if (loading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <SectionErrorBoundary sectionName="Blog Detail">
        <div className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold text-dark-blue-primary mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog" className="bg-blue-accent text-dark-blue-primary px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition">
              Back to Blog
            </Link>
          </div>
        </div>
      </SectionErrorBoundary>
    );
  }

  return (
    <SectionErrorBoundary sectionName="Blog Detail">
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-accent transition mb-6">
            <span>←</span> Back to Blog
          </Link>
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-accent text-white px-3 py-1 rounded-full text-xs font-semibold">{post.category}</span>
                <span className="text-gray-500 text-sm">{post.date}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-dark-blue-primary mb-6">{post.title}</h1>
              <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          </article>
        </div>
      </div>
    </SectionErrorBoundary>
  );
};

export default BlogDetailPage;
