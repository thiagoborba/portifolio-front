import { HTMLProps, Ref, forwardRef } from 'react';
import './input.scss';

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const InputRender = (
  { className, label, errorMessage, ...props }: InputProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <div className={'v-stack gap'}>
      {!!label && <label htmlFor={props.name}>{label}</label>}
      <input
        {...props}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? 'input-error' : undefined}
        ref={ref}
        className={`input ${className ?? ''}`}
      />

      <span className="error-message" id="input-error" role="alert">
        {errorMessage}
      </span>
    </div>
  );
};

export const Input = forwardRef(InputRender);

Input.displayName = 'Input';
