'use client';

import { useRef, useEffect } from 'react';

/**
 * Duração em segundos para percorrer todo o conteúdo do carrossel uma vez.
 * Valor maior = rolagem mais lenta.
 */
const SCROLL_CYCLE_SECONDS = 120;

/**
 * Controla a rolagem automática e o drag manual de um carrossel infinito vertical.
 *
 * O carrossel tem o conteúdo duplicado (A + A), então quando chegamos na metade
 * do track voltamos ao início — criando o efeito de loop infinito.
 */
export function useCarouselScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const yOffsetRef = useRef(0);
  const dragStateRef = useRef<{ startY: number; startOffset: number } | null>(null);
  const isAutoScrollingRef = useRef(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const container = track.parentElement!;
    let animationFrameId: number;
    let prevTimestamp: number | null = null;

    const tick = (now: number) => {
      if (isAutoScrollingRef.current) {
        const loopPoint = track.scrollHeight / 2;
        const deltaSeconds = prevTimestamp !== null ? (now - prevTimestamp) / 1000 : 0;
        const pixelsPerSecond = loopPoint / SCROLL_CYCLE_SECONDS;

        yOffsetRef.current -= pixelsPerSecond * deltaSeconds;

        // Ao atingir o fim do primeiro bloco, volta ao início (loop infinito)
        if (yOffsetRef.current < -loopPoint) {
          yOffsetRef.current += loopPoint;
        }

        track.style.transform = `translateY(${yOffsetRef.current}px)`;
      }

      prevTimestamp = now;
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    const onDragStart = (e: MouseEvent) => {
      isAutoScrollingRef.current = false;
      dragStateRef.current = { startY: e.clientY, startOffset: yOffsetRef.current };
      container.style.cursor = 'grabbing';
    };

    const onDragMove = (e: MouseEvent) => {
      if (!dragStateRef.current) return;

      const loopPoint = track.scrollHeight / 2;
      const dragDelta = e.clientY - dragStateRef.current.startY;
      let newOffset = dragStateRef.current.startOffset + dragDelta;

      // Mantém o offset dentro dos limites do loop
      if (newOffset < -loopPoint) newOffset += loopPoint;
      if (newOffset > 0) newOffset -= loopPoint;

      yOffsetRef.current = newOffset;
      track.style.transform = `translateY(${newOffset}px)`;
    };

    const onDragEnd = () => {
      if (!dragStateRef.current) return;
      dragStateRef.current = null;
      container.style.cursor = '';
      prevTimestamp = null; // Evita salto brusco ao retomar a rolagem automática
      isAutoScrollingRef.current = true;
    };

    container.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onDragStart);
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('mouseup', onDragEnd);
    };
  }, []);

  return trackRef;
}
