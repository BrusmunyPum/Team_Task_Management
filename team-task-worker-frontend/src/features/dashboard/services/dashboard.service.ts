import { mockApi } from "@/lib/mock-api";

export const dashboardService = {
  getSummary: () => mockApi.dashboard.summary(),
};
