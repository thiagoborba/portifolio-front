import React from 'react';
import ShikiHighlighter from 'react-shiki';
import { useFormContext } from '../../context/FormContext';
import { snippetTamplate } from '@/Constants';

export function Highlighter() {
  const { values } = useFormContext();

  const snippetCode = React.useMemo(() => {
    return snippetTamplate
      .replace('{{name}}', values.name || '')
      .replace('{{email}}', values.email || '')
      .replace('{{message}}', values.message || '');
  }, [values]);

  return (
    <ShikiHighlighter
      rootStyle="background-color: transparent; width: 100%; height: 100%;"
      preloadLanguages={['typescript']}
      showLineNumbers
      language="typescript"
      theme="dracula"
    >
      {snippetCode}
    </ShikiHighlighter>
  );
}

export default Highlighter;
