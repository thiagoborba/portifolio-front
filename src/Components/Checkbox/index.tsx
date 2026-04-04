import React, { HTMLProps, Ref, forwardRef } from 'react';
import './checkbox.scss';

interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'prefix'> {
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const CheckboxRender = (
  { label, id, prefix, suffix, ...props }: CheckboxProps,
  ref: Ref<HTMLInputElement>,
) => (
  <label className="checkbox-label" htmlFor={id}>
    <input {...props} id={id} ref={ref} type="checkbox" className="checkbox-input" />
    {prefix}
    {label && <span className="checkbox-text">{label}</span>}
    {suffix}
  </label>
);

export const Checkbox = forwardRef(CheckboxRender);
Checkbox.displayName = 'Checkbox';
