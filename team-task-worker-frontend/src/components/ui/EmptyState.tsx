import type { ReactNode } from "react";
import { AppIcon } from "@/components/ui/AppIcon";

type EmptyStateProps = {
  children: ReactNode;
};

export function EmptyState({ children }: EmptyStateProps) {
  return (
    <p className="empty-state">
      <AppIcon name="searchOff" />
      {children}
    </p>
  );
}
