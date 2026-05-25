import { motion } from 'framer-motion';
import { useGeneratorStore } from '../../store';
import styles from './ArtCanvas.module.scss';
import React from 'react';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function ArtCanvas({ canvasRef }: Props) {
  const { generatorState, params } = useGeneratorStore();

  return (
    <div className={styles.wrapper}>
      <div className={styles.ambientGlow} style={{
        background: `radial-gradient(ellipse at center, hsl(${params.hue},60%,30%) 0%, transparent 70%)`
      }} />

      <canvas ref={canvasRef} width={800} height={600} className={styles.canvas} />

      {generatorState.status === 'idle' && (
        <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className={styles.idleContent}>
            <motion.div
              className={styles.idleIcon}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >✦</motion.div>
            <p className={styles.idleText}>Beskriv ditt konstverk och tryck Generera</p>
          </div>
        </motion.div>
      )}

      {(generatorState.status === 'parsing' || generatorState.status === 'generating') && (
        <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className={styles.loadingContent}>
            <div className={styles.progressRing}>
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" className={styles.trackCircle} />
                <circle
                  cx="40" cy="40" r="34"
                  className={styles.fillCircle}
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - generatorState.progress / 100)}`}
                />
              </svg>
              <span className={styles.progressPct}>{generatorState.progress}%</span>
            </div>
            <p className={styles.loadingLabel}>
              {generatorState.status === 'parsing' ? 'ANALYSERAR PROMPT...' : 'GENERERAR...'}
            </p>
          </div>
        </motion.div>
      )}

      <div className={`${styles.corner} ${styles.tl}`} />
      <div className={`${styles.corner} ${styles.tr}`} />
      <div className={`${styles.corner} ${styles.bl}`} />
      <div className={`${styles.corner} ${styles.br}`} />
    </div>
  );
}
