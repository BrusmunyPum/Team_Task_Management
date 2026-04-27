import { EmptyState } from "@/components/ui/EmptyState";
import type { tasks, teamMembers } from "@/lib/mock-data";
import { TaskCard } from "@/features/tasks/components/TaskCard";

type Task = (typeof tasks)[number];
type TeamMember = (typeof teamMembers)[number];

type TaskColumnProps = {
  assigneeById: Map<string, TeamMember>;
  color: string;
  isPastDue: (dueDate: string) => boolean;
  name: Task["status"];
  priorityTone: (priority: string) => string;
  tasks: Task[];
};

export function TaskColumn({
  assigneeById,
  color,
  isPastDue,
  name,
  priorityTone,
  tasks: columnTasks,
}: TaskColumnProps) {
  return (
    <section className="board-column" aria-label={`${name} column, ${columnTasks.length} tasks`}>
      <header>
        <div>
          <span className="board-column-title">
            <i style={{ background: color }} aria-hidden="true" />
            {name}
          </span>
          <small>{columnTasks.length === 1 ? "1 task" : `${columnTasks.length} tasks`}</small>
        </div>
        <span>{columnTasks.length}</span>
      </header>
      {columnTasks.length === 0 && (
        <EmptyState title="No tasks here">Move work into this stage when it is ready.</EmptyState>
      )}
      {columnTasks.map((task) => (
        <TaskCard
          assignee={assigneeById.get(task.assigneeId)}
          key={task.id}
          overdue={isPastDue(task.dueDate) && task.status !== "Done"}
          priorityTone={priorityTone(task.priority)}
          task={task}
        />
      ))}
    </section>
  );
}
