import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <section className={cx("panel", className)} {...props}>
      {children}
    </section>
  );
}
