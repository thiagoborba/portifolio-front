import './styles.scss';
// import Background from '@/Assets/Svg/Background Blurs.svg?react';

export function Container() {
  return (
    <div className="container">
      <div className="container-left">container left</div>
      <div className="container-right">
        container right
        {/* <Background className="background" /> */}
      </div>
    </div>
  );
}

export default Container;
