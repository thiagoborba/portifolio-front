import './input.scss';

type InputProps = {
  name: string;
  label?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  className,
  errorMessage,
  label,
  name,
  ...props
}: InputProps) {
  return (
    <div className={'v-stack gap'}>
      {!!label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        className={`input icon ${className ?? ''}`}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? 'input-error' : undefined}
        autoComplete={name}
        {...props}
      />

      {!!errorMessage && (
        <span className="error-message" id="input-error" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
