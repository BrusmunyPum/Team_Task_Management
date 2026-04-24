import { mockComments } from "@/features/comments/mock/comments.mock";
import { teamMembers } from "@/lib/mock-data";

export function CommentList({ taskId }: { taskId: string }) {
  return (
    <div className="activity-list">
      {mockComments.filter((comment) => comment.taskId === taskId).map((comment) => {
        const author = teamMembers.find((member) => member.id === comment.authorId);
        return <article key={comment.id}><span className={`avatar ${author?.tone ?? ""}`}>{author?.initials}</span><div><strong>{author?.name}</strong><small>{comment.body}</small></div></article>;
      })}
    </div>
  );
}
