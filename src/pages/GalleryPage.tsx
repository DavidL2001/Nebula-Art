import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/ui/Navbar';
import NeonButton from '../components/ui/NeonButton';
import ParticleBackground from '../components/canvas/ParticleBackground';
import { useGalleryStore } from '../store';
import type { GalleryItem } from '../types';
import styles from './GalleryPage.module.scss';

function EmptyState() {
  return (
    <motion.div
      className={styles.empty}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className={styles.emptyIcon}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >✦</motion.div>
      <p className={styles.emptyTitle}>Galleriet är tomt</p>
      <p className={styles.emptyText}>Generera ett konstverk och tryck Spara för att det ska dyka upp här.</p>
    </motion.div>
  );
}

function GalleryCard({ item, onDelete, onLike }: {
  item: GalleryItem;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleExport = () => {
    if (!item.thumbnail) return;
    const a = document.createElement('a');
    a.href = item.thumbnail;
    a.download = `nebula-art-${item.id.slice(0, 8)}.png`;
    a.click();
  };

  return (
    <motion.div
      className={styles.card}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className={styles.cardCanvas}>
        {item.thumbnail
          ? <img src={item.thumbnail} alt="artwork" className={styles.thumb} />
          : <div className={styles.noThumb}>
              <span>✦</span>
              <p>{item.parameters.style}</p>
            </div>
        }

        <AnimatePresence>
          {hovered && (
            <motion.div
              className={styles.cardOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className={styles.overlayActions}>
                <button className={styles.overlayBtn} onClick={handleExport} title="Exportera PNG">↓</button>
                <button
                  className={`${styles.overlayBtn} ${item.liked ? styles.liked : ''}`}
                  onClick={() => onLike(item.id)}
                  title="Gilla"
                >♥</button>
                <button className={`${styles.overlayBtn} ${styles.deleteBtn}`} onClick={() => onDelete(item.id)} title="Radera">✕</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.cardMeta}>
        <div className={styles.metaTop}>
          <span className={styles.styleBadge}>{item.parameters.style}</span>
          <span className={styles.moodBadge}>{item.parameters.mood}</span>
        </div>
        {item.parameters.prompt && (
          <p className={styles.prompt}>"{item.parameters.prompt.slice(0, 60)}{item.parameters.prompt.length > 60 ? '…' : ''}"</p>
        )}
        <p className={styles.date}>{new Date(item.createdAt).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const { items, removeItem, toggleLike } = useGalleryStore();
  const [filter, setFilter] = useState<string>('all');

  const styles_list = ['all', 'cyberpunk', 'cosmic', 'surreal', 'minimalist', 'impressionist', 'abstract', 'neon-noir'];
  const filtered = filter === 'all' ? items : items.filter(i => i.parameters.style === filter);

  const exportAll = () => {
    filtered.forEach((item, idx) => {
      if (!item.thumbnail) return;
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = item.thumbnail!;
        a.download = `nebula-art-${item.id.slice(0, 8)}.png`;
        a.click();
      }, idx * 300);
    });
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <ParticleBackground />

      <main className={styles.main}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.title}><span className={styles.accent}>✦</span> GALLERY</h1>
          <p className={styles.subtitle}>{items.length} {items.length === 1 ? 'konstverk' : 'konstverk'} sparade</p>
        </motion.header>

        {/* Filter bar */}
        {items.length > 0 && (
          <motion.div
            className={styles.filterBar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.filters}>
              {styles_list.map(s => (
                <button
                  key={s}
                  className={`${styles.filterBtn} ${filter === s ? styles.activeFilter : ''}`}
                  onClick={() => setFilter(s)}
                >
                  {s === 'all' ? 'Alla' : s}
                </button>
              ))}
            </div>
            {filtered.length > 1 && (
              <NeonButton color="violet" variant="outline" size="sm" onClick={exportAll}>
                ↓ Exportera alla
              </NeonButton>
            )}
          </motion.div>
        )}

        {items.length === 0
          ? <EmptyState />
          : filtered.length === 0
            ? <p className={styles.noMatch}>Inga verk med stil "{filter}"</p>
            : (
              <motion.div className={styles.grid} layout>
                <AnimatePresence mode="popLayout">
                  {filtered.map(item => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      onDelete={removeItem}
                      onLike={toggleLike}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )
        }
      </main>
    </div>
  );
}
