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

  const collapseClassName = open ? 'collapse -open' : 'collapse';

  return (
    <div className={collapseClassName}>
      <div className="button">
        {open ? (
          <RiArrowDownSFill style={{ fill: fill }} />
        ) : (
          <RiArrowRightSFill style={{ fill: fill }} />
        )}
        <button onClick={tooggleOpen}>{title}</button>
      </div>
      {open && <div>{children}</div>}
    </div>
  );
};
