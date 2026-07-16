import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Usage: cn('px-2 py-1', isActive && 'bg-brand-500', className)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
