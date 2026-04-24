import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow = "Acme Workspace", title, children }: PageHeaderProps) {
  return (
    <header className="app-topbar">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      {children}
    </header>
  );
}
