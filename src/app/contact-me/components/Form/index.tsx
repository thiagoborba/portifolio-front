'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Button } from '@/Components';
import { useFormContext } from '../../context/FormContext';

export interface Inputs {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const { values, setValue } = useFormContext();
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: values,
  });

  const onSubmit = (data: Inputs) => {
    submitForm(data);
  };

  async function submitForm(data: Inputs) {
    setLoading(true);
    try {
      const { email, message, name } = data;
      const payload = {
        name,
        email,
        message,
      };

      const response = await fetch(
        'https://portifolio-back-iota.vercel.app/contact-form',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
      } else {
        alert('Erro: ' + result.error);
      }
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  }

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
      <Button type="submit" disabled={loading}>
        {loading ? '...loading' : 'submit-message'}
      </Button>
    </form>
  );
};

export default ContactForm;
