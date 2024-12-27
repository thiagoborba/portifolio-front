'use client';

import { Tab } from '@/Components';
import './styles.scss';
import { ROUTES } from '@/Constants';
import { JSX, ClassAttributes, HTMLAttributes } from 'react';
import { usePathname } from 'next/navigation';

export function HeaderTabs(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement>
) {
  const pathname = usePathname();

  const isHello = pathname === ROUTES.hello;
  const isAbout = pathname === ROUTES.about;
  const isProjects = pathname === ROUTES.projects;
  const isContact = pathname === ROUTES.contact;

  return (
    <nav {...props}>
      <ul className={'header-tabs'}>
        <li>
          <Tab active={isHello} to={ROUTES.hello} label="_hello" />
        </li>
        <li>
          <Tab active={isAbout} to={ROUTES.about} label="_about-me" />
        </li>
        <li>
          <Tab active={isProjects} to={ROUTES.projects} label="_projects" />
        </li>
        <div></div> {/*Caixa para separação dos links*/}
        <li id="_contact-me">
          <Tab active={isContact} to={ROUTES.contact} label="_contact-me" />
        </li>
      </ul>
    </nav>
  );
}
