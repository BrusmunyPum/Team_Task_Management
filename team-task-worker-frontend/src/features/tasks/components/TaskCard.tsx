import Link from "next/link";
import { TaskPriorityBadge } from "@/features/tasks/components/TaskPriorityBadge";
import { TaskStatusBadge } from "@/features/tasks/components/TaskStatusBadge";
import type { Task } from "@/features/tasks/types/task.types";

export function TaskCard({ task }: { task: Task }) {
  return (
    <article className="task-card">
      <TaskPriorityBadge priority={task.priority} />
      <h3><Link href={`/tasks/${task.id}`}>{task.title}</Link></h3>
      <p>{task.description}</p>
      <div className="card-meta"><TaskStatusBadge status={task.status} /><span className="pill neutral">{task.due}</span></div>
    </article>
  );
}
