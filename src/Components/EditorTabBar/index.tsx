'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

export interface EditorTabBarProps {
  children?: React.ReactNode;
  onSpacerDragOver?: React.DragEventHandler<HTMLDivElement>;
  onSpacerDrop?: React.DragEventHandler<HTMLDivElement>;
  onBarDragEnter?: React.DragEventHandler<HTMLDivElement>;
  onBarDragLeave?: React.DragEventHandler<HTMLDivElement>;
  isReceiving?: boolean;
}

export function EditorTabBar({
  children,
  onSpacerDragOver,
  onSpacerDrop,
  onBarDragEnter,
  onBarDragLeave,
  isReceiving = false,
}: EditorTabBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{ left: number; width: number } | null>(null);
  const dragState = useRef<{ startX: number; startScrollLeft: number } | null>(null);

  const calcThumb = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    if (scrollWidth <= clientWidth) {
      setThumb(null);
      return;
    }
    const w = (clientWidth / scrollWidth) * clientWidth;
    const l = (scrollLeft / (scrollWidth - clientWidth)) * (clientWidth - w);
    setThumb({ left: l, width: w });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    calcThumb();
    el.addEventListener('scroll', calcThumb, { passive: true });
    const ro = new ResizeObserver(calcThumb);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', calcThumb);
      ro.disconnect();
    };
  }, [calcThumb]);

  // Recalculate when tabs are added or removed
  useEffect(() => {
    calcThumb();
  }, [children, calcThumb]);

  function handleThumbPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { startX: e.clientX, startScrollLeft: el.scrollLeft };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handleThumbPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current || !scrollRef.current) return;
    const el = scrollRef.current;
    const { scrollWidth, clientWidth } = el;
    const thumbWidth = (clientWidth / scrollWidth) * clientWidth;
    const scrollableTrack = clientWidth - thumbWidth;
    const scrollableContent = scrollWidth - clientWidth;
    const dx = e.clientX - dragState.current.startX;
    el.scrollLeft =
      dragState.current.startScrollLeft + (dx / scrollableTrack) * scrollableContent;
  }

  function handleThumbPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    dragState.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }

  const barClass = [styles.bar, isReceiving ? styles.receiving : ''].filter(Boolean).join(' ');

  return (
    <div className={barClass} onDragEnter={onBarDragEnter} onDragLeave={onBarDragLeave}>
      <div ref={scrollRef} className={styles.scroll}>
        {children}
        <div
          className={styles.spacer}
          aria-hidden="true"
          onDragOver={onSpacerDragOver}
          onDrop={onSpacerDrop}
        />
      </div>
      {thumb && (
        <div className={styles.scrollTrack}>
          <div
            className={styles.scrollThumb}
            style={{ left: thumb.left, width: thumb.width }}
            onPointerDown={handleThumbPointerDown}
            onPointerMove={handleThumbPointerMove}
            onPointerUp={handleThumbPointerUp}
          />
        </div>
      )}
    </div>
  );
}
