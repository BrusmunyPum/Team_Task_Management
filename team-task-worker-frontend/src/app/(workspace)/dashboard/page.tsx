import Link from "next/link";
import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { AppIcon } from "@/components/ui/AppIcon";
import { activity, calendarEvents, projects, tasks, teamMembers } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

const metrics = [
  { label: "Active projects", value: String(projects.filter((project) => project.status === "Active").length), icon: "folder" },
  { label: "Open tasks", value: String(tasks.filter((task) => task.status !== "Done").length), icon: "tasks" },
  { label: "Due this week", value: String(calendarEvents.length), icon: "calendar" },
  { label: "Members", value: String(teamMembers.length), icon: "groups" },
] as const;

const taskFlow = [
  { title: "To do", description: `${tasks.filter((task) => task.status === "To do").length} tasks ready for planning.` },
  { title: "In progress", description: `${tasks.filter((task) => task.status === "In progress").length} tasks owned by the team.` },
  { title: "Review", description: `${tasks.filter((task) => task.status === "Review").length} tasks waiting on feedback.` },
  { title: "Done", description: `${tasks.filter((task) => task.status === "Done").length} tasks completed.` },
];

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="metric-grid" aria-label="Dashboard metrics">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span className="metric-icon" aria-hidden="true">
              <AppIcon name={metric.icon} />
            </span>
            <div>
              <strong>{metric.value}</strong>
              <small>{metric.label}</small>
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
              <article className="project-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
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

          <div className="form-stack">
            <ActionModalButton action="project" variant="secondary" />
            <ActionModalButton action="task" variant="secondary" label="Create Task" />
            <Link className="secondary-action" href={routes.members}>
              <AppIcon name="groupAdd" />
              View team
            </Link>
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
