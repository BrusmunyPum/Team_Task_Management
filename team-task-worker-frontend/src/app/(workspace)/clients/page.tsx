import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { clientReviews } from "@/lib/mock-data";

export default function ClientsPage() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div><p className="eyebrow">Clients</p><h2>Client review portal</h2></div>
        <ActionModalButton action="client" />
      </div>
      <div className="project-grid">
        {clientReviews.map(([name, status, due]) => <article className="project-card" key={name}><span className="pill progress">{status}</span><h3>{name}</h3><p>Review due {due}. Collect comments, approval status, and decision history.</p></article>)}
      </div>
    </section>
  );
}
