import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { contactSchema } from '@utils/validators';

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values) => {
    // Replace with a real call, e.g. api.post('/contact', values)
    await new Promise((resolve) => setTimeout(resolve, 800));
    void values; // values are ready to send to your backend here
    toast.success("Thanks! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="mx-auto max-w-lg">
      
      <h1 className="mb-6 text-3xl font-bold">Contact us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Name"
          placeholder="Jane Doe"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="jane@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <div className="form-control w-full">
          <label htmlFor="message" className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea
            id="message"
            rows={5}
            className="textarea textarea-bordered w-full"
            placeholder="How can we help?"
            {...register('message')}
          />
          {errors.message && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.message.message}</span>
            </label>
          )}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Send message
        </Button>
      </form>
    </div>
  );
}
