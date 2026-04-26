"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { AppIcon } from "@/components/ui/AppIcon";
import { isActiveRoute, navigationGroups } from "@/lib/navigation";

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

      <nav className="nav-list" aria-label="Workspace sections">
        {navigationGroups.map((group) => (
          <section className="nav-group" key={group.label} aria-label={group.label}>
            <p className="nav-group-label">{group.label}</p>
            {group.items.map((item) => {
              const active = isActiveRoute(pathname, item.href);

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
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </Link>
              );
            })}
          </section>
        ))}
      </nav>

      <div className="sidebar-user">
        <Link href={routes.profile} className="sidebar-user-info">
          <span className="avatar">MC</span>
          <div>
            <strong>Maya Chen</strong>
            <small>Owner</small>
          </div>
        </Link>
        <Link href={routes.login} className="icon-button" aria-label="Logout" title="Logout">
          <AppIcon name="login" />
        </Link>
      </div>
    </aside>
  );
}
