import { notFound } from "next/navigation";
import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { activity, projects, tasks, teamMembers } from "@/lib/mock-data";

export function generateStaticParams() {
  return tasks.map((task) => ({ taskId: task.id }));
}

export default async function TaskDetailPage(props: PageProps<"/tasks/[taskId]">) {
  const { taskId } = await props.params;
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    notFound();
  }

  const project = projects.find((item) => item.id === task.projectId);
  const assignee = teamMembers.find((member) => member.id === task.assigneeId);

  return (
    <section className="detail-layout">
      <div className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{project?.title}</p>
            <h2>{task.title}</h2>
          </div>
          <span className="pill progress">{task.status}</span>
        </div>
        <p className="form-help">{task.description}</p>

        <div className="status-grid" style={{ marginTop: 18 }}>
          <article className="detail-card">
            <h3>Assignee</h3>
            <p>{assignee?.name}</p>
          </article>
          <article className="detail-card">
            <h3>Priority</h3>
            <p>{task.priority}</p>
          </article>
          <article className="detail-card">
            <h3>Due date</h3>
            <p>{task.due}</p>
          </article>
          <article className="detail-card">
            <h3>Progress</h3>
            <p>{task.progress}%</p>
          </article>
        </div>

        <div className="chart-bars" style={{ minHeight: 120 }}>
          <div className="chart-bar" style={{ height: `${Math.max(task.progress, 12)}%` }} />
        </div>
      </div>

      <aside className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Comments</p>
            <h2>Activity</h2>
          </div>
        </div>
        <div className="activity-list">
          {activity.slice(0, 3).map((item) => {
            const member = teamMembers.find((person) => person.id === item.memberId);
            return (
              <article key={item.title}>
                <span className={`avatar ${member?.tone ?? ""}`}>{member?.initials}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </div>
              </article>
            );
          })}
        </div>
        <div style={{ marginTop: 18 }}>
          <ActionModalButton action="comment" variant="secondary" />
        </div>
      </aside>
    </section>
  );
}
