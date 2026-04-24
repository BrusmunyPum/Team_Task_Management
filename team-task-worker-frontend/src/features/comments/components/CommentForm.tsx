import { MockSubmitButton } from "@/components/ui/MockSubmitButton";

export function CommentForm() {
  return (
    <form className="task-form">
      <label>Comment<textarea placeholder="Add a comment..." /></label>
      <div className="modal-actions"><MockSubmitButton label="Post comment" completeLabel="Comment posted" icon="playlistAdd" /></div>
    </form>
  );
}
