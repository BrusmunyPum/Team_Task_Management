import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { projects, teamMembers } from "@/lib/mock-data";

export default function ProjectsPage() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Project list</p>
          <h2>All active delivery work</h2>
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
          <article className="project-card" key={project.title}>
            <span className={`pill ${project.status === "Planning" ? "calm" : project.status === "Review" ? "review" : "progress"}`}>{project.status}</span>
            <h3><Link href={`/projects/${project.id}`}>{project.title}</Link></h3>
            <p>{project.description}</p>
            <div className="card-meta">
              <span className="pill warning">{project.tasks} tasks</span>
              <span className="pill neutral">{project.due}</span>
              <span className="pill calm">{project.progress}%</span>
            </div>
            <div className="avatar-stack">
              {project.members.map((memberId) => {
                const member = teamMembers.find((item) => item.id === memberId);
                return (
                <span className={`avatar ${member?.tone ?? ""}`} key={memberId}>
                  {member?.initials}
                </span>
              )})}
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
