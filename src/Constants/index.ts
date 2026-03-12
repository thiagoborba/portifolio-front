export const ROUTES = {
  hello: '/',
  about: '/about-me',
  projects: '/projects',
  contact: '/contact-me',
};

export const snippetTamplate = `
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
