"use client";

import { usePathname } from "next/navigation";
import { ActionModalButton, type ActionKind } from "@/components/ui/ActionModalButton";
import { routes } from "@/lib/routes";

const titles: Record<string, string> = {
  [routes.dashboard]: "Dashboard",
  [routes.projects]: "Projects",
  [routes.tasks]: "Task Board",
  [routes.myTasks]: "My Tasks",
  [routes.members]: "Members",
  [routes.calendar]: "Calendar",
  [routes.timeline]: "Timeline",
  [routes.analytics]: "Analytics",
  [routes.activity]: "Activity",
  [routes.workload]: "Workload",
  [routes.files]: "Files",
  [routes.automation]: "Automation",
  [routes.clients]: "Client Reviews",
  [routes.profile]: "Profile",
  [routes.workspaceSettings]: "Workspace Settings",
};

const actions: Record<string, ActionKind> = {
  [routes.dashboard]: "task",
  [routes.projects]: "project",
  [routes.tasks]: "task",
  [routes.myTasks]: "task",
  [routes.members]: "member",
  [routes.calendar]: "event",
  [routes.timeline]: "milestone",
  [routes.analytics]: "task",
  [routes.activity]: "comment",
  [routes.workload]: "member",
  [routes.files]: "file",
  [routes.automation]: "automation",
  [routes.clients]: "client",
  [routes.profile]: "task",
  [routes.workspaceSettings]: "project",
};

export function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Workspace";
  const action = actions[pathname] ?? "task";

  return (
    <header className="app-topbar">
      <div>
        <p className="eyebrow">Acme Workspace</p>
        <h1>{title}</h1>
      </div>

      <ActionModalButton action={action} variant="secondary" />
    </header>
  );
}
