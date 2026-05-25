import { motion } from 'framer-motion';
import styles from './GlassCard.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'magenta' | 'violet' | 'none';
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', glow = 'none', onClick }: Props) {
  return (
    <motion.div
      className={`${styles.card} ${styles[`glow-${glow}`]} ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
