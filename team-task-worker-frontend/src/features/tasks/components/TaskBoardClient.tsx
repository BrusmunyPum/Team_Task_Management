"use client";

import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { EmptyState } from "@/components/ui/EmptyState";
import { isBeforeToday } from "@/lib/date";
import { tasks, teamMembers } from "@/lib/mock-data";
import { TaskColumn } from "@/features/tasks/components/TaskColumn";

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

  const assigneeById = useMemo(
    () => new Map(teamMembers.map((member) => [member.id, member])),
    [],
  );
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTasks = useMemo(
    () => tasks.filter((task) => {
      const assignee = assigneeById.get(task.assigneeId);
      const searchable = `${task.title} ${task.description} ${task.priority} ${assignee?.name ?? ""}`;

      return searchable.toLowerCase().includes(normalizedQuery);
    }),
    [assigneeById, normalizedQuery],
  );
  const visibleCount = filteredTasks.length;
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
            const visibleTasks = filteredTasks.filter((task) => task.status === column.name);

            return (
              <TaskColumn
                assigneeById={assigneeById}
                color={column.color}
                isPastDue={isPastDue}
                key={column.name}
                name={column.name}
                priorityTone={priorityTone}
                tasks={visibleTasks}
              />
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
