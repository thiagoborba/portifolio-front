'use client';

import React from 'react';
import Highlighter from './components/Highlight';
import ContactForm from './components/Form';

export default function Contact() {
  const [snippetCode] = React.useState('');

  return (
    <div className="contact">
      <ContactForm />
      <div className="dir">
        <Highlighter>{snippetCode}</Highlighter>
      </div>
    </div>
  );
}
