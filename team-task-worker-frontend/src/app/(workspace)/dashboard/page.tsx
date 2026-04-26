import Link from "next/link";
import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { AppIcon } from "@/components/ui/AppIcon";
import { activity, calendarEvents, projects, tasks, teamMembers } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

const today = new Date("2026-04-26T00:00:00");
const openTasks = tasks.filter((task) => task.status !== "Done");
const activeProjects = projects.filter((project) => project.status === "Active");
const reviewTasks = tasks.filter((task) => task.status === "Review");
const overdueTasks = openTasks.filter((task) => new Date(task.dueDate) < today);
const averageProgress = Math.round(
  projects.reduce((total, project) => total + project.progress, 0) / projects.length,
);
const busiestMember = [...teamMembers].sort((first, second) => second.workload - first.workload)[0];

const metrics = [
  {
    label: "Active projects",
    value: String(activeProjects.length),
    icon: "folder",
    trend: `${averageProgress}% avg progress`,
    tone: "progress",
    detail: "Delivery work moving now",
  },
  {
    label: "Open tasks",
    value: String(openTasks.length),
    icon: "tasks",
    trend: `${reviewTasks.length} in review`,
    tone: "review",
    detail: "Across planning and delivery",
  },
  {
    label: "Due this week",
    value: String(calendarEvents.length),
    icon: "calendar",
    trend: overdueTasks.length ? `${overdueTasks.length} overdue` : "On schedule",
    tone: overdueTasks.length ? "warning" : "calm",
    detail: "Calendar events in focus",
  },
  {
    label: "Team capacity",
    value: `${busiestMember.workload}%`,
    icon: "groups",
    trend: `${busiestMember.name.split(" ")[0]} busiest`,
    tone: "neutral",
    detail: `${teamMembers.length} members available`,
  },
] as const;

const taskFlow = [
  { title: "To do", count: tasks.filter((task) => task.status === "To do").length, tone: "calm", description: "Ready for planning." },
  { title: "In progress", count: tasks.filter((task) => task.status === "In progress").length, tone: "progress", description: "Owned by the team." },
  { title: "Review", count: tasks.filter((task) => task.status === "Review").length, tone: "review", description: "Waiting on feedback." },
  { title: "Done", count: tasks.filter((task) => task.status === "Done").length, tone: "neutral", description: "Completed this cycle." },
];

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="metric-grid" aria-label="Dashboard metrics">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <div className="metric-card__top">
              <span className="metric-icon" aria-hidden="true">
                <AppIcon name={metric.icon} />
              </span>
              <span className={`pill ${metric.tone}`}>{metric.trend}</span>
            </div>
            <div className="metric-card__body">
              <strong>{metric.value}</strong>
              <small>{metric.label}</small>
              <p>{metric.detail}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="split-layout">
        <div className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Status breakdown</p>
              <h2>Task flow</h2>
            </div>
            <Link href={routes.tasks}>Open board</Link>
          </div>

          <div className="status-grid">
            {taskFlow.map((item) => (
              <article className="flow-card" key={item.title}>
                <span className={`flow-card__dot ${item.tone}`} aria-hidden="true" />
                <div>
                  <strong>{item.count}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Quick links</p>
              <h2>Next actions</h2>
            </div>
          </div>

          <div className="dashboard-action-grid">
            <ActionModalButton action="project" variant="secondary" />
            <ActionModalButton action="task" variant="secondary" label="Create Task" />
            <Link className="secondary-action" href={routes.members}>
              <AppIcon name="groupAdd" />
              View team
            </Link>
          </div>
          <div className="dashboard-next-card">
            <span className="pill info">Recommended</span>
            <strong>Review task filters before adding more dashboard work.</strong>
            <p>{reviewTasks.length} item is already waiting for feedback, so this is the cleanest next step.</p>
          </div>
        </aside>
      </section>

      <section className="split-layout">
        <div className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Upcoming</p>
              <h2>Deadlines</h2>
            </div>
          </div>

          <div className="activity-list">
            {calendarEvents.slice(0, 3).map((event) => {
              const owner = teamMembers.find((member) => member.id === event.ownerId);

              return (
              <article key={event.title}>
                <span className={`avatar ${owner?.tone ?? ""}`}>
                  {owner?.initials}
                </span>
                <div>
                  <strong>{event.title}</strong>
                  <small>{event.type}, due {event.date}.</small>
                </div>
              </article>
            )})}
          </div>
        </div>

        <div className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Recent activity</p>
              <h2>Team updates</h2>
            </div>
          </div>

          <div className="activity-list">
            {activity.slice(0, 3).map((item) => {
              const owner = teamMembers.find((member) => member.id === item.memberId);

              return (
              <article key={item.title}>
                <span className={`avatar ${owner?.tone ?? ""}`}>
                  {owner?.initials}
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </div>
              </article>
            )})}
          </div>
        </div>
      </section>
    </div>
  );
}
