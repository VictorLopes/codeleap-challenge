import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
