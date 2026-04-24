import Link from "next/link";
import { tasks } from "@/lib/mock-data";

export function RecentTasks() {
  return (
    <div className="activity-list">
      {tasks.slice(0, 4).map((task) => (
        <article key={task.id}>
          <span className="pill neutral">{task.status}</span>
          <div><strong><Link href={`/tasks/${task.id}`}>{task.title}</Link></strong><small>{task.description}</small></div>
        </article>
      ))}
    </div>
  );
}
