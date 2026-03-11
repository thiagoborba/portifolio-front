import styles from './button.module.scss';
import cn from 'clsx';

type variant = 'primary' | 'secondary';
type ButtonProps = {
  variant?: variant;
} & React.ComponentProps<'button'>;

export const Button = ({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(styles['button'], className, {
        [styles['-primary']]: variant === 'primary',
        [styles['-secondary']]: variant === 'secondary',
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
