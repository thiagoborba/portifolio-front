// app/page.tsx
import React from 'react';
import Image from 'next/image';
import './styles.scss';

export default function Page() {
  return (
    <div className="hello-container ">
      <div className="esq">
        <div className="top">
          <p className="greeting">Hi all. I am</p>
          <h1 className="name">Thiago Borba</h1>
          <p className="job">{'> Front-end developer'}</p>
        </div>

        <div className="bottom">
          <p>{'// complete the game to continue'}</p>
          <p>{'// you can also see it on my Github page'}</p>
          <p>const githubLink = “https://github.com/example/url”</p>
        </div>
      </div>

      <div className="dir">
        <Image width={510} height={475} src="/game.png" alt="Thiago Borba" />
      </div>
    </div>
  );
}
