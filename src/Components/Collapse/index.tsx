'use client';

import React, { useState } from 'react';
import './collapse.scss';
import { RiArrowDownSFill, RiArrowRightSFill } from 'react-icons/ri';

type CollapseProps = {
  title: string;
} & React.ComponentProps<'div'>;

const fill = '#f8fafc';

export const Collapse = ({ children, title }: CollapseProps) => {
  const [open, setOpen] = useState(true);

  function tooggleOpen() {
    setOpen(!open);
  }

  const collapseClassName = open
    ? 'collapse-content -open'
    : 'collapse-content';

  const collapseTitleClassName = open
    ? 'collapse-title -open'
    : 'collapse-title';

  const collapsecontainerClassName = open
    ? 'collapse-container -open'
    : 'collapse-container';

  return (
    <div className={collapsecontainerClassName}>
      <button className="collapse-button" onClick={tooggleOpen}>
        <div className="collapse-icon">
          {open ? (
            <RiArrowDownSFill style={{ fill: fill }} />
          ) : (
            <RiArrowRightSFill style={{ fill: fill }} />
          )}
        </div>
        <span className={collapseTitleClassName}>{title}</span>
      </button>
      {open && <div className={collapseClassName}>{children}</div>}
    </div>
  );
};
