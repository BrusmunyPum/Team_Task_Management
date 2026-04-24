"use client";

import Link from "next/link";
import { routes } from "@/lib/routes";

const items = [
  ["Dashboard", routes.dashboard],
  ["Projects", routes.projects],
  ["Tasks", routes.tasks],
  ["Members", routes.members],
] as const;

export function MobileNav() {
  return (
    <nav className="nav-list" aria-label="Mobile navigation">
      {items.map(([label, href]) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
