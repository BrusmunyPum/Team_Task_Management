import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/ui/AppIcon";
import { projects, tasks, teamMembers } from "@/lib/mock-data";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.id }));
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[projectId]">) {
  const { projectId } = await props.params;
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    notFound();
  }

  const projectTasks = tasks.filter((task) => task.projectId === project.id);

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Project detail</p>
            <h2>{project.title}</h2>
          </div>
          <Link className="secondary-action" href={routes.tasks}>
            <AppIcon name="tasks" />
            Open tasks
          </Link>
        </div>
        <p className="form-help">
          {project.description}
        </p>
        <div className="card-meta">
          <span className="pill progress">{project.status}</span>
          <span className="pill warning">{project.tasks} planned tasks</span>
          <span className="pill calm">{project.progress}% complete</span>
          <span className="pill neutral">{project.due}</span>
        </div>
      </section>

      <section className="split-layout">
        <div className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Status breakdown</p>
              <h2>Project tasks</h2>
            </div>
          </div>
          <div className="status-grid">
            {["To do", "In progress", "Review", "Done"].map((status) => (
              <article className="project-card" key={status}>
                <h3>{status}</h3>
                <p>{projectTasks.filter((task) => task.status === status).length} tasks in this state.</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Members</p>
              <h2>Project team</h2>
            </div>
          </div>
          <div className="activity-list">
            {project.members.map((memberId) => {
              const member = teamMembers.find((item) => item.id === memberId);
              return (
                <article key={memberId}>
                  <span className={`avatar ${member?.tone ?? ""}`}>{member?.initials}</span>
                  <div>
                    <strong>{member?.name}</strong>
                    <small>{member?.focus}</small>
                  </div>
                </article>
              );
            })}
          </div>
        </aside>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Task list</p>
            <h2>Project tasks</h2>
          </div>
        </div>
        <div className="project-grid">
          {projectTasks.map((task) => (
            <article className="task-card" key={task.id}>
              <span className={`pill ${task.priority === "High" ? "danger" : task.priority === "Low" ? "calm" : "warning"}`}>{task.priority}</span>
              <h3><Link href={`/tasks/${task.id}`}>{task.title}</Link></h3>
              <p>{task.description}</p>
              <div className="card-meta">
                <span className="pill neutral">{task.status}</span>
                <span className="pill calm">{task.due}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
