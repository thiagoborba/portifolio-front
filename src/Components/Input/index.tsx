import './input.scss';

type InputProps = {
  name: string;
  label?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <div className={'v-stack gap'}>
      {!!props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        id={props.name}
        className={`input ${className ?? ''}`}
        aria-invalid={!!props.errorMessage}
        aria-describedby={props.errorMessage ? 'input-error' : undefined}
        {...props}
      />
      {!!props.errorMessage && (
        <span className="error-message" id="input-error" role="alert">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
}
