import React from 'react';
import { DeleteIcon, EditIcon } from '../Icons/Icons';
import { useAuth } from '../../hooks';
import styles from './PostCard.module.scss';

interface PostCardProps {
  username: string;
  created_datetime: string;
  title: string;
  content: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ username, created_datetime, title, content, onEdit, onDelete }) => {
  const { username: loggedInUser } = useAuth();
  const isAuthor = loggedInUser === username;

  const timeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now.getTime() - then.getTime()) / 1000 / 60);

    if (diff < 1) return 'now';
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {isAuthor && (
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={onDelete} aria-label="Delete post">
              <DeleteIcon />
            </button>
            <button className={styles.actionButton} onClick={onEdit} aria-label="Edit post">
              <EditIcon />
            </button>
          </div>
        )}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.meta}>
          <span>@{username}</span>
          <span className={styles.timeAgo}>{timeAgo(created_datetime)}</span>
        </div>
        <p>
          {content}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
