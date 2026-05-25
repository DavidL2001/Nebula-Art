import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PromptInput.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  value: string;
  onChange: (v: string) => void;
  onGenerate: () => void;
  loading?: boolean;
}

const SUGGESTIONS = [
  'neon lights in the rain, Tokyo at night, cyberpunk',
  'deep space, stardust, celestial glow, cosmic',
  'floating objects, dreamlike landscape, surreal',
  'soft brushstrokes, golden sunlight, impressionist',
  'fluid forms, expressive color splashes, abstract',
];

export default function PromptInput({ value, onChange, onGenerate }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={`${styles.inputWrap} ${focused ? styles.focused : ''}`}
        animate={{ boxShadow: focused
          ? '0 0 0 1px rgba(0,245,255,0.5), 0 0 30px rgba(0,245,255,0.15)'
          : '0 0 0 1px rgba(255,255,255,0.08)'
        }}
        transition={{ duration: 0.2 }}
      >
        <span className={styles.icon}>✦</span>
        <textarea
          className={styles.textarea}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) onGenerate(); }}
          placeholder="Beskriv ditt konstverk... (⌘+Enter för att generera)"
          rows={3}
        />
      </motion.div>

      <div className={styles.suggestions}>
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={i}
            className={styles.suggestion}
            onClick={() => onChange(s)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {s}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
