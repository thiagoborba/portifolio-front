// app/page.tsx
import React from 'react';
import './styles.scss';

export default function Page({}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="hello-container ">
      <div className="esq">esq</div>
      <div className="dir">dir</div>
    </div>
  );
}
