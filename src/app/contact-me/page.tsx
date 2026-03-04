'use client';

import { Input, Textarea, Button } from '@/Components';
import ShikiHighlighter from 'react-shiki';

export default function Contact() {
  const codeString = `
const button = document.querySelector('#sendBtn');

const message = {
	name: "Jonathan Davis",
	email: "jonathan-davis@gmail.com",
	message: "Hey! Just checked your website and it looks .awesome! Also, I checked your articled on Medium. Lerned a .few nice tips. Than|",
	date: "Thu 21 Apr"
}

button.addEventListener('click', () => {
	form.send(message);
})
  `;
  return (
    <div className="contact">
      <div className="esq">
        <Input required name="name" label="_name:" errorMessage="" />
        <Input required name="email" label="_email:" errorMessage="" />
        <Textarea
          required
          name="message"
          placeholder="your message here..."
          label="_message:"
          errorMessage=""
        />
        <Button variant="secondary" type="submit">
          submit-message
        </Button>
      </div>
      <div className="dir">
        <ShikiHighlighter
          rootStyle="background-color: transparent; width: 100%; height: 100%;"
          preloadLanguages={['typescript']}
          showLineNumbers
          language="typescript"
          theme="dracula"
        >
          {codeString.trim()}
        </ShikiHighlighter>
      </div>
    </div>
  );
}
