import { useState, useEffect } from 'react';
import { blogPosts } from '../data';
import type { BlogPost } from '../types';

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(blogPosts);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { posts, loading };
}
