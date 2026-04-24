"use client";

import { usePathname } from "next/navigation";
import {
  ActionModalButton,
  type ActionKind,
} from "@/components/ui/ActionModalButton";
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

type ActionEntry = {
  kind: ActionKind;
  label: string;
};

const actions: Record<string, ActionEntry> = {
  [routes.dashboard]: { kind: "task", label: "New Task" },
  [routes.projects]: { kind: "project", label: "Create Project" },
  [routes.tasks]: { kind: "task", label: "New Task" },
  [routes.myTasks]: { kind: "task", label: "New Task" },
  [routes.members]: { kind: "member", label: "Add Member" },
  [routes.calendar]: { kind: "event", label: "Add Event" },
  [routes.timeline]: { kind: "milestone", label: "Add Milestone" },
  [routes.analytics]: { kind: "task", label: "New Task" },
  [routes.activity]: { kind: "comment", label: "Add Comment" },
  [routes.workload]: { kind: "member", label: "Add Member" },
  [routes.files]: { kind: "file", label: "Upload File" },
  [routes.automation]: { kind: "automation", label: "New Rule" },
  [routes.clients]: { kind: "client", label: "New Review" },
};

/** Routes where we hide the topbar action button */
const hiddenActionRoutes: Set<string> = new Set([routes.profile, routes.workspaceSettings]);

export function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Workspace";
  const action = actions[pathname];
  const showAction = !hiddenActionRoutes.has(pathname) && action;

  return (
    <header className="app-topbar">
      <div>
        <p className="eyebrow">Acme Workspace</p>
        <h1>{title}</h1>
      </div>

      {showAction && (
        <ActionModalButton
          action={action.kind}
          variant="secondary"
          label={action.label}
        />
      )}
    </header>
  );
}
