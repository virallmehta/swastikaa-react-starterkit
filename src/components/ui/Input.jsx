import { forwardRef } from 'react';
import { cn } from '@utils/cn';

/**
 * Forward-ref input so it can be registered directly with react-hook-form:
 * <Input label="Email" error={errors.email?.message} {...register('email')} />
 */
export const Input = forwardRef(({ label, error, className, id, ...props }, ref) => {
  const inputId = id || props.name;
  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={inputId} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={cn('input input-bordered w-full', error && 'input-error', className)}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
});

Input.displayName = 'Input';
