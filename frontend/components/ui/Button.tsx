import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  fullWidth?: boolean;
};

export function Button({ children, className = '', fullWidth = false, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-2xl bg-neon-gradient px-5 py-2.5 text-sm font-semibold text-black transition duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${fullWidth ? 'w-full' : ''} shadow-neon ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
