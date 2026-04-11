'use client';

import ShikiHighlighter from 'react-shiki';
import styles from './not-found.module.scss';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

const notFoundSnippet = `const page = findPage('you-were-looking-for');

if (!page) {
  console.log("Oops! Looks like you took a wrong turn in the codebase.");
  console.log("But hey, since you're here...");
  console.log("🌐 Go back to the homepage and explore more cool stuff!");
  throw new Error("404: PageNotFoundError 🙁");
}

/* Suggestions:
 * - Check the URL for typos
 * - Use the site navigation
 * - Or hit CMD+Z in real life 🙂
 */

redirect('home');`;

const mobileNotFoundSnippet = `throw new Error(
  "404: PageNotFoundError 🙁"
);

goBack() || goHome();`;

export default function NotFound() {
  const isMobile = useIsMobile();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image
          src={'icons/404/404.svg'}
          alt="404 Not Found"
          width={312}
          height={180}
          aria-hidden="true"
          className={styles.icon}
        />
      </div>
      <div className={styles.right}>
        <ShikiHighlighter
          language="javascript"
          theme="dracula"
          showLineNumbers={!isMobile}
          rootStyle="background-color: transparent; width: 100%; height: 100%;"
          showLanguage={false}
        >
          {isMobile ? mobileNotFoundSnippet : notFoundSnippet}
        </ShikiHighlighter>
      </div>
    </div>
  );
}
