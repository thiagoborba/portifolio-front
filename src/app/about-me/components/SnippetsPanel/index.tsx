import type { Snippet } from '@/api';
import styles from './styles.module.scss';

interface SnippetsPanelProps {
  snippets: Snippet[];
}

export function SnippetsPanel({ snippets }: SnippetsPanelProps) {
  if (snippets.length === 0) {
    return (
      <div className={`${styles.panel} ${styles.empty}`}>
        <span className={styles.placeholder}>// no snippets available</span>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      {snippets.map((snippet, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.username}>
              <span>{snippet.repo}</span>
            </span>
            <span className={styles.stars}>{snippet.filename}</span>
          </div>
          <div
            className={styles.code}
            dangerouslySetInnerHTML={{ __html: snippet.html }}
          />
        </div>
      ))}
    </div>
  );
}
