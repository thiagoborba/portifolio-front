'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Button } from '@/Components';
import { useFormContext } from '../../context/FormContext';

export interface Inputs {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const { values, setValues, setValue } = useFormContext();
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: values,
  });

  const onSubmit = (data: Inputs) => {
    setValues(data);
    console.log(data, 'dados enviados');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('name', {
          required: true,
          onChange: (e) => setValue('name', e.target.value),
        })}
        label="_name:"
      />
      <Input
        {...register('email', {
          required: true,
          onChange: (e) => setValue('email', e.target.value),
        })}
        label="_email:"
      />
      <Textarea
        {...register('message', {
          required: true,
          onChange: (e) => setValue('message', e.target.value),
        })}
        placeholder="your message here..."
        label="_message:"
      />
      <Button type="submit">submit-message</Button>
    </form>
  );
};

export default ContactForm;
