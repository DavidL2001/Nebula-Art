import styles from './NeonSlider.module.scss';

interface Props {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  color?: 'cyan' | 'magenta' | 'violet' | 'gold';
  unit?: string;
}

export default function NeonSlider({
  label, value, min = 0, max = 100, onChange, color = 'cyan', unit = ''
}: Props) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={`${styles.value} ${styles[color]}`}>{value}{unit}</span>
      </div>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[color]}`}
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className={`${styles.input} ${styles[color]}`}
        />
      </div>
    </div>
  );
}
