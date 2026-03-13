import React from 'react';
import ShikiHighlighter from 'react-shiki';
import { useFormContext } from '../../context/FormContext';
import { snippetTemplate } from '@/Constants';
import { formatDate } from '@/Utils';

export function Highlighter() {
  const { values } = useFormContext();

  const snippetCode = () => {
    return snippetTemplate
      .replace('{{name}}', values.name || '')
      .replace('{{email}}', values.email || '')
      .replace('{{message}}', values.message || '')
      .replace('{{date}}', formatDate(new Date()) || '');
  };

  return (
    <ShikiHighlighter
      rootStyle="background-color: transparent; width: 100%; height: 100%;"
      preloadLanguages={['typescript']}
      showLineNumbers
      language="typescript"
      theme="dracula"
    >
      {snippetCode()}
    </ShikiHighlighter>
  );
}

export default Highlighter;
