import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  if (!label) {
    return <input className="form-input" {...props} />;
  }

  return (
    <label className="form-label">
      {label}
      <input className="form-input" {...props} />
    </label>
  );
}
