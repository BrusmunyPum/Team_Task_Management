import { mockComments } from "@/features/comments/mock/comments.mock";

export const commentService = {
  listByTask: async (taskId: string) => mockComments.filter((comment) => comment.taskId === taskId),
};
