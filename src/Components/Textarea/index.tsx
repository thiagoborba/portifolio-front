import '../Input/input.scss';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  errorMessage?: string;
}

export const Textarea = ({
  label,
  name,
  errorMessage,
  className,
  ...props
}: TextAreaProps) => {
  return (
    <div className={'v-stack gap'}>
      {!!label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        className={`input ${className ?? ''}`}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? 'input-error' : undefined}
        autoComplete={name}
        {...props}
      ></textarea>
      <span className="error-message" id="input-error" role="alert">
        {errorMessage}
      </span>
    </div>
  );
};
