"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { AppIcon } from "@/components/ui/AppIcon";

const navigationItems = [
  { label: "Dashboard", icon: "dashboard", href: routes.dashboard },
  { label: "Projects", icon: "workspace", href: routes.projects },
  { label: "Tasks", icon: "tasks", href: routes.tasks },
  { label: "My Tasks", icon: "tasks", href: routes.myTasks },
  { label: "Members", icon: "groups", href: routes.members },
  { label: "Calendar", icon: "calendar", href: routes.calendar },
  { label: "Timeline", icon: "calendar", href: routes.timeline },
  { label: "Analytics", icon: "dashboard", href: routes.analytics },
  { label: "Activity", icon: "playlistAdd", href: routes.activity },
  { label: "Workload", icon: "groups", href: routes.workload },
  { label: "Files", icon: "folder", href: routes.files },
  { label: "Automation", icon: "rocket", href: routes.automation },
  { label: "Clients", icon: "workspace", href: routes.clients },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <Link className="brand" href={routes.dashboard} aria-label="TeamTask Pro">
        <span className="brand-mark" aria-hidden="true">
          <AppIcon name="hub" />
        </span>
        <span>
          <strong>TeamTask Pro</strong>
          <small>Project Management</small>
        </span>
      </Link>

      <nav className="nav-list">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname.startsWith(item.href) ? "active" : ""}
          >
            <span className="nav-icon" aria-hidden="true">
              <AppIcon name={item.icon} />
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-note">
        <span className="nav-icon" aria-hidden="true">
          <AppIcon name="home" />
        </span>
        <div>
          <strong>Website Home</strong>
          <Link href={routes.login}>Logout</Link>
        </div>
      </div>
    </aside>
  );
}
