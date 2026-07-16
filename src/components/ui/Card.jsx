import { cn } from '@utils/cn';

export function Card({ children, className, ...props }) {
  return (
    <div className={cn('card-surface p-6', className)} {...props}>
      {children}
    </div>
  );
}
