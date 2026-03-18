import './styles.scss';
import { HeaderTabs } from '@/Components';
import { RxHamburgerMenu } from 'react-icons/rx';

function Button() {
  return (
    <button className="header-button">
      <RxHamburgerMenu size={25} />
    </button>
  );
}

export function Header() {
  return (
    <header>
      <div className="name-container">
        <span>thiago-borba</span>
        <Button />
      </div>
      <HeaderTabs className="header-tabs" />
    </header>
  );
}

export default Header;
