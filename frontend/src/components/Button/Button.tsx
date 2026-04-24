import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cancel' | 'success' | 'error';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', style, className, ...props }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${className || ''}`} 
      style={style} 
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
