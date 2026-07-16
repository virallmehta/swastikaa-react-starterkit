import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Seo } from '@components/common/Seo';
import { loginSchema } from '@utils/validators';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@constants/routes';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values) => {
    try {
      await login(values);
      navigate(location.state?.from || ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid email or password');
    }
  };

  return (
    <div>
      <Seo title="Login" noIndex />
      <h1 className="mb-1 text-2xl font-bold">Welcome back</h1>
      <p className="text-base-content/60 mb-6 text-sm">Log in to continue to your dashboard.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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

        <div className="flex justify-end">
          <Link to={ROUTES.FORGOT_PASSWORD} className="link-underline text-sm">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Log in
        </Button>
      </form>

      <p className="text-base-content/60 mt-6 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to={ROUTES.REGISTER} className="link-underline text-base-content font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
