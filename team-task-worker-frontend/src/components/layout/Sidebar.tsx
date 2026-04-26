"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { AppIcon } from "@/components/ui/AppIcon";
import { isActiveRoute, navigationGroups } from "@/lib/navigation";
import { tasks } from "@/lib/mock-data";

const currentUser = {
  id: "maya",
  name: "Maya Chen",
  role: "Owner",
  initials: "MC",
};

export function Sidebar() {
  const pathname = usePathname();
  const myOpenTaskCount = tasks.filter(
    (task) => task.assigneeId === currentUser.id && task.status !== "Done",
  ).length;

  function getNavigationBadge(label: string) {
    if (label === "My Tasks" && myOpenTaskCount > 0) {
      return String(myOpenTaskCount);
    }

    return undefined;
  }

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

      <nav className="nav-list" aria-label="Workspace sections">
        {navigationGroups.map((group) => (
          <section className="nav-group" key={group.label} aria-label={group.label}>
            <p className="nav-group-label">{group.label}</p>
            {group.items.map((item) => {
              const active = isActiveRoute(pathname, item.href);
              const badge = item.badge ?? getNavigationBadge(item.label);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "active" : ""}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">
                    <AppIcon name={item.icon} />
                  </span>
                  <span className="nav-label">{item.label}</span>
                  {badge && <span className="nav-badge">{badge}</span>}
                </Link>
              );
            })}
          </section>
        ))}
      </nav>

      <div className="sidebar-user">
        <Link href={routes.profile} className="sidebar-user-info">
          <span className="avatar">{currentUser.initials}</span>
          <div>
            <strong>{currentUser.name}</strong>
            <small>{currentUser.role}</small>
          </div>
        </Link>
        <Link href={routes.login} className="icon-button" aria-label="Logout" title="Logout">
          <AppIcon name="login" />
        </Link>
      </div>
    </aside>
  );
}
