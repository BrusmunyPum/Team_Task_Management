import Link from "next/link";
import { routes } from "@/lib/routes";

const navigationItems = [
  { label: "Dashboard", href: routes.dashboard },
  { label: "Projects", href: routes.projects },
  { label: "Tasks", href: routes.tasks },
  { label: "Members", href: routes.members },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-800 bg-slate-900/80 px-4 py-6 lg:block">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Team Task
        </p>
        <h1 className="mt-1 text-xl font-bold text-white">Worker</h1>
      </div>

      <nav className="mt-8 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}