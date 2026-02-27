import { Input, Textarea } from '@/Components';

export default function Contact() {
  return (
    <div>
      <Input required name="name" label="_name:" errorMessage="" />
      <Input required name="email" label="_email:" errorMessage="" />
      <Textarea required name="message" label="_message:" errorMessage="" />
    </div>
  );
}
