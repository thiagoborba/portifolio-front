import ShikiHighlighter from 'react-shiki';
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
      <ShikiHighlighter
        rootStyle="background-color: transparent; width: 100%; flex: 1; min-height: 0; overflow: visible;"
        language="typescript"
        theme="dracula"
        showLineNumbers
        showLanguage={false}
      >
        {lines.join('\n')}
      </ShikiHighlighter>
    </div>
  );
}
