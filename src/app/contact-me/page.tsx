'use client';

import Highlighter from './components/Highlight';
import ContactForm from './components/Form';
import { SideBarContent } from './components/Sidebar';
import { FormProvider } from './context/FormContext';

export default function Contact() {
  return (
    <FormProvider>
      <div className="contact-container">
        <div className="decorator-contact">
          <div className="decorator-content">
            <SideBarContent open={false} />
          </div>
        </div>
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
