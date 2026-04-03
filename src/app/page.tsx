import { cache } from 'react';
import './styles.scss';
import { fetchSnippets } from '@/lib/github';
import { CodeCarousel } from '@/Components/CodeCarousel';

export const revalidate = 86400;

const getSnippets = cache(fetchSnippets);

export default async function Page() {
  const snippets = await getSnippets();

  return (
    <div className="hello-container">
      <div className="esq">
        <div className="top">
          <p className="greeting">Hi all. I am</p>
          <h1 className="name">Thiago Borba</h1>
          <p className="job">{'> Front-end developer'}</p>
        </div>

        <div className="bottom">
          <p><span className="comment">{'// find my profile on Github:'}</span></p>
          <p>
            <span className="keyword">const </span>
            <span className="variable">githubLink</span>
            <span className="punctuation"> = </span>
            <a className="string" href="https://github.com/thiagoborba/" target="_blank" rel="noopener noreferrer">{'"https://github.com/thiagoborba/"'}</a>
          </p>
        </div>
      </div>

      <div className="dir">
        <CodeCarousel snippets={snippets} />
      </div>
    </div>
  );
}
