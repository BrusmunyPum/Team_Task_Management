"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";
import { routes } from "@/lib/routes";

const items = [
  { label: "Home", href: routes.dashboard, icon: "dashboard" },
  { label: "Projects", href: routes.projects, icon: "workspace" },
  { label: "Tasks", href: routes.tasks, icon: "tasks" },
  { label: "Team", href: routes.members, icon: "groups" },
  { label: "Profile", href: routes.profile, icon: "login" },
] satisfies Array<{ label: string; href: string; icon: AppIconName }>;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={pathname.startsWith(item.href) ? "active" : ""}
        >
          <AppIcon name={item.icon} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
