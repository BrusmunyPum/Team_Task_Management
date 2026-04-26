import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { projects, teamMembers } from "@/lib/mock-data";

function statusTone(status: string) {
  if (status === "Planning") {
    return "calm";
  }

  if (status === "Review") {
    return "review";
  }

  return "progress";
}

export default function ProjectsPage() {
  const activeCount = projects.filter((project) => project.status === "Active").length;
  const averageProgress = Math.round(
    projects.reduce((total, project) => total + project.progress, 0) / projects.length,
  );

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Project list</p>
          <h2>All active delivery work</h2>
        </div>
        <div className="section-summary">
          <span>{activeCount} active</span>
          <span>{averageProgress}% average progress</span>
        </div>
      </div>

      <div className="toolbar">
        <label className="search">
          <AppIcon name="search" />
          <input type="search" placeholder="Search projects" />
        </label>
        <label className="select-control">
          Status
          <select defaultValue="All">
            <option>All</option>
            <option>Active</option>
            <option>Archived</option>
          </select>
        </label>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card project-card--rich" key={project.title}>
            <div className="project-card__header">
              <span className={`pill ${statusTone(project.status)}`}>{project.status}</span>
              <span className="project-card__due">{project.due}</span>
            </div>
            <h3>
              <Link href={`/projects/${project.id}`}>{project.title}</Link>
            </h3>
            <p>{project.description}</p>
            <div className="project-progress" aria-label={`${project.progress}% complete`}>
              <span style={{ width: `${project.progress}%` }} />
            </div>
            <div className="project-card__stats">
              <span>
                <strong>{project.tasks}</strong>
                Tasks
              </span>
              <span>
                <strong>{project.progress}%</strong>
                Progress
              </span>
              <span>
                <strong>{project.members.length}</strong>
                Members
              </span>
            </div>
            <div className="project-card__footer">
              <div className="avatar-stack">
                {project.members.map((memberId) => {
                  const member = teamMembers.find((item) => item.id === memberId);
                  return (
                  <span className={`avatar ${member?.tone ?? ""}`} key={memberId}>
                    {member?.initials}
                  </span>
                )})}
              </div>
              <Link className="auth-link" href={`/projects/${project.id}`}>
                Open project
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="empty-state" hidden>
        <AppIcon name="folderOff" />
        No projects yet. Create your first project.
      </p>
    </section>
  );
}
