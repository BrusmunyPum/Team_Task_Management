import { Badge } from "@/components/ui/Badge";

export function TaskStatusBadge({ status }: { status: string }) {
  const tone = status === "Done" ? "done" : status === "Review" ? "review" : status === "In progress" ? "progress" : "neutral";
  return <Badge tone={tone}>{status}</Badge>;
}
