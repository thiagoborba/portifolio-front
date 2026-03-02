import Sidebar from '@/Components/Sidebar';
import { Collapse } from '@/Components/Collapse';

export default function SidebarContact() {
  return (
    <div className="h-stack">
      <Sidebar>
        <Collapse title="contacts">
          <ul>
            <li>
              <a>thiagohborbadev@gmail.com</a>
            </li>
            <li>
              <a>+55 (51) 99933-0027</a>
            </li>
          </ul>
        </Collapse>
        <Collapse title="find-me-also-in">
          <ul>
            <li>
              <a>Instagram</a>
            </li>
            <li>
              <a>github</a>
            </li>
            <li>
              <a>Linkedin</a>
            </li>
          </ul>
        </Collapse>
      </Sidebar>
    </div>
  );
}
