'use client';

import Highlighter from './components/Highlight';
import ContactForm from './components/Form';
import { FormProvider } from '@/contexts/FormContext';

export default function Contact() {
  return (
    <FormProvider>
      <h1 className="sr-only">Contact Thiago Borba</h1>
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
