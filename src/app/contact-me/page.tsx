'use client';

import React from 'react';
import Highlighter from './components/Highlight';
import ContactForm from './components/Form';
import { FormProvider } from './context/FormContext';

export default function Contact() {
  return (
    <FormProvider>
      <div className="contact">
        <div className="esq">
          <ContactForm />
        </div>
        <div className="dir">
          <Highlighter />
        </div>
      </div>
    </FormProvider>
  );
}
