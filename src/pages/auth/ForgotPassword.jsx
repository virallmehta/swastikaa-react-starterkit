import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Seo } from '@components/common/Seo';
import { forgotPasswordSchema } from '@utils/validators';
import { authService } from '@services/authService';
import { ROUTES } from '@constants/routes';

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async ({ email }) => {
    try {
      await authService.forgotPassword(email);
      toast.success('Check your inbox for a reset link');
      reset();
    } catch (err) {
      toast.error(err.message || 'Could not send reset email');
    }
  };

  return (
    <div>
      <Seo title="Forgot password" noIndex />
      <h1 className="mb-1 text-2xl font-bold">Reset your password</h1>
      <p className="text-base-content/60 mb-6 text-sm">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Send reset link
        </Button>
      </form>

      <p className="text-base-content/60 mt-6 text-center text-sm">
        <Link to={ROUTES.LOGIN} className="link-underline text-base-content font-medium">
          Back to login
        </Link>
      </p>
    </div>
  );
}
