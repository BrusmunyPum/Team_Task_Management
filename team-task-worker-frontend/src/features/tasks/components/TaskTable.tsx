import Link from "next/link";
import { tasks } from "@/lib/mock-data";
import { TaskPriorityBadge } from "@/features/tasks/components/TaskPriorityBadge";
import { TaskStatusBadge } from "@/features/tasks/components/TaskStatusBadge";

export function TaskTable() {
  return (
    <div className="table-wrap">
      <table className="task-table">
        <thead><tr><th>Task</th><th>Priority</th><th>Status</th><th>Due</th></tr></thead>
        <tbody>{tasks.map((task) => <tr key={task.id}><td><strong><Link href={`/tasks/${task.id}`}>{task.title}</Link></strong><small>{task.description}</small></td><td><TaskPriorityBadge priority={task.priority} /></td><td><TaskStatusBadge status={task.status} /></td><td>{task.due}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
