import { MdOutlineEmail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';

import { IoIosLink } from 'react-icons/io';
import './index.scss';

type SidebarItemProps = {
  type: string;
  href: string;
  value: string;
};

export const SidebarItem = ({ type, href, value }: SidebarItemProps) => {
  function renderIcon() {
    switch (type) {
      case 'email':
        return <MdOutlineEmail />;
      case 'tel':
        return <BsTelephone />;
      case 'social':
        return <IoIosLink />;
      default:
        return '';
    }
  }

  return (
    <li className="li" key={type}>
      <a target="_blank" href={href}>
        <span className="sidebar-item-icon">{renderIcon()}</span>
        {value}
      </a>
    </li>
  );
};
