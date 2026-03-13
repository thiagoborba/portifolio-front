import { forwardRef, HTMLProps, Ref } from 'react';
import '../Input/input.scss';
interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}

const TextareaRender = (
  { className, errorMessage, label, ...props }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>,
) => {
  return (
    <div className={'v-stack gap'}>
      {!!label && <label htmlFor={props.name}>{label}</label>}
      <textarea
        {...props}
        ref={ref}
        className={`input ${className ?? ''}`}
      ></textarea>
      <span className="error-message" id="input-error" role="alert">
        {errorMessage}
      </span>
    </div>
  );
};

export const Textarea = forwardRef(TextareaRender);

Textarea.displayName = 'Textarea';
