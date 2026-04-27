import type { ReactNode } from "react";
import { AppIcon } from "@/components/ui/AppIcon";

type ErrorStateProps = {
  action?: ReactNode;
  description?: string;
  title?: string;
};

export function ErrorState({
  action,
  description = "Please try again.",
  title = "Something went wrong",
}: ErrorStateProps) {
  return (
    <section className="error-state" role="alert">
      <AppIcon name="error" />
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </section>
  );
}
