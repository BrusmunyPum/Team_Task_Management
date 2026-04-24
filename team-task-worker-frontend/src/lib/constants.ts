export const APP_NAME = "TeamTask Pro";
export const DEFAULT_ORGANIZATION = "Acme Workspace";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export const taskStatuses = ["To do", "In progress", "Review", "Done"] as const;
export const taskPriorities = ["Low", "Medium", "High", "Urgent"] as const;
