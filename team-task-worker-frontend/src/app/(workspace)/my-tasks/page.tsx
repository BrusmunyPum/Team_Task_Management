"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { tasks, teamMembers } from "@/lib/mock-data";

const statuses = ["All", "To do", "In progress", "Review", "Done"] as const;

export default function MyTasksPage() {
  const currentUser = teamMembers[0];
  const allMyTasks = tasks.filter((task) => task.assigneeId === currentUser.id) as Array<(typeof tasks)[number]>;

  const [query, setQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<string>("All");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTasks = useMemo(
    () =>
      allMyTasks.filter((task) => {
        const matchesSearch =
          !normalizedQuery ||
          `${task.title} ${task.description} ${task.priority}`
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesStatus =
          activeStatus === "All" || task.status === activeStatus;
        return matchesSearch && matchesStatus;
      }),
    [normalizedQuery, activeStatus, allMyTasks],
  );

  return (
    <div className="page-stack">
      <section className="metric-grid">
        <article className="metric-card">
          <span className="metric-icon">
            <AppIcon name="tasks" />
          </span>
          <div>
            <strong>{allMyTasks.length}</strong>
            <small>Assigned to me</small>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon">
            <AppIcon name="calendar" />
          </span>
          <div>
            <strong>
              {allMyTasks.filter((task) => task.priority === "High").length}
            </strong>
            <small>High priority</small>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon">
            <AppIcon name="dashboard" />
          </span>
          <div>
            <strong>
              {allMyTasks.length > 0
                ? Math.round(
                    allMyTasks.reduce(
                      (total, task) => total + task.progress,
                      0,
                    ) / allMyTasks.length,
                  )
                : 0}
              %
            </strong>
            <small>Average progress</small>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon">
            <AppIcon name="folder" />
          </span>
          <div>
            <strong>
              {allMyTasks.filter((task) => (task.status as string) === "Done").length}
            </strong>
            <small>Completed</small>
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Personal queue</p>
            <h2>My tasks overview</h2>
          </div>
        </div>

        <div className="toolbar">
          <label className="search">
            <AppIcon name="search" />
            <input
              type="search"
              placeholder="Search my tasks"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="segmented-control">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                className={activeStatus === status ? "active" : ""}
                onClick={() => setActiveStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid">
          {filteredTasks.map((task) => (
            <article className="task-card" key={task.id}>
              <span
                className={`pill ${task.priority === "High" ? "danger" : task.priority === "Low" ? "calm" : "warning"}`}
              >
                {task.priority}
              </span>
              <h3>
                <Link href={`/tasks/${task.id}`}>{task.title}</Link>
              </h3>
              <p>{task.description}</p>
              <div className="card-meta">
                <span className="pill neutral">{task.status}</span>
                <span className="pill calm">{task.due}</span>
                <span className="pill progress">{task.progress}%</span>
              </div>
            </article>
          ))}
        </div>

        <p className="empty-state" hidden={filteredTasks.length > 0}>
          <AppIcon name="searchOff" />
          No tasks match that filter.
        </p>
      </section>
    </div>
  );
}
