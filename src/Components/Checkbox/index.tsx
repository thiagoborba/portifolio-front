import { HTMLProps, Ref, forwardRef } from 'react';
import './checkbox.scss';

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

const CheckboxRender = (
  { label, id, ...props }: CheckboxProps,
  ref: Ref<HTMLInputElement>,
) => (
  <label className="checkbox-label" htmlFor={id}>
    <input {...props} id={id} ref={ref} type="checkbox" className="checkbox-input" />
    {label && <span className="checkbox-text">{label}</span>}
  </label>
);

export const Checkbox = forwardRef(CheckboxRender);
Checkbox.displayName = 'Checkbox';
