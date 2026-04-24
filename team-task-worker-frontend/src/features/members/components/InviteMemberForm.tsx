import { MockSubmitButton } from "@/components/ui/MockSubmitButton";

export function InviteMemberForm() {
  return (
    <form className="task-form">
      <label>Email<input type="email" placeholder="teammate@teamtask.test" /></label>
      <label>Role<select defaultValue="Member"><option>Admin</option><option>Member</option></select></label>
      <div className="modal-actions"><MockSubmitButton label="Send invite" completeLabel="Invite sent" icon="groupAdd" /></div>
    </form>
  );
}
