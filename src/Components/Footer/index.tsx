import styles from './styles.module.scss';
import { FaXTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__left']}>
        <span className={styles['footer__label']}>find me in:</span>
        <div className={styles['footer__icons']}>
          <a
            href="https://x.com/thiagoborba"
            target="_blank"
            rel="noopener noreferrer"
            className={styles['footer__icon-link']}
            aria-label="X (Twitter)"
          >
            <FaXTwitter size={18} />
          </a>
          <a
            href="https://linkedin.com/in/thiagoborba"
            target="_blank"
            rel="noopener noreferrer"
            className={styles['footer__icon-link']}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>

      <div className={styles['footer__right']}>
        <div className={styles['footer__icons']}>
          <a
            href="https://github.com/thiagoborba"
            target="_blank"
            rel="noopener noreferrer"
            className={styles['footer__icon-link']}
            aria-label="GitHub"
          >
            <span className={styles['footer__label']}>@thiagoborba</span>
            <FaGithub id="github-icon" size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
