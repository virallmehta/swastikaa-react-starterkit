import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Seo } from '@components/common/Seo';
import { registerSchema } from '@utils/validators';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@constants/routes';

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values) => {
    try {
      await registerUser(values);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Could not create account');
    }
  };

  return (
    <div>
      <Seo title="Create account" noIndex />
      <h1 className="mb-1 text-2xl font-bold">Create your account</h1>
      <p className="text-base-content/60 mb-6 text-sm">Start your free trial — no card needed.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Full name"
          placeholder="Jane Doe"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Create account
        </Button>
      </form>

      <p className="text-base-content/60 mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="link-underline text-base-content font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
