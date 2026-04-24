import { Badge } from "@/components/ui/Badge";

export function TaskPriorityBadge({ priority }: { priority: string }) {
  return <Badge tone={priority === "High" ? "danger" : priority === "Low" ? "calm" : "warning"}>{priority}</Badge>;
}
