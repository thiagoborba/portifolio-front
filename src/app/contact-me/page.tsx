'use client';

import Highlighter from './components/Highlight';
import ContactForm from './components/Form';
import { FormProvider } from './context/FormContext';

export default function Contact() {
  return (
    <FormProvider>
      <div className="contact-container">
        <div className="contact">
          <div className="esq">
            <ContactForm />
          </div>
          <div className="dir">
            <Highlighter />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
