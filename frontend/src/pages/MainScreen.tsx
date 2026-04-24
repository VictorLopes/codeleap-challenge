import React, { useState } from 'react';
import { Input, Button, PostCard, Modal } from '../components';
import { useAuth } from '../hooks';

const MainScreen: React.FC = () => {
  const { username, logout } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'victor',
      created_datetime: new Date().toISOString(),
      title: 'My first post',
      content: 'Hello CodeLeap network! This is a test post.'
    },
    {
      id: 2,
      username: 'codeleap',
      created_datetime: new Date(Date.now() - 3600000).toISOString(),
      title: 'Welcome!',
      content: 'We are happy to have you here.'
    }
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleCreatePost = () => {
    if (title.trim() && content.trim()) {
      const newPost = {
        id: Date.now(),
        username: username,
        created_datetime: new Date().toISOString(),
        title,
        content
      };
      setPosts([newPost, ...posts]);
      setTitle('');
      setContent('');
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedPostId(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (post: any) => {
    setSelectedPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setPosts(posts.filter(p => p.id !== selectedPostId));
    setIsDeleteModalOpen(false);
    setSelectedPostId(null);
  };

  const handleSaveEdit = () => {
    setPosts(posts.map(p => p.id === selectedPostId ? { ...p, title: editTitle, content: editContent } : p));
    setIsEditModalOpen(false);
    setSelectedPostId(null);
  };

  return (
    <div className="container">
      <Modal isOpen={isDeleteModalOpen}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '40px' }}>
          Are you sure you want to delete this item?
        </h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Button variant="cancel" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="error" style={{ backgroundColor: '#ff5151', color: 'white' }} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Button variant="cancel" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button variant="success" disabled={!editTitle.trim() || !editContent.trim()} onClick={handleSaveEdit}>Save</Button>
        </div>
      </Modal>

      <header style={{
        backgroundColor: '#7695ec',
        padding: '24px 38px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#ffffff'
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700' }}>CodeLeap Network</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>Welcome, <strong>{username}</strong>!</span>
          <button
            onClick={logout}
            style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid white',
              padding: '4px 12px',
              fontSize: '12px'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ padding: '24px' }}>
        <section style={{
          border: '1px solid #999999',
          borderRadius: '16px',
          padding: '24px',
          backgroundColor: '#ffffff',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>
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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          {posts.map(post => (
            <PostCard
              key={post.id}
              {...post}
              onEdit={() => openEditModal(post)}
              onDelete={() => openDeleteModal(post.id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default MainScreen;
