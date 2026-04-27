import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { Avatar } from "@/components/ui/Avatar";
import type { tasks, teamMembers } from "@/lib/mock-data";

type Task = (typeof tasks)[number];
type TeamMember = (typeof teamMembers)[number];

type TaskCardProps = {
  assignee?: TeamMember;
  overdue: boolean;
  priorityTone: string;
  task: Task;
};

export function TaskCard({ assignee, overdue, priorityTone, task }: TaskCardProps) {
  return (
    <article className="task-card">
      <span className={`task-priority-bar ${priorityTone}`} aria-hidden="true" />
      <div className="task-card-topline">
        <span className={`pill ${priorityTone}`}>{task.priority}</span>
        <span className={`task-due ${overdue ? "overdue" : ""}`}>
          <AppIcon name="calendar" />
          {task.due}
        </span>
      </div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-progress" aria-label={`${task.progress}% complete`}>
        <span style={{ width: `${task.progress}%` }} />
      </div>
      <div className="task-card-progress-label">
        <span>{task.progress}% complete</span>
        <span>{task.status}</span>
      </div>
      <div className="card-meta">
        {assignee && <Avatar name={assignee.name} size="sm" tone={assignee.tone} />}
        <span className="task-card-stat">{task.comments} comments</span>
        <span className="task-card-stat">{task.attachments} files</span>
        <Link className="auth-link" href={`/tasks/${task.id}`}>
          Open
        </Link>
      </div>
    </article>
  );
}
