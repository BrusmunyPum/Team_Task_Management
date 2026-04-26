import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "icon";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Button({
  children,
  className,
  disabled,
  leftIcon,
  loading = false,
  rightIcon,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        variant !== "icon" && "btn",
        variant !== "icon" && `btn--${variant}`,
        variant !== "icon" && `btn--${size}`,
        variant === "icon" && "icon-button",
        loading && "btn--loading",
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      type={type}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        leftIcon && <span className="btn-icon">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && <span className="btn-icon">{rightIcon}</span>}
    </button>
  );
}
