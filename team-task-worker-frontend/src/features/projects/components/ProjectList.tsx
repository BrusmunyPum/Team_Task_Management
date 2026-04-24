import { projects } from "@/lib/mock-data";
import { ProjectCard } from "@/features/projects/components/ProjectCard";

export function ProjectList() {
  return (
    <div className="project-grid">
      {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
    </div>
  );
}
