export type MemberRole = "Owner" | "Admin" | "Member";

export type PermissionAction =
  | "manageOrganization"
  | "manageMembers"
  | "createProjects"
  | "updateAssignedTasks";

export const permissionMatrix: Record<MemberRole, PermissionAction[]> = {
  Owner: ["manageOrganization", "manageMembers", "createProjects", "updateAssignedTasks"],
  Admin: ["manageMembers", "createProjects", "updateAssignedTasks"],
  Member: ["updateAssignedTasks"],
};
