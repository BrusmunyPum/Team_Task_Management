import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { timelineMilestones } from "@/lib/mock-data";

export default function TimelinePage() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div><p className="eyebrow">Roadmap</p><h2>Project timeline Gantt</h2></div>
        <ActionModalButton action="milestone" />
      </div>
      <div className="timeline-list">
        {timelineMilestones.map(([date, title, status, progress]) => (
          <article className="timeline-item" key={title}>
            <span className="timeline-date">{date}</span>
            <div>
              <strong>{title}</strong>
              <small className="form-help">{progress}% complete</small>
              <progress value={progress} max="100" />
            </div>
            <span className={`pill ${status === "Done" ? "done" : status === "Planning" ? "calm" : "progress"}`}>{status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
