import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "icon";
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        variant === "primary" && "primary-action",
        variant === "secondary" && "secondary-action",
        variant === "icon" && "icon-button",
        className,
      )}
      type={props.type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
}
