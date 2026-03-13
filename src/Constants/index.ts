export const ROUTES = {
  hello: '/',
  about: '/about-me',
  projects: '/projects',
  contact: '/contact-me',
};

export const snippetTemplate = `
const button = document.querySelector('#sendBtn');

const message = {
  name: "{{name}}",
  email: "{{email}}",
  message: \`{{message}}\`,
  date: "{{date}}"
}

button.addEventListener('click', () => {
  form.send(message);
})
`;
