import { useState, useEffect, useCallback, useRef } from 'react';
import { api, type CareerData } from '../../services/api';

export const useCareers = () => {
  const [posts, setPosts] = useState<CareerData[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ordering, setOrdering] = useState<string>('-created_datetime');
  const [search, setSearch] = useState<string>('');

  const fetchPosts = useCallback(async (isInitial = true) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await api.getPosts(isInitial ? undefined : (nextPage ?? undefined), ordering, search);
      
      if (isInitial) {
        setPosts(response.results);
      } else {
        setPosts(prev => [...prev, ...response.results]);
      }
      
      setNextPage(response.next);
      setError(null);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [nextPage, ordering, search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchPosts(true);
    }, search ? 500 : 0);

    return () => clearTimeout(handler);
  }, [ordering, search]);

  const fetchMore = useCallback(() => {
    if (nextPage && !loadingMore) {
      fetchPosts(false);
    }
  }, [nextPage, loadingMore, fetchPosts]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !!nextPage) {
        fetchMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, nextPage, fetchMore]);

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
    loadingMore,
    hasMore: !!nextPage,
    error,
    refreshPosts: () => fetchPosts(true),
    fetchMore,
    lastPostElementRef,
    createPost,
    updatePost,
    deletePost,
    ordering,
    setOrdering,
    search,
    setSearch
  };
};
