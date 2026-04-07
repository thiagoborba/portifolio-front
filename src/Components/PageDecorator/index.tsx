import { VscFile } from 'react-icons/vsc';
import styles from './styles.module.scss';

interface PageDecoratorProps {
  filename: string | null;
}

export function PageDecorator({ filename }: PageDecoratorProps) {
  return (
    <div className={styles.bar}>
      {filename && (
        <div className={styles.tab}>
          <VscFile className={styles.icon} />
          <span>{filename}</span>
        </div>
      )}
      <div className={styles.spacer} />
    </div>
  );
}
