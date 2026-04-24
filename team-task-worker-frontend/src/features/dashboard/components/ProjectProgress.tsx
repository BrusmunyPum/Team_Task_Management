import { projects } from "@/lib/mock-data";

export function ProjectProgress() {
  return (
    <div className="workload-list">
      {projects.map((project) => (
        <label key={project.id}>
          <span>{project.title}</span>
          <progress value={project.progress} max="100" />
          <strong>{project.progress}%</strong>
        </label>
      ))}
    </div>
  );
}
