import { useState, useEffect } from 'react';
import { simulatedApi } from '../../utils/simulatedApi';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import type { BlogPost } from '../../types';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', excerpt: '', image: '', category: 'Technology', content: '' });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosts(simulatedApi.blogPosts.getAll());
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    if (!form.title || !form.excerpt) {
      alert('Title and excerpt are required');
      return;
    }
    if (editingId) {
      simulatedApi.blogPosts.update(editingId, form);
      setEditingId(null);
    } else {
      simulatedApi.blogPosts.create({ ...form, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) });
    }
    setPosts(simulatedApi.blogPosts.getAll());
    setShowForm(false);
    setForm({ title: '', excerpt: '', image: '', category: 'Technology', content: '' });
  };

  const handleEdit = (post: BlogPost) => {
    setForm({ title: post.title, excerpt: post.excerpt, image: post.image, category: post.category, content: post.content || '' });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this post?')) {
      simulatedApi.blogPosts.delete(id);
      setPosts(simulatedApi.blogPosts.getAll());
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark-blue-primary">Blog Management</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: '', excerpt: '', image: '', category: 'Technology', content: '' }); }} className="bg-blue-accent text-dark-blue-primary px-4 py-2 rounded-md font-semibold hover:bg-blue-400 transition">
          {showForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="border border-gray-300 rounded-md px-3 py-2" />
            <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" className="border border-gray-300 rounded-md px-3 py-2" />
            <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="Image URL" className="border border-gray-300 rounded-md px-3 py-2" />
            <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt" className="border border-gray-300 rounded-md px-3 py-2" />
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Content" className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2" rows={4} />
          </div>
          <button onClick={handleSubmit} className="mt-4 bg-dark-blue-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-900 transition">{editingId ? 'Update' : 'Create'} Post</button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map(post => (
              <tr key={post.id}>
                <td className="px-6 py-4 font-medium text-dark-blue-primary">{post.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{post.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(post)} className="text-blue-accent hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
