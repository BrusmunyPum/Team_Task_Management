"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { ReferenceScreenCard } from "@/components/reference/ReferenceScreenCard";
import { referenceScreens } from "@/lib/reference-screens";
import { routes } from "@/lib/routes";

const navItems = [
  ["dashboard", "Dashboard", "dashboard"],
  ["access", "Access", "login"],
  ["projects", "Projects", "workspace"],
  ["tasks", "Tasks", "tasks"],
  ["team", "Team", "groups"],
  ["system", "System", "workspace"],
  ["screens", "Screens", "dashboard"],
] as const;

const taskRows = [
  {
    task: "Implement JWT login flow",
    detail: "Auth and protected routes",
    project: "Authentication",
    assignee: "Maya Chen",
    priority: "High",
    priorityValue: 3,
    status: "progress",
    statusLabel: "In progress",
    due: "2026-04-29",
    dueLabel: "Apr 29",
    search: "jwt login flow authentication backend maya",
  },
  {
    task: "Create organization CRUD",
    detail: "Workspace model and role checks",
    project: "Organizations",
    assignee: "Niran Patel",
    priority: "Medium",
    priorityValue: 2,
    status: "todo",
    statusLabel: "To do",
    due: "2026-05-02",
    dueLabel: "May 2",
    search: "organization crud workspace roles niran",
  },
  {
    task: "Review task filter query params",
    detail: "Status, priority, assignee, due date",
    project: "Tasks",
    assignee: "Lena Ortiz",
    priority: "Medium",
    priorityValue: 2,
    status: "review",
    statusLabel: "Review",
    due: "2026-05-04",
    dueLabel: "May 4",
    search: "task filters pagination sorting api lena",
  },
  {
    task: "Build static prototype shell",
    detail: "HTML, CSS, and JS foundation",
    project: "Frontend",
    assignee: "Sam Rivera",
    priority: "Low",
    priorityValue: 1,
    status: "done",
    statusLabel: "Done",
    due: "2026-04-24",
    dueLabel: "Apr 24",
    search: "static html css js prototype dashboard sam",
  },
] as const;

export function PrototypeHubClient() {
  const [taskQuery, setTaskQuery] = useState("");
  const [screenQuery, setScreenQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("default");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    const query = taskQuery.trim().toLowerCase();
    return [...taskRows]
      .filter((task) => (status === "all" || task.status === status) && (!query || task.search.includes(query)))
      .sort((first, second) => {
        if (sort === "due") return first.due.localeCompare(second.due);
        if (sort === "priority") return second.priorityValue - first.priorityValue;
        return 0;
      });
  }, [sort, status, taskQuery]);

  const filteredScreens = useMemo(() => {
    const query = screenQuery.trim().toLowerCase();
    return referenceScreens.filter((screen) => !query || screen.tags.includes(query));
  }, [screenQuery]);

  return (
    <>
      <div className="app-shell">
        <aside className="sidebar" aria-label="Primary navigation">
          <a className="brand" href="#dashboard" aria-label="TeamTask Pro home">
            <span className="brand-mark" aria-hidden="true">
              <AppIcon name="hub" />
            </span>
            <span>
              <strong>TeamTask Pro</strong>
              <small>Project management system</small>
            </span>
          </a>

          <nav className="nav-list">
            {navItems.map(([id, label, icon], index) => (
              <a className={index === 0 ? "active" : ""} href={`#${id}`} key={id}>
                <span className="nav-icon" aria-hidden="true">
                  <AppIcon name={icon} />
                </span>
                {label}
              </a>
            ))}
          </nav>

          <div className="sidebar-note">
            <span className="nav-icon" aria-hidden="true">
              <AppIcon name="rocket" />
            </span>
            <p>Static first step for the FastAPI, PostgreSQL, Next.js, and Docker roadmap.</p>
          </div>
        </aside>

        <main className="content">
          <section className="workspace-header" id="dashboard">
            <div>
              <p className="eyebrow">Acme Workspace</p>
              <h1>Product delivery dashboard</h1>
              <p>
                Track projects, task ownership, workload, due dates, and role-sensitive
                activity from the migrated static prototype.
              </p>
            </div>
            <div className="workspace-actions" aria-label="Workspace actions">
              <a className="secondary-action" href="#tasks">
                <AppIcon name="search" />
                Find task
              </a>
              <button className="primary-action" type="button" onClick={() => setIsModalOpen(true)}>
                <AppIcon name="addTask" />
                New task
              </button>
            </div>
          </section>

          <section className="dashboard-grid" aria-label="Dashboard overview">
            <div className="panel focus-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Today</p>
                  <h2>Work that needs attention</h2>
                </div>
                <span className="health-badge">4 risks</span>
              </div>
              <div className="focus-list">
                <article>
                  <span className="status-dot urgent" />
                  <div>
                    <strong>JWT login flow is blocking protected route testing</strong>
                    <small>Auth module - due Apr 29 - owner Maya Chen</small>
                  </div>
                  <span className="pill danger">High</span>
                </article>
                <article>
                  <span className="status-dot warning" />
                  <div>
                    <strong>Organization CRUD needs permission review</strong>
                    <small>Workspace module - due May 2 - owner Niran Patel</small>
                  </div>
                  <span className="pill warning">Medium</span>
                </article>
                <article>
                  <span className="status-dot calm" />
                  <div>
                    <strong>Static prototype shell is ready for backend mapping</strong>
                    <small>Frontend module - finished Apr 24 - owner Sam Rivera</small>
                  </div>
                  <span className="pill done">Done</span>
                </article>
              </div>
            </div>

            <aside className="panel roadmap-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Phase 0</p>
                  <h2>First step scope</h2>
                </div>
              </div>
              <ol className="phase-list">
                <li className="active"><span>1</span><strong>Design static UI</strong></li>
                <li><span>2</span><strong>Define entities and ERD</strong></li>
                <li><span>3</span><strong>Map API screens</strong></li>
                <li><span>4</span><strong>Start backend setup</strong></li>
              </ol>
            </aside>
          </section>

          <section className="metric-grid" aria-label="Dashboard metrics">
            {[
              ["folder", "18", "Active projects"],
              ["tasks", "126", "Open tasks"],
              ["calendar", "24", "Due this week"],
              ["groups", "3", "Workspace roles"],
            ].map(([icon, value, label]) => (
              <article className="metric-card" key={label}>
                <span className="metric-icon" aria-hidden="true">
                  <AppIcon name={icon as "folder"} />
                </span>
                <div><strong>{value}</strong><small>{label}</small></div>
              </article>
            ))}
          </section>

          <section className="split-layout" id="access">
            <div className="panel auth-preview">
              <div className="section-heading">
                <div><p className="eyebrow">Authentication</p><h2>Login and registration entry point</h2></div>
                <Link href={routes.onboarding}>Open onboarding</Link>
              </div>
              <div className="auth-card" aria-label="Static login form preview">
                <div className="auth-card-header">
                  <span className="metric-icon"><AppIcon name="login" /></span>
                  <div><strong>Welcome back</strong><small>Sign in to continue to your workspace.</small></div>
                </div>
                <label>Email<input type="email" defaultValue="maya@teamtask.test" aria-label="Email preview" /></label>
                <label>Password<input type="password" defaultValue="password" aria-label="Password preview" /></label>
                <Link className="primary-action" href={routes.login}>Sign in</Link>
                <p>New user path: create account, verify profile, then create or join an organization.</p>
              </div>
            </div>

            <aside className="panel">
              <div className="section-heading"><div><p className="eyebrow">Organization setup</p><h2>Workspace foundation</h2></div></div>
              <ol className="step-list">
                <li><span>1</span><div><strong>Create organization</strong><small>Name, slug, owner, timestamps.</small></div></li>
                <li><span>2</span><div><strong>Add members</strong><small>Owner, admin, and member role assignment.</small></div></li>
                <li><span>3</span><div><strong>Create first project</strong><small>Project belongs to an organization.</small></div></li>
              </ol>
            </aside>
          </section>

          <section className="split-layout" id="projects">
            <div className="panel project-board">
              <div className="section-heading">
                <div><p className="eyebrow">Project management</p><h2>Delivery pipeline</h2></div>
                <Link href={routes.tasks}>Open full board</Link>
              </div>
              <div className="kanban-preview" aria-label="Project pipeline preview">
                {[
                  ["Planning", "4", ["API contract draft", "Workspace settings"]],
                  ["In progress", "7", ["Task assignment flow", "Dashboard widgets"]],
                  ["Review", "3", ["RBAC permission matrix"]],
                  ["Done", "12", ["Static screen inventory"]],
                ].map(([title, count, cards]) => (
                  <div className="kanban-column" key={title as string}>
                    <h3>{title}<span>{count}</span></h3>
                    {(cards as string[]).map((card) => (
                      <article key={card}><strong>{card}</strong><small>Roadmap module</small></article>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <aside className="panel compact-panel">
              <div className="section-heading"><div><p className="eyebrow">Workspace</p><h2>Core access model</h2></div></div>
              <ul className="role-list">
                <li><span>Owner</span><strong>Full workspace control</strong></li>
                <li><span>Admin</span><strong>Manage projects and members</strong></li>
                <li><span>Member</span><strong>Work on assigned tasks</strong></li>
              </ul>
            </aside>
          </section>

          <section className="panel" id="tasks">
            <div className="section-heading">
              <div><p className="eyebrow">Task management</p><h2>Search, filter, sort, and track task status</h2></div>
              <Link href={routes.tasks}>Open my tasks</Link>
            </div>
            <div className="toolbar" aria-label="Task table controls">
              <label className="search"><AppIcon name="search" /><input type="search" placeholder="Search tasks, assignees, or projects" value={taskQuery} onChange={(event) => setTaskQuery(event.target.value)} /></label>
              <div className="segmented-control" aria-label="Filter tasks by status">
                {["all", "todo", "progress", "review", "done"].map((item) => (
                  <button className={status === item ? "active" : ""} type="button" key={item} onClick={() => setStatus(item)}>
                    {item === "all" ? "All" : item === "todo" ? "To do" : item === "progress" ? "In progress" : item[0].toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
              <label className="select-control">Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="default">Default</option><option value="due">Due date</option><option value="priority">Priority</option></select></label>
            </div>
            <div className="table-wrap">
              <table className="task-table">
                <thead><tr><th>Task</th><th>Project</th><th>Assignee</th><th>Priority</th><th>Status</th><th>Due</th></tr></thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.task}>
                      <td><strong>{task.task}</strong><small>{task.detail}</small></td>
                      <td>{task.project}</td>
                      <td>{task.assignee}</td>
                      <td><span className={`pill ${task.priority === "High" ? "danger" : task.priority === "Low" ? "calm" : "warning"}`}>{task.priority}</span></td>
                      <td><span className={`pill ${task.status}`}>{task.statusLabel}</span></td>
                      <td>{task.dueLabel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="empty-state" hidden={filteredTasks.length > 0}>No tasks match the current filter.</p>
            </div>
          </section>

          <section className="split-layout" id="team">
            <div className="panel">
              <div className="section-heading"><div><p className="eyebrow">Collaboration</p><h2>Comments and activity</h2></div><Link href="/tasks/jwt-login-flow">Open task details</Link></div>
              <div className="activity-list">
                <article><span className="avatar">MC</span><div><strong>Maya commented on API contract draft</strong><small>Need consistent error response shapes before frontend integration.</small></div></article>
                <article><span className="avatar purple">NP</span><div><strong>Niran moved role matrix to review</strong><small>Owner, admin, and member permissions are ready for validation.</small></div></article>
                <article><span className="avatar orange">LO</span><div><strong>Lena uploaded ERD notes</strong><small>Users, organizations, projects, tasks, assignees, and comments are mapped.</small></div></article>
              </div>
            </div>
            <div className="panel">
              <div className="section-heading"><div><p className="eyebrow">Reporting</p><h2>Team workload</h2></div><Link href={routes.members}>Open members</Link></div>
              <div className="workload-list">
                {["Maya Chen", "Niran Patel", "Lena Ortiz", "Sam Rivera"].map((name, index) => {
                  const values = [72, 58, 81, 44];
                  return <label key={name}><span>{name}</span><progress value={values[index]} max="100" /><strong>{values[index]}%</strong></label>;
                })}
              </div>
            </div>
          </section>

          <section className="panel" id="system">
            <div className="section-heading"><div><p className="eyebrow">Roadmap aligned</p><h2>System modules for the real full-stack build</h2></div></div>
            <div className="feature-grid">
              {[
                ["Authentication", "Register, login, password hashing, JWT tokens, and protected routes."],
                ["Organizations", "Workspace creation, membership, and role-based access control."],
                ["Projects", "Project CRUD, archive state, pagination, and organization-level permissions."],
                ["Tasks", "Create, assign, edit, prioritize, filter, sort, and move through statuses."],
                ["Comments", "Task discussion, authorship, timestamps, and later activity logging."],
                ["Dashboard", "Summaries, recent work, status counts, search, filters, and pagination."],
              ].map(([title, body]) => <article key={title}><span className="metric-icon"><AppIcon name="workspace" /></span><h3>{title}</h3><p>{body}</p></article>)}
            </div>
            <div className="architecture-strip" aria-label="Planned architecture">
              {["FastAPI API", "Service layer", "Repositories", "PostgreSQL", "Next.js UI", "Docker"].map((item) => <span key={item}>{item}</span>)}
            </div>
          </section>

          <section className="split-layout system-detail">
            <div className="panel">
              <div className="section-heading"><div><p className="eyebrow">Database design</p><h2>Core entities for the ERD</h2></div></div>
              <div className="entity-grid">
                {["users", "organizations", "organization_members", "projects", "tasks", "comments"].map((entity) => <article key={entity}><strong>{entity}</strong><small>Key fields, relationships, and timestamps.</small></article>)}
              </div>
            </div>
            <div className="panel">
              <div className="section-heading"><div><p className="eyebrow">RBAC</p><h2>Permission matrix preview</h2></div></div>
              <div className="matrix-wrap">
                <table className="permission-table">
                  <thead><tr><th>Action</th><th>Owner</th><th>Admin</th><th>Member</th></tr></thead>
                  <tbody>
                    <tr><td>Manage organization</td><td>Yes</td><td>No</td><td>No</td></tr>
                    <tr><td>Manage members</td><td>Yes</td><td>Yes</td><td>No</td></tr>
                    <tr><td>Create projects</td><td>Yes</td><td>Yes</td><td>No</td></tr>
                    <tr><td>Update assigned tasks</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="section-heading"><div><p className="eyebrow">API planning</p><h2>Frontend screens mapped to backend modules</h2></div></div>
            <div className="api-grid">
              {["/auth/register", "/auth/login", "/organizations/{id}/projects", "/projects/{id}/tasks", "/tasks/{id}/comments", "/dashboard/summary"].map((endpoint, index) => (
                <article key={endpoint}><span>{index < 2 || index === 4 ? "POST" : "GET"}</span><strong>{endpoint}</strong><small>Roadmap API contract placeholder.</small></article>
              ))}
            </div>
          </section>

          <section className="panel" id="screens">
            <div className="section-heading"><div><p className="eyebrow">Copied source screens</p><h2>Original HTML page library</h2></div></div>
            <div className="toolbar" aria-label="Screen search">
              <label className="search"><AppIcon name="search" /><input type="search" placeholder="Search original screens" value={screenQuery} onChange={(event) => setScreenQuery(event.target.value)} /></label>
            </div>
            <div className="module-grid" aria-label="Website pages">
              {filteredScreens.map((screen) => <ReferenceScreenCard key={screen.slug} screen={screen} />)}
            </div>
            <p className="empty-state" hidden={filteredScreens.length > 0}>No screens match that search.</p>
          </section>
        </main>
      </div>

      <div className="modal-backdrop" hidden={!isModalOpen} onClick={() => setIsModalOpen(false)}>
        <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="quickTaskTitle" onClick={(event) => event.stopPropagation()}>
          <div className="section-heading">
            <div><p className="eyebrow">Quick create</p><h2 id="quickTaskTitle">Add a task to the prototype</h2></div>
            <button className="icon-button" type="button" aria-label="Close task form" onClick={() => setIsModalOpen(false)}><AppIcon name="close" /></button>
          </div>
          <form className="task-form">
            <label>Task title<input type="text" placeholder="Write API error response contract" required /></label>
            <label>Project<input type="text" placeholder="Backend foundation" required /></label>
            <label>Assignee<input type="text" placeholder="Maya Chen" required /></label>
            <div className="form-grid">
              <label>Priority<select defaultValue="2"><option value="3">High</option><option value="2">Medium</option><option value="1">Low</option></select></label>
              <label>Status<select defaultValue="todo"><option value="todo">To do</option><option value="progress">In progress</option><option value="review">Review</option><option value="done">Done</option></select></label>
            </div>
            <div className="modal-actions">
              <button className="secondary-action" type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="primary-action" type="button" onClick={() => setIsModalOpen(false)}><AppIcon name="add" />Add task</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
