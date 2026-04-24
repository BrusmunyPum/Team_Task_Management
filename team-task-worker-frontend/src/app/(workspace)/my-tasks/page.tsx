import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { tasks, teamMembers } from "@/lib/mock-data";

export default function MyTasksPage() {
  const currentUser = teamMembers[0];
  const myTasks = tasks.filter((task) => task.assigneeId === currentUser.id);

  return (
    <div className="page-stack">
      <section className="metric-grid">
        <article className="metric-card"><span className="metric-icon"><AppIcon name="tasks" /></span><div><strong>{myTasks.length}</strong><small>Assigned to me</small></div></article>
        <article className="metric-card"><span className="metric-icon"><AppIcon name="calendar" /></span><div><strong>{myTasks.filter((task) => task.priority === "High").length}</strong><small>High priority</small></div></article>
        <article className="metric-card"><span className="metric-icon"><AppIcon name="dashboard" /></span><div><strong>{Math.round(myTasks.reduce((total, task) => total + task.progress, 0) / myTasks.length)}%</strong><small>Average progress</small></div></article>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div><p className="eyebrow">Personal queue</p><h2>My tasks overview</h2></div>
          <Link className="secondary-action" href="/tasks"><AppIcon name="tasks" />Open board</Link>
        </div>
        <div className="project-grid">
          {myTasks.map((task) => (
            <article className="task-card" key={task.id}>
              <span className={`pill ${task.priority === "High" ? "danger" : "warning"}`}>{task.priority}</span>
              <h3><Link href={`/tasks/${task.id}`}>{task.title}</Link></h3>
              <p>{task.description}</p>
              <div className="card-meta">
                <span className="pill neutral">{task.status}</span>
                <span className="pill calm">{task.due}</span>
                <span className="pill progress">{task.progress}%</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
