import './styles.scss';
import { HeaderTabs } from '@/Components';
// import MenuIcon from '@/Assets/Svg/menu-line.svg';

// // function Button() {
// //   return (
// //     <button onClick={() => alert('olá Adão')} className="header-button">
// //       <MenuIcon />
// //     </button>
// //   );
// // }
// // }

export function Header() {
  return (
    <header>
      <div className="name-container">
        <span>thiago-borba</span>
        {/* <Button /> */}
      </div>
      <HeaderTabs className="header-tabs" />
    </header>
  );
}

export default Header;
