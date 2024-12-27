import './styles.scss';
import { HeaderTabs } from '@/Components';
import { FaHamburger } from 'react-icons/fa';

function Button() {
  return (
    <button className="header-button">
      <FaHamburger size={25} />
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
