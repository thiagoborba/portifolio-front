import styles from './styles.module.scss';
import cn from 'clsx';

interface TabProps {
  label: string;
  active?: boolean;
  to: string;
}

export function Tab({ label, active, to, ...props }: TabProps) {
  return (
    <a
      className={cn(styles['link'], {
        [styles['-active']]: active,
      })}
      href={to}
      {...props}
    >
      {label}
    </a>
  );
}

export default Tab;
