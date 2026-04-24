import React, { useState } from 'react';
import { Input, Button, PostCard, Modal } from '../components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, useCareers } from '../hooks';
import styles from './MainScreen.module.scss';


const MainScreen: React.FC = () => {
  const { username, logout } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const {
    posts,
    loading,
    loadingMore,
    error,
    createPost,
    updatePost,
    deletePost,
    lastPostElementRef,
    ordering,
    setOrdering,
    search,
    setSearch
  } = useCareers();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleCreatePost = async () => {
    if (title.trim() && content.trim() && username) {
      try {
        await createPost(username, title, content);
        setTitle('');
        setContent('');
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleOpenDeleteModal = (id: number) => {
    setSelectedPostId(id);
    setIsDeleteModalOpen(true);
  };

  const handleOpenEditModal = (post: any) => {
    setSelectedPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedPostId) {
      try {
        await deletePost(selectedPostId);
        setIsDeleteModalOpen(false);
        setSelectedPostId(null);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (selectedPostId) {
      try {
        await updatePost(selectedPostId, editTitle, editContent);
        setIsEditModalOpen(false);
        setSelectedPostId(null);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="container">
      <Modal isOpen={isDeleteModalOpen}>
        <h2 className={styles.modalTitle}>
          Are you sure you want to delete this item?
        </h2>
        <div className={styles.modalActions}>
          <Button variant="cancel" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="error" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>


      <Modal isOpen={isEditModalOpen}>
        <h2 className={styles.modalTitle}>
          Edit item
        </h2>
        <Input
          label="Title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <Input
          label="Content"
          multiline
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <div className={styles.modalActions}>
          <Button variant="cancel" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button variant="success" disabled={!editTitle.trim() || !editContent.trim()} onClick={handleSaveEdit}>Save</Button>
        </div>
      </Modal>

      <header className={styles.header}>
        <h1 className={styles.title}>CodeLeap Network</h1>
        <div className={styles.userNav}>
          <span className={styles.username}>
            Welcome, <strong>{username}</strong>!
          </span>
          <button
            onClick={logout}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.createPostSection}>
          <h2 className={styles.sectionTitle}>
            What's on your mind?
          </h2>
          <Input
            label="Title"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Content"
            placeholder="Content here"
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <Button
              variant="primary"
              disabled={!title.trim() || !content.trim()}
              onClick={handleCreatePost}
            >
              Create
            </Button>
          </div>
        </section>

        <section>
          <div className={styles.controls}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              {search && (
                <button 
                  className={styles.clearButton} 
                  onClick={() => setSearch('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <div className={styles.sortingContainer}>
              <label htmlFor="sorting">Sort by:</label>
              <select
                id="sorting"
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                className={styles.select}
              >
                <option value="-created_datetime">Newest First</option>
                <option value="created_datetime">Oldest First</option>
                <option value="username">Username (A-Z)</option>
                <option value="-username">Username (Z-A)</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
          {loading && <p className={styles.statusMessage}>Loading posts...</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
          {!loading && !error && posts.length === 0 && <p className={styles.statusMessage}>No posts yet. Be the first to share something!</p>}
          <AnimatePresence initial={false}>
            {posts?.map?.((post, index) => (
              <motion.div
                key={post.id!}
                ref={index === posts.length - 1 ? lastPostElementRef : null}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                layout
              >
                <PostCard
                  username={post.username}
                  created_datetime={post.created_datetime!}
                  title={post.title}
                  content={post.content}
                  onEdit={() => handleOpenEditModal(post)}
                  onDelete={() => handleOpenDeleteModal(post.id!)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {loadingMore && <p className={styles.statusMessage}>Loading more...</p>}
        </section>
      </main>

    </div>
  );
};

export default MainScreen;
