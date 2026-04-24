import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { automations } from "@/lib/mock-data";

export default function AutomationPage() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div><p className="eyebrow">Automation</p><h2>Workflow rules</h2></div>
        <ActionModalButton action="automation" />
      </div>
      <div className="project-grid">
        {automations.map(([name, description, status]) => <article className="project-card" key={name}><span className={`pill ${status === "Active" ? "progress" : status === "Paused" ? "warning" : "neutral"}`}>{status}</span><h3>{name}</h3><p>{description}</p></article>)}
      </div>
    </section>
  );
}
