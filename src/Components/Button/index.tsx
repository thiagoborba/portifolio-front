import styles from './button.module.scss';
import { forwardRef, Ref } from 'react';
import cn from 'clsx';

type variant = 'primary' | 'secondary';
type ButtonProps = {
  variant?: variant;
} & React.ComponentProps<'button'>;

const ButtonRender = (
  { variant = 'primary', className, children, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  return (
    <button
      {...props}
      ref={ref}
      className={cn(styles.button, className, {
        [styles['-primary']]: variant === 'primary',
        [styles['-secondary']]: variant === 'secondary',
      })}
    >
      {children}
    </button>
  );
};

export const Button = forwardRef(ButtonRender);

Button.displayName = 'Button';
