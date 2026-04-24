import { teamMembers } from "@/lib/mock-data";

export const mockCurrentUser = teamMembers[0];

export function isAuthenticated() {
  return true;
}

export function canAccessWorkspace() {
  return isAuthenticated();
}
