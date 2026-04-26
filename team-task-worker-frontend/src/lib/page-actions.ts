import type { ActionKind } from "@/components/ui/ActionModalButton";
import { routes } from "@/lib/routes";

export type PageAction = {
  kind: ActionKind;
  label: string;
};

export const pageActions: Record<string, PageAction> = {
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

export const hiddenActionRoutes: Set<string> = new Set([
  routes.profile,
  routes.workspaceSettings,
]);
