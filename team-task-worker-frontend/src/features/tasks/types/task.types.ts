import { tasks } from "@/lib/mock-data";

export type Task = (typeof tasks)[number];
export type TaskStatus = Task["status"];
export type TaskPriority = Task["priority"];
