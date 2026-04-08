'use client';

import { VscClose } from 'react-icons/vsc';
import styles from './styles.module.scss';

export interface EditorTabProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isPaneActive?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  isDragging?: boolean;
  isDragOver?: boolean;
  dropIndicator?: 'before' | 'after';
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  onDragEnter?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
  onDragEnd?: React.DragEventHandler<HTMLDivElement>;
}

export function EditorTab({
  label,
  icon,
  isActive = false,
  isPaneActive = false,
  onClose,
  onClick,
  isDragging = false,
  isDragOver: _isDragOver = false,
  dropIndicator,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDrop,
  onDragEnd,
}: EditorTabProps) {
  const classNames = [
    styles.tab,
    isActive ? styles.active : '',
    isActive && !isPaneActive ? styles.paneInactive : '',
    isDragging ? styles.dragging : '',
    dropIndicator === 'before' ? styles.dropBefore : '',
    dropIndicator === 'after' ? styles.dropAfter : '',
  ]
    .filter(Boolean)
    .join(' ');

  const hasDragHandlers = Boolean(onDragStart);

  return (
    <div
      className={classNames}
      draggable={hasDragHandlers}
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
      {onClose && (
        <button
          className={styles.closeButton}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label={`Fechar aba ${label}`}
          type="button"
        >
          <VscClose size={14} />
        </button>
      )}
    </div>
  );
}
