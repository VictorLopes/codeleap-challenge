import { useState, useEffect, useCallback } from 'react';
import { api, type CareerData } from '../../services/api';

export const useCareers = () => {
  const [posts, setPosts] = useState<CareerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async (username: string, title: string, content: string) => {
    try {
      const newPost = await api.createPost({
        username,
        title,
        content
      });
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create post');
    }
  };

  const updatePost = async (id: number, title: string, content: string) => {
    try {
      const updatedPost = await api.updatePost(id, { title, content });
      setPosts(prev => prev.map(p => p.id === id ? updatedPost : p));
      return updatedPost;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to save changes');
    }
  };

  const deletePost = async (id: number) => {
    try {
      await api.deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      throw new Error('Failed to delete post');
    }
  };

  return {
    posts,
    loading,
    error,
    refreshPosts: fetchPosts,
    createPost,
    updatePost,
    deletePost
  };
};
