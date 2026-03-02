import Sidebar from '@/Components/Sidebar';
import { Collapse } from '@/Components/Collapse';

type contact = {
  href: string;
  value: string;
  type: 'email' | 'tel' | 'social';
};

type contacts = {
  label: string;
  contacts: contact[];
};

const data: contacts[] = [
  {
    label: 'contacts',
    contacts: [
      {
        type: 'email',
        value: 'thiagoborbadev@gmail.com',
        href: 'mailto:thiagoborbadev@gmail.com',
      },
      {
        type: 'tel',
        value: '+55 (51) 99933-0027',
        href: 'tel:+5551999330027',
      },
    ],
  },
  {
    label: 'find-me-also-in',
    contacts: [
      {
        value: 'Instagram',
        type: 'social',
        href: 'https://www.instagram.com/thiagoborbaa/',
      },
      {
        type: 'social',
        value: 'github',
        href: 'https://github.com/thiagoborba',
      },
      {
        type: 'social',
        value: 'Linkedin',
        href: 'https://www.linkedin.com/in/thborba/',
      },
    ],
  },
];

export default function SidebarContact() {
  return (
    <div className="h-stack">
      <Sidebar>
        {data.map(({ label, contacts }) => {
          return (
            <Collapse key={label} title={label}>
              <ul>
                {contacts.map(({ value, href }) => (
                  <li key={value}>
                    <a href={href}>{value}</a>
                  </li>
                ))}
              </ul>
            </Collapse>
          );
        })}
      </Sidebar>
    </div>
  );
}
