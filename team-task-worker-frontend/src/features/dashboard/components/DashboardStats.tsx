import { AppIcon } from "@/components/ui/AppIcon";
import { projects, tasks, teamMembers } from "@/lib/mock-data";

export function DashboardStats() {
  const stats = [
    ["folder", projects.length, "Projects"],
    ["tasks", tasks.length, "Tasks"],
    ["groups", teamMembers.length, "Members"],
  ] as const;

  return (
    <section className="metric-grid">
      {stats.map(([icon, value, label]) => (
        <article className="metric-card" key={label}>
          <span className="metric-icon"><AppIcon name={icon} /></span>
          <div><strong>{value}</strong><small>{label}</small></div>
        </article>
      ))}
    </section>
  );
}
