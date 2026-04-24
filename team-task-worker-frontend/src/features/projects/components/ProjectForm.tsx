import { MockSubmitButton } from "@/components/ui/MockSubmitButton";

export function ProjectForm() {
  return (
    <form className="task-form">
      <label>Project name<input defaultValue="Frontend Integration" /></label>
      <label>Description<textarea defaultValue="Connect V1 screens to the future Next.js frontend and API modules." /></label>
      <div className="modal-actions"><MockSubmitButton label="Save project" completeLabel="Project saved" icon="addBox" /></div>
    </form>
  );
}
