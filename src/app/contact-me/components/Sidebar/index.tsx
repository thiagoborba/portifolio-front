import Sidebar from '@/Components/Sidebar';
import { Collapse } from '@/Components/Collapse';
import { SidebarItem } from '../sidebar-item';

type contact = {
  href: string;
  value: string;
  type: 'email' | 'tel' | 'social';
};

type contacts = {
  label: string;
  contacts: contact[];
};

export const contactData: contacts[] = [
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
        value: 'instagram',
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
        value: 'linkedin',
        href: 'https://www.linkedin.com/in/thborba/',
      },
    ],
  },
];

export function SideBarContent({ open }: { open?: boolean }) {
  return (
    <>
      {contactData.map(({ label, contacts }) => {
        return (
          <Collapse open={!!open} key={label} title={label}>
            <ul className="ul-sidebar">
              {contacts.map(({ value, href, type }) => (
                <SidebarItem
                  key={value}
                  type={type}
                  value={value}
                  href={href}
                />
              ))}
            </ul>
          </Collapse>
        );
      })}
    </>
  );
}

export default function SidebarContact() {
  return (
    <Sidebar>
      <SideBarContent open={true} />
    </Sidebar>
  );
}
