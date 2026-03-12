import ShikiHighlighter from 'react-shiki';

export function Highlighter(props: { children: string }) {
  return (
    <ShikiHighlighter
      rootStyle="background-color: transparent; width: 100%; height: 100%;"
      preloadLanguages={['typescript']}
      showLineNumbers
      language="typescript"
      theme="dracula"
    >
      {props.children}
    </ShikiHighlighter>
  );
}

export default Highlighter;
