import styles from './styles.module.scss';

interface AboutContentProps {
  lines: string[];
}

export function AboutContent({ lines }: AboutContentProps) {
  if (lines.length === 0) {
    return <div className={styles.editor} />;
  }

  return (
    <div className={styles.editor}>
      {lines.map((line, index) => (
        <div key={index} className={styles.line}>
          <span className={styles.lineNumber}>{index + 1}</span>
          <span className={styles.lineContent}>{line}</span>
        </div>
      ))}
    </div>
  );
}
