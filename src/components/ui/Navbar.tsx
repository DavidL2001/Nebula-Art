import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>✦</span>
        <span className={styles.logoText}>NEBULA<span className={styles.logoAccent}>ART</span></span>
      </Link>

      <div className={styles.links}>
        {[
          { to: '/',        label: 'Generator' },
          { to: '/gallery', label: 'Gallery'   },
        ].map(({ to, label }) => (
          <Link key={to} to={to} className={`${styles.link} ${pathname === to ? styles.active : ''}`}>
            {label}
            {pathname === to && (
              <motion.div className={styles.underline} layoutId="nav-underline" />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
