'use client';

import './styles.scss';
import { useState } from 'react';
import { HeaderTabs } from '@/Components';
import { MobileNav } from '@/Components/MobileNav';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header>
        <div className="name-container">
          <span>thiago-borba</span>
          <button className="header-button" onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? <IoClose size={25} /> : <RxHamburgerMenu size={25} />}
          </button>
        </div>
        <HeaderTabs className="header-tabs" />
      </header>

      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;
