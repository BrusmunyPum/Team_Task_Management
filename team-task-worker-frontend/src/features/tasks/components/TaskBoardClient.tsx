"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { tasks, teamMembers } from "@/lib/mock-data";

const columnNames = ["To do", "In progress", "Review", "Done"] as const;

export function TaskBoardClient() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleCount = useMemo(
    () =>
      tasks.filter((task) =>
        `${task.title} ${task.description} ${task.priority}`.toLowerCase().includes(normalizedQuery),
      ).length,
    [normalizedQuery],
  );

  return (
    <>
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Kanban</p>
            <h2>Task status workflow</h2>
          </div>
          <button className="primary-action" type="button" onClick={() => setIsModalOpen(true)}>
            <AppIcon name="addTask" />
            New Task
          </button>
        </div>

        <div className="toolbar">
          <label className="search">
            <AppIcon name="search" />
            <input
              type="search"
              placeholder="Search tasks or assignees"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="board-grid">
          {columnNames.map((column) => {
            const visibleTasks = tasks.filter(
              (task) =>
                task.status === column &&
                (!normalizedQuery ||
                  `${task.title} ${task.description} ${task.priority}`.toLowerCase().includes(normalizedQuery)),
            );

            return (
              <section className="board-column" key={column}>
                <header>
                  {column} <span>{visibleTasks.length}</span>
                </header>
                {visibleTasks.map((task) => (
                  <article className="task-card" key={task.title}>
                    <span className={`pill ${task.priority === "High" ? "danger" : task.priority === "Low" ? "calm" : "warning"}`}>
                      {task.priority}
                    </span>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className="card-meta">
                      <span className={`avatar ${teamMembers.find((member) => member.id === task.assigneeId)?.tone ?? ""}`}>
                        {teamMembers.find((member) => member.id === task.assigneeId)?.initials}
                      </span>
                      <span className="pill neutral">{task.due}</span>
                      <Link className="auth-link" href={`/tasks/${task.id}`}>
                        Open
                      </Link>
                    </div>
                  </article>
                ))}
              </section>
            );
          })}
        </div>

        <p className="empty-state" hidden={visibleCount > 0}>
          <AppIcon name="searchOff" />
          No tasks match that search.
        </p>
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
