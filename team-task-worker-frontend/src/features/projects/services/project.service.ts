import { mockApi } from "@/lib/mock-api";

export const projectService = {
  list: () => mockApi.projects.list(),
  get: (id: string) => mockApi.projects.get(id),
};
