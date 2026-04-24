"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon } from "@/components/ui/AppIcon";
import { routes } from "@/lib/routes";

const tabs = [
  { label: "Profile", href: routes.profile, icon: "login" as const },
  {
    label: "Workspace",
    href: routes.workspaceSettings,
    icon: "workspace" as const,
  },
];

export function SettingsTabs() {
  const pathname = usePathname();

  return (
    <nav className="settings-tabs" aria-label="Settings navigation">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={pathname === tab.href ? "active" : ""}
        >
          <AppIcon name={tab.icon} />
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
