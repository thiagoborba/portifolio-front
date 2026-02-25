import { Input } from '@/Components';

export default function Contact() {
  return (
    <div>
      <Input name="email" label="_email:" errorMessage="Wrong email address" />
    </div>
  );
}
