import { mockApi } from "@/lib/mock-api";

export const taskService = {
  list: () => mockApi.tasks.list(),
  get: (id: string) => mockApi.tasks.get(id),
};
