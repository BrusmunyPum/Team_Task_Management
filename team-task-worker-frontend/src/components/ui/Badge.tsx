import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  tone?: "danger" | "warning" | "calm" | "progress" | "review" | "neutral" | "done";
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return <span className={cx("pill", tone)}>{children}</span>;
}
