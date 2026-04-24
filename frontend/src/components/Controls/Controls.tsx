import React from 'react';
import styles from './Controls.module.scss';

interface ControlsProps {
  search: string;
  setSearch: (value: string) => void;
  ordering: string;
  setOrdering: (value: string) => void;
}

const Controls: React.FC<ControlsProps> = ({ search, setSearch, ordering, setOrdering }) => {
  return (
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
  );
};

export default Controls;
