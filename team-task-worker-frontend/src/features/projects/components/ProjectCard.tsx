import Link from "next/link";
import { ProjectStatusBadge } from "@/features/projects/components/ProjectStatusBadge";
import type { Project } from "@/features/projects/types/project.types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <ProjectStatusBadge status={project.status} />
      <h3><Link href={`/projects/${project.id}`}>{project.title}</Link></h3>
      <p>{project.description}</p>
      <div className="card-meta">
        <span className="pill warning">{project.tasks} tasks</span>
        <span className="pill calm">{project.progress}%</span>
      </div>
    </article>
  );
}
