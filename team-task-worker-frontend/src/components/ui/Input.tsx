import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  helperText?: string;
  label?: string;
  rightSlot?: ReactNode;
};

export function Input({ error, helperText, label, rightSlot, ...props }: InputProps) {
  if (!label) {
    return <input className={cx("form-input", error && "form-input--error")} aria-invalid={!!error} {...props} />;
  }

  return (
    <label className="form-label">
      {label}
      <span className="input-wrap">
        <input className={cx("form-input", error && "form-input--error")} aria-invalid={!!error} {...props} />
        {rightSlot && <span className="input-slot">{rightSlot}</span>}
      </span>
      {(error || helperText) && <span className={cx("form-help", error && "form-help--error")}>{error ?? helperText}</span>}
    </label>
  );
}
