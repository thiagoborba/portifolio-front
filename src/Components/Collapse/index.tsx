'use client';

import React, { useState } from 'react';
import './collapse.scss';
import { RiArrowDownSFill, RiArrowRightSFill } from 'react-icons/ri';

type CollapseProps = {
  title: string;
  open: boolean;
} & React.ComponentProps<'div'>;

const fill = '#f8fafc';

export const Collapse = ({
  children,
  title,
  open: initialOpen = true,
}: CollapseProps) => {
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return initialOpen;
    const isMobileNow = window.matchMedia('(max-width: 890px)').matches;
    return isMobileNow ? false : initialOpen;
  });

  return (
    <div className={`collapse-container${open ? ' -open' : ''}`}>
      <button className="collapse-button" onClick={() => setOpen(!open)}>
        <div className="collapse-icon">
          {open ? (
            <RiArrowDownSFill style={{ fill: fill }} />
          ) : (
            <RiArrowRightSFill style={{ fill: fill }} />
          )}
        </div>
        <span className={`collapse-title${open ? ' -open' : ''}`}>{title}</span>
      </button>
      {open && <div className={`collapse-content${open ? ' -open' : ''}`}>{children}</div>}
    </div>
  );
};
