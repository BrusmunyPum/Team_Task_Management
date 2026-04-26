import type { AppIconName } from "@/components/ui/AppIcon";
import { routes } from "@/lib/routes";

export type NavigationItem = {
  label: string;
  href: string;
  icon: AppIconName;
  badge?: string;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Work",
    items: [
      { label: "Dashboard", icon: "dashboard", href: routes.dashboard },
      { label: "Projects", icon: "workspace", href: routes.projects },
      { label: "Tasks", icon: "tasks", href: routes.tasks },
      { label: "My Tasks", icon: "tasks", href: routes.myTasks },
    ],
  },
  {
    label: "Team",
    items: [
      { label: "Members", icon: "groups", href: routes.members },
      { label: "Workload", icon: "groups", href: routes.workload },
      { label: "Activity", icon: "playlistAdd", href: routes.activity },
    ],
  },
  {
    label: "Planning",
    items: [
      { label: "Calendar", icon: "calendar", href: routes.calendar },
      { label: "Timeline", icon: "calendar", href: routes.timeline },
      { label: "Analytics", icon: "dashboard", href: routes.analytics },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Files", icon: "folder", href: routes.files },
      { label: "Automation", icon: "rocket", href: routes.automation },
      { label: "Clients", icon: "workspace", href: routes.clients },
    ],
  },
];

export const mobileNavigationItems: NavigationItem[] = [
  { label: "Home", href: routes.dashboard, icon: "dashboard" },
  { label: "Projects", href: routes.projects, icon: "workspace" },
  { label: "Tasks", href: routes.tasks, icon: "tasks" },
  { label: "Team", href: routes.members, icon: "groups" },
  { label: "More", href: routes.profile, icon: "more" },
];

export const routeMeta: Record<string, { title: string; eyebrow: string; description?: string }> = {
  [routes.dashboard]: {
    title: "Dashboard",
    eyebrow: "Acme Workspace",
    description: "A clear snapshot of risks, deadlines, and team momentum.",
  },
  [routes.projects]: { title: "Projects", eyebrow: "Portfolio" },
  [routes.tasks]: { title: "Task Board", eyebrow: "Kanban" },
  [routes.myTasks]: { title: "My Tasks", eyebrow: "Personal queue" },
  [routes.members]: { title: "Members", eyebrow: "Team" },
  [routes.calendar]: { title: "Calendar", eyebrow: "Schedule" },
  [routes.timeline]: { title: "Timeline", eyebrow: "Planning" },
  [routes.analytics]: { title: "Analytics", eyebrow: "Reporting" },
  [routes.activity]: { title: "Activity", eyebrow: "Updates" },
  [routes.workload]: { title: "Workload", eyebrow: "Capacity" },
  [routes.files]: { title: "Files", eyebrow: "Shared assets" },
  [routes.automation]: { title: "Automation", eyebrow: "Rules" },
  [routes.clients]: { title: "Client Reviews", eyebrow: "Stakeholders" },
  [routes.profile]: { title: "Profile", eyebrow: "Settings" },
  [routes.workspaceSettings]: { title: "Workspace Settings", eyebrow: "Admin" },
};

export function isActiveRoute(pathname: string, href: string) {
  if (href === routes.dashboard) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getRouteMeta(pathname: string) {
  const exact = routeMeta[pathname];
  if (exact) {
    return exact;
  }

  if (pathname.startsWith(`${routes.projects}/`)) {
    return { title: "Project Detail", eyebrow: "Project" };
  }

  if (pathname.startsWith(`${routes.tasks}/`)) {
    return { title: "Task Detail", eyebrow: "Task" };
  }

  return { title: "Workspace", eyebrow: "Acme Workspace" };
}
