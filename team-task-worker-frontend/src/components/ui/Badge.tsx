import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  tone?: "danger" | "warning" | "calm" | "progress" | "review" | "neutral" | "done" | "info";
  dot?: boolean;
};

export function Badge({ children, dot = false, tone = "neutral" }: BadgeProps) {
  return (
    <span className={cx("pill", tone)} role="status">
      {dot && <span className="pill-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
