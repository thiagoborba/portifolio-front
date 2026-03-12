'use client';

import { useForm } from 'react-hook-form';
import { Input, Textarea, Button } from '@/Components';

interface Inputs {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data, 'asdasd');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="esq">
      <Input {...register('name', { required: true })} label="_name:" />
      <Input {...register('email', { required: true })} label="_email:" />
      <Textarea
        {...register('message', { required: true })}
        placeholder="your message here..."
        label="_message:"
      />
      <Button type="submit">submit-message</Button>
    </form>
  );
};

export default ContactForm;
