import { Badge } from "@/components/ui/Badge";

export function MemberRoleBadge({ role }: { role: string }) {
  return <Badge tone={role === "Owner" ? "danger" : role === "Admin" ? "progress" : "calm"}>{role}</Badge>;
}
