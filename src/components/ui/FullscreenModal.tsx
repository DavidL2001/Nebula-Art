import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from './NeonButton';
import styles from './FullscreenModal.module.scss';

interface Props {
  thumbnailUrl: string;
  artStyle?: string;
  artMood?: string;
  prompt?: string;
  onClose: () => void;
  onExport: () => void;
}

export default function FullscreenModal({ thumbnailUrl, artStyle, artMood, prompt, onClose, onExport }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.meta}>
              {artStyle && <span className={styles.badge}>{artStyle}</span>}
              {artMood  && <span className={styles.badge2}>{artMood}</span>}
              {prompt   && <span className={styles.promptSnip}>"{prompt.slice(0, 50)}{prompt.length > 50 ? '…' : ''}"</span>}
            </div>
            <div className={styles.actions}>
              <NeonButton color="cyan" variant="outline" size="sm" onClick={onExport}>
                ↓ PNG
              </NeonButton>
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>
          </div>

          {/* Image */}
          <div className={styles.canvasWrap}>
            <img src={thumbnailUrl} alt="fullscreen artwork" className={styles.img} />
            <div className={`${styles.corner} ${styles.tl}`} />
            <div className={`${styles.corner} ${styles.tr}`} />
            <div className={`${styles.corner} ${styles.bl}`} />
            <div className={`${styles.corner} ${styles.br}`} />
          </div>

          <p className={styles.hint}>ESC för att stänga</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
