import { motion } from 'framer-motion';
import type { NeonColor } from '../../types';
import styles from './NeonButton.module.scss';

interface Props {
  children: React.ReactNode;
  color?: NeonColor;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function NeonButton({
  children, color = 'cyan', variant = 'solid',
  size = 'md', disabled, loading, onClick, className = ''
}: Props) {
  return (
    <motion.button
      className={`${styles.btn} ${styles[color]} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      {loading && <span className={styles.spinner} />}
      <span className={styles.label}>{children}</span>
    </motion.button>
  );
}
