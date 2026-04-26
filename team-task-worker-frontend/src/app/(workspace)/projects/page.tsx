import { ProjectsClient } from "@/features/projects/components/ProjectsClient";
import { projects } from "@/lib/mock-data";

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

      <ProjectsClient />
    </section>
  );
}
