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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
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
          required: 'Name is required',
          minLength: {
            value: 3,
            message: 'Name must have at least 3 characters',
          },
          maxLength: {
            value: 50,
            message: 'Name must have at most 50 characters',
          },
          validate: (value) => {
            const words = value
              .trim()
              .split(/\s+/)
              .filter((word) => word.length >= 2);

            if (words.length < 2) {
              return 'Enter a valid first and last name';
            }

            return true;
          },
          onChange: (e) => setValue('name', e.target.value),
        })}
        label="_name:"
        errorMessage={errors.name?.message}
        aria-invalid={!!errors.email?.message}
      />
      <Input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
          onChange: (e) => setValue('email', e.target.value),
        })}
        label="_email:"
        errorMessage={errors.email?.message}
        aria-invalid={!!errors.email?.message}
      />
      <Textarea
        {...register('message', {
          required: 'Message is required',
          onChange: (e) => setValue('message', e.target.value),
        })}
        placeholder="your message here..."
        label="_message:"
        errorMessage={errors.message?.message}
        aria-invalid={!!errors.message?.message}
      />
      <Button type="submit" disabled={loading}>
        {loading ? '...loading' : 'submit-message'}
      </Button>
    </form>
  );
};

export default ContactForm;
