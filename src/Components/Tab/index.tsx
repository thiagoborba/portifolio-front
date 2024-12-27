import styles from './styles.module.scss';
import cn from 'clsx';
import Link from 'next/link';

interface TabProps {
  label: string;
  active?: boolean;
  to: string;
}

export function Tab({ label, active, to, ...props }: TabProps) {
  return (
    <Link
      className={cn(styles['link'], {
        [styles['-active']]: active,
      })}
      href={to}
      {...props}
    >
      {label}
    </Link>
  );
}

export default Tab;
