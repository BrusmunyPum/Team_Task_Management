"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { isBeforeToday } from "@/lib/date";
import { tasks, teamMembers } from "@/lib/mock-data";

const columns = [
  { name: "To do", color: "var(--color-status-todo)" },
  { name: "In progress", color: "var(--color-status-progress)" },
  { name: "Review", color: "var(--color-status-review)" },
  { name: "Done", color: "var(--color-status-done)" },
] as const;

function priorityTone(priority: string) {
  if (priority === "High" || priority === "Urgent") {
    return "danger";
  }

  if (priority === "Low") {
    return "calm";
  }

  return "warning";
}

function isPastDue(dueDate: string) {
  return isBeforeToday(dueDate);
}

export function TaskBoardClient() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleCount = useMemo(
    () =>
      tasks.filter((task) => {
        const assignee = teamMembers.find((member) => member.id === task.assigneeId);
        const searchable = `${task.title} ${task.description} ${task.priority} ${assignee?.name ?? ""}`;

        return searchable.toLowerCase().includes(normalizedQuery);
      }).length,
    [normalizedQuery],
  );
  const openCount = tasks.filter((task) => task.status !== "Done").length;
  const reviewCount = tasks.filter((task) => task.status === "Review").length;
  const highPriorityCount = tasks.filter((task) => ["High", "Urgent"].includes(task.priority)).length;

  return (
    <>
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Kanban</p>
            <h2>Task status workflow</h2>
          </div>
          <div className="section-summary">
            <span>{openCount} open</span>
            <span>{reviewCount} review</span>
            <span>{highPriorityCount} high priority</span>
          </div>
        </div>

        <div className="toolbar board-toolbar">
          <label className="search">
            <AppIcon name="search" />
            <input
              type="search"
              placeholder="Search tasks or assignees"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {query && (
            <button className="secondary-action board-clear-action" type="button" onClick={() => setQuery("")}>
              <AppIcon name="close" />
              Clear
            </button>
          )}
        </div>

        <div className="board-grid" aria-label="Task status columns">
          {columns.map((column) => {
            const visibleTasks = tasks.filter(
              (task) => {
                const assignee = teamMembers.find((member) => member.id === task.assigneeId);
                const searchable = `${task.title} ${task.description} ${task.priority} ${assignee?.name ?? ""}`;

                return (
                  task.status === column.name &&
                  (!normalizedQuery || searchable.toLowerCase().includes(normalizedQuery))
                );
              },
            );

            return (
              <section
                className="board-column"
                key={column.name}
                aria-label={`${column.name} column, ${visibleTasks.length} tasks`}
              >
                <header>
                  <div>
                    <span className="board-column-title">
                      <i style={{ background: column.color }} aria-hidden="true" />
                      {column.name}
                    </span>
                    <small>{visibleTasks.length === 1 ? "1 task" : `${visibleTasks.length} tasks`}</small>
                  </div>
                  <span>{visibleTasks.length}</span>
                </header>
                {visibleTasks.length === 0 && (
                  <EmptyState title="No tasks here">Move work into this stage when it is ready.</EmptyState>
                )}
                {visibleTasks.map((task) => {
                  const assignee = teamMembers.find((member) => member.id === task.assigneeId);
                  const overdue = isPastDue(task.dueDate) && task.status !== "Done";

                  return (
                    <article className="task-card" key={task.id}>
                      <span className={`task-priority-bar ${priorityTone(task.priority)}`} aria-hidden="true" />
                      <div className="task-card-topline">
                        <span className={`pill ${priorityTone(task.priority)}`}>{task.priority}</span>
                        <span className={`task-due ${overdue ? "overdue" : ""}`}>
                          <AppIcon name="calendar" />
                          {task.due}
                        </span>
                      </div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <div className="task-progress" aria-label={`${task.progress}% complete`}>
                        <span style={{ width: `${task.progress}%` }} />
                      </div>
                      <div className="task-card-progress-label">
                        <span>{task.progress}% complete</span>
                        <span>{task.status}</span>
                      </div>
                      <div className="card-meta">
                        {assignee && <Avatar name={assignee.name} size="sm" tone={assignee.tone} />}
                        <span className="task-card-stat">{task.comments} comments</span>
                        <span className="task-card-stat">{task.attachments} files</span>
                        <Link className="auth-link" href={`/tasks/${task.id}`}>
                          Open
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </section>
            );
          })}
        </div>

        {visibleCount === 0 && <EmptyState title="No matching tasks">Try a task title, priority, or assignee name.</EmptyState>}
      </section>

      <div className="modal-backdrop" hidden={!isModalOpen} onClick={() => setIsModalOpen(false)}>
        <section
          className="task-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="taskModalTitle"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Task form</p>
              <h2 id="taskModalTitle">Create or edit task</h2>
            </div>
            <button
              className="icon-button"
              type="button"
              aria-label="Close task form"
              onClick={() => setIsModalOpen(false)}
            >
              <AppIcon name="close" />
            </button>
          </div>
          <form className="task-form">
            <label>
              Title
              <input type="text" defaultValue="Write API error response contract" />
            </label>
            <label>
              Description
              <textarea defaultValue="Define shared error shapes before frontend integration." />
            </label>
            <div className="form-grid">
              <label>
                Status
                <select defaultValue="In progress">
                  <option>To do</option>
                  <option>In progress</option>
                  <option>Review</option>
                  <option>Done</option>
                </select>
              </label>
              <label>
                Priority
                <select defaultValue="Medium">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </label>
            </div>
            <div className="form-grid">
              <label>
                Assignee
                <select defaultValue="Maya Chen">
                  <option>Maya Chen</option>
                  <option>Niran Patel</option>
                  <option>Lena Ortiz</option>
                  <option>Sam Rivera</option>
                </select>
              </label>
              <label>
                Due date
                <input type="date" defaultValue="2026-05-06" />
              </label>
            </div>
            <div className="modal-actions">
              <button
                className="secondary-action"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="primary-action" type="button" onClick={() => setIsModalOpen(false)}>
                <AppIcon name="save" />
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
