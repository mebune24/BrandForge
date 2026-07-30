import { useState, useEffect } from 'react';
import { simulatedApi } from '../utils/simulatedApi';
import type { BlogPost } from '../types';

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(simulatedApi.blogPosts.getAll());
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const refresh = () => {
    setPosts(simulatedApi.blogPosts.getAll());
  };

  return { posts, loading, refresh };
}
