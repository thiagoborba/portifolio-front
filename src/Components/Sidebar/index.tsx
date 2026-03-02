import React from 'react';
import './sidebar.scss';

export const Sidebar = ({ children }: React.ComponentProps<'div'>) => {
  return <div className="sidebar">{children}</div>;
};

export default Sidebar;
