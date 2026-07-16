import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Seo } from '@components/common/Seo';
import { useAuth } from '@hooks/useAuth';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
});

export default function Profile() {
  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const onSubmit = async (values) => {
    // Replace with userService.updateProfile(values)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setUser({ ...user, ...values });
    toast.success('Profile updated');
  };

  return (
    <div className="max-w-lg space-y-6">
      <Seo title="Profile" noIndex />
      <h1 className="text-2xl font-bold">Profile</h1>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input label="Full name" error={errors.name?.message} {...register('name')} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Button type="submit" isLoading={isSubmitting}>
            Save changes
          </Button>
        </form>
      </Card>
    </div>
  );
}
