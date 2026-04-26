"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import {
  ActionModalButton,
  type ActionKind,
} from "@/components/ui/ActionModalButton";
import { getRouteMeta } from "@/lib/navigation";
import { activity, teamMembers } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

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
  const meta = getRouteMeta(pathname);
  const action = actions[pathname];
  const showAction = !hiddenActionRoutes.has(pathname) && action;
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsNotificationsOpen(false);
        searchInputRef.current?.focus();
      }

      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
        searchInputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const notifications = activity.slice(0, 4).map((item) => {
    const member = teamMembers.find((teamMember) => teamMember.id === item.memberId);

    return {
      ...item,
      memberName: member?.name ?? "Team member",
      tone: member?.tone ?? "",
    };
  });
  const priorityNotification = notifications[0];

  return (
    <header className="app-topbar">
      <div className="topbar-title">
        <p className="eyebrow">{meta.eyebrow}</p>
        <h1>{meta.title}</h1>
      </div>

      <form className="topbar-search-wrap" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="topbar-search">
          <AppIcon name="search" />
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search tasks, projects, members"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsNotificationsOpen(false)}
          />
          <kbd>Ctrl K</kbd>
        </label>
      </form>

      <div className="topbar-actions">
        <div className="topbar-notifications">
          <button
            className="icon-button topbar-icon"
            type="button"
            aria-expanded={isNotificationsOpen}
            aria-controls="topbar-notifications-panel"
            aria-label="Notifications"
            onClick={() => {
              searchInputRef.current?.blur();
              setIsNotificationsOpen((current) => !current);
            }}
          >
            <AppIcon name="bell" />
            <span className="topbar-dot" aria-hidden="true" />
          </button>

          {isNotificationsOpen && (
            <section
              className="topbar-popover notifications-popover"
              id="topbar-notifications-panel"
              aria-label="Notifications"
            >
              <div className="topbar-popover-heading">
                <strong>Notifications</strong>
                <span>{notifications.length} new</span>
              </div>

              <article className="notification-item notification-item--recommended">
                <span className="avatar avatar--xs notification-recommendation-icon" aria-hidden="true">
                  <AppIcon name="bell" />
                </span>
                <div>
                  <strong>Recommended next</strong>
                  <span>
                    Review the latest team update from {priorityNotification.memberName} before planning new work.
                  </span>
                  <small>Suggested</small>
                </div>
              </article>

              <div className="topbar-popover-list">
                {notifications.map((notification) => (
                  <article className="notification-item" key={notification.title}>
                    <span className={`avatar avatar--xs ${notification.tone}`}>
                      {notification.memberName
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div>
                      <strong>{notification.title}</strong>
                      <span>{notification.description}</span>
                      <small>{notification.time}</small>
                    </div>
                  </article>
                ))}
              </div>

              <div className="notification-actions">
                <Link className="topbar-popover-link" href={routes.activity} onClick={() => setIsNotificationsOpen(false)}>
                  View all activity
                </Link>
                <button className="topbar-popover-muted" type="button" onClick={() => setIsNotificationsOpen(false)}>
                  Mark as reviewed
                </button>
              </div>
            </section>
          )}
        </div>
        {showAction && (
          <ActionModalButton
            action={action.kind}
            variant="secondary"
            label={action.label}
          />
        )}
      </div>
    </header>
  );
}
