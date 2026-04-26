"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon } from "@/components/ui/AppIcon";
import { isActiveRoute, mobileNavigationItems } from "@/lib/navigation";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {mobileNavigationItems.map((item) => {
        const active = isActiveRoute(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? "active" : ""}
            aria-current={active ? "page" : undefined}
          >
            <AppIcon name={item.icon} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
