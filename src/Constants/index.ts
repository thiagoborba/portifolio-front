export const ROUTES = {
  hello: '/',
  about: '/about-me',
  projects: '/projects',
  contact: '/contact-me',
};

export const snippetTamplate = `
  const button = document.querySelector('#sendBtn');

  const message = {
    name: "{{name}}",
    email: "{{email}}",
    message: "{{message}}",
    date: "Thu 21 Apr"
  }

  button.addEventListener('click', () => {
    form.send(message);
  })
`;
