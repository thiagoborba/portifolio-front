'use client';

import './styles.scss';
import type { Snippet } from '@/api';
import { useCarouselScroll } from './useCarouselScroll';

type Props = { snippets: Snippet[] };

function CodeBlock({ snippet }: { snippet: Snippet }) {
  return (
    <div className="code-carousel__block">
      <div className="code-carousel__header">{`// ${snippet.repo} — ${snippet.filename}`}</div>
      <div
        className="code-carousel__code"
        dangerouslySetInnerHTML={{ __html: snippet.html }}
      />
    </div>
  );
}

export function CodeCarousel({ snippets }: Props) {
  const trackRef = useCarouselScroll();

  if (snippets.length === 0) {
    return (
      <div className="code-carousel code-carousel--empty">
        <span className="code-carousel__placeholder">
          {'// code snippets unavailable'}
        </span>
      </div>
    );
  }

  return (
    <div className="code-carousel" aria-hidden="true">
      <div className="code-carousel__track" ref={trackRef}>
        {/* Conteúdo duplicado para criar o efeito de loop infinito */}
        <div className="code-carousel__inner">
          {snippets.map((s) => (
            <CodeBlock key={s.repo} snippet={s} />
          ))}
        </div>
        <div className="code-carousel__inner" aria-hidden="true">
          {snippets.map((s) => (
            <CodeBlock key={s.repo} snippet={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
