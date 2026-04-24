import { activity, calendarEvents, projects, tasks, teamMembers } from "@/lib/mock-data";

export const mockApi = {
  auth: {
    login: async () => ({ token: "mock-jwt-token", user: teamMembers[0] }),
    register: async () => ({ token: "mock-jwt-token", user: teamMembers[0] }),
  },
  dashboard: {
    summary: async () => ({
      projects,
      tasks,
      members: teamMembers,
      activity,
      calendarEvents,
    }),
  },
  projects: {
    list: async () => projects,
    get: async (id: string) => projects.find((project) => project.id === id),
  },
  tasks: {
    list: async () => tasks,
    get: async (id: string) => tasks.find((task) => task.id === id),
  },
  members: {
    list: async () => teamMembers,
  },
};
