import type { ReactNode } from "react";
import { AppIcon } from "@/components/ui/AppIcon";

type EmptyStateProps = {
  children: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  title?: string;
};

export function EmptyState({ action, children, icon, title }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon ?? <AppIcon name="searchOff" />}
      {title && <strong>{title}</strong>}
      <p>{children}</p>
      {action}
    </div>
  );
}
