import Link from "next/link";
import { ProjectStatusBadge } from "@/features/projects/components/ProjectStatusBadge";
import type { Project } from "@/features/projects/types/project.types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card project-card--rich">
      <div className="project-card__header">
        <ProjectStatusBadge status={project.status} />
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
      </div>
    </article>
  );
}
