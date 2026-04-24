import { MockSubmitButton } from "@/components/ui/MockSubmitButton";

export function OrganizationForm() {
  return (
    <form className="task-form">
      <label>Organization name<input defaultValue="Acme Workspace" /></label>
      <label>Workspace slug<input defaultValue="acme" /></label>
      <div className="modal-actions"><MockSubmitButton label="Save organization" completeLabel="Organization saved" /></div>
    </form>
  );
}
