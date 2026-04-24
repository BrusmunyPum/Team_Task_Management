import { Badge } from "@/components/ui/Badge";

type ProjectStatusBadgeProps = {
  status: string;
};

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const tone = status === "Planning" ? "calm" : status === "Review" ? "review" : "progress";
  return <Badge tone={tone}>{status}</Badge>;
}
