import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className = '', ...props },
  ref
) {
  return (
    <label className="block space-y-2 text-sm text-text/80">
      <span>{label}</span>
      <input
        ref={ref}
        className={`w-full rounded-2xl border border-border bg-[#0D1218] px-4 py-2.5 text-text outline-none transition focus:border-neon ${className}`}
        {...props}
      />
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </label>
  );
});
