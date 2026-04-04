'use client';

import { usePathname } from 'next/navigation';
import { Tab } from '@/Components/Tab';
import { ROUTES } from '@/Constants';
import './styles.scss';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  const isHello = pathname === ROUTES.hello;
  const isAbout = pathname === ROUTES.about;
  const isProjects = pathname === ROUTES.projects;
  const isContact = pathname === ROUTES.contact;

  if (!isOpen) return null;

  return (
    <div className="mobile-nav">
      <span className="mobile-nav__section"># navigate:</span>
      <ul className="mobile-nav__links">
        <li>
          <Tab active={isHello} to={ROUTES.hello} label="_hello" onClick={onClose} />
        </li>
        <li>
          <Tab active={isAbout} to={ROUTES.about} label="_about-me" onClick={onClose} />
        </li>
        <li>
          <Tab active={isProjects} to={ROUTES.projects} label="_projects" onClick={onClose} />
        </li>
        <li>
          <Tab active={isContact} to={ROUTES.contact} label="_contact-me" onClick={onClose} />
        </li>
      </ul>
    </div>
  );
}

export default MobileNav;
