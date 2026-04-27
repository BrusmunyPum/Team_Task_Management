"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getRouteMeta } from "@/lib/navigation";
import { activity, teamMembers } from "@/lib/mock-data";
import { hiddenActionRoutes, pageActions } from "@/lib/page-actions";
import { routes } from "@/lib/routes";

export function Topbar() {
  const pathname = usePathname();
  const meta = getRouteMeta(pathname);
  const action = pageActions[pathname];
  const showAction = !hiddenActionRoutes.has(pathname) && action;
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [reviewedNotifications, setReviewedNotifications] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const notificationsRef = useRef<HTMLDivElement>(null);
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
      id: item.title,
      memberName: member?.name ?? "Team member",
      tone: member?.tone ?? "",
    };
  });
  const unreadNotifications = notifications.filter(
    (notification) => !reviewedNotifications.includes(notification.id),
  );
  const priorityNotification = notifications[0];

  useEffect(() => {
    if (!isNotificationsOpen) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      if (!notificationsRef.current?.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);

    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [isNotificationsOpen]);

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
        <ThemeToggle />
        <div className="topbar-notifications" ref={notificationsRef}>
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
                <span>{unreadNotifications.length} new</span>
              </div>

              {unreadNotifications.length > 0 ? (
                <>
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
                    {unreadNotifications.map((notification) => (
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
                </>
              ) : (
                <p className="topbar-empty">All caught up. New activity will appear here.</p>
              )}

              <div className="notification-actions">
                <Link className="topbar-popover-link" href={routes.activity} onClick={() => setIsNotificationsOpen(false)}>
                  View all activity
                </Link>
                <button
                  className="topbar-popover-muted"
                  type="button"
                  onClick={() => setReviewedNotifications(notifications.map((notification) => notification.id))}
                >
                  Mark all as read
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
