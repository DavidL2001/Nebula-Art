import { motion } from 'framer-motion';
import type { ArtStyle, ArtMood } from '../../types';
import styles from './StylePicker.module.scss';

const STYLES: { id: ArtStyle; label: string; icon: string }[] = [
  { id: 'cyberpunk',     label: 'Cyberpunk',     icon: '⚡' },
  { id: 'cosmic',        label: 'Cosmic',        icon: '✦' },
  { id: 'surreal',       label: 'Surreal',       icon: '◈' },
  { id: 'impressionist', label: 'Impressionist', icon: '◎' },
  { id: 'abstract',      label: 'Abstract',      icon: '◇' },
  { id: 'neon-noir',     label: 'Neon Noir',     icon: '◐' },
  { id: 'minimalist',    label: 'Minimal',       icon: '○' },
];

const MOODS: { id: ArtMood; label: string }[] = [
  { id: 'mysterious', label: 'Mystisk'   },
  { id: 'energetic',  label: 'Energisk'  },
  { id: 'ethereal',   label: 'Eterisk'   },
  { id: 'chaotic',    label: 'Kaotisk'   },
  { id: 'serene',     label: 'Lugn'      },
  { id: 'melancholic',label: 'Melankolisk'},
];

interface Props {
  selectedStyle: ArtStyle;
  selectedMood: ArtMood;
  onStyleChange: (s: ArtStyle) => void;
  onMoodChange: (m: ArtMood) => void;
}

export default function StylePicker({ selectedStyle, selectedMood, onStyleChange, onMoodChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <p className={styles.sectionLabel}>STIL</p>
        <div className={styles.styleGrid}>
          {STYLES.map((s, i) => (
            <motion.button
              key={s.id}
              className={`${styles.styleBtn} ${selectedStyle === s.id ? styles.active : ''}`}
              onClick={() => onStyleChange(s.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <span className={styles.styleIcon}>{s.icon}</span>
              <span className={styles.styleLabel}>{s.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>MOOD</p>
        <div className={styles.moodGrid}>
          {MOODS.map((m) => (
            <motion.button
              key={m.id}
              className={`${styles.moodBtn} ${selectedMood === m.id ? styles.activeMood : ''}`}
              onClick={() => onMoodChange(m.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {m.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
