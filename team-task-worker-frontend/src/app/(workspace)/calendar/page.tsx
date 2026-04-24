import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { calendarEvents, teamMembers } from "@/lib/mock-data";

export default function CalendarPage() {
  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div><p className="eyebrow">Schedule</p><h2>Team schedule calendar</h2></div>
          <ActionModalButton action="event" />
        </div>
        <div className="timeline-list">
          {calendarEvents.map((event) => {
            const owner = teamMembers.find((member) => member.id === event.ownerId);
            return (
              <article className="timeline-item" key={event.title}>
                <span className="timeline-date">{event.date}</span>
                <div><strong>{event.title}</strong><small className="form-help">{event.type} owned by {owner?.name}</small></div>
                <span className="pill neutral">{event.type}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="insight-grid two">
        {teamMembers.map((member) => <article className="panel" key={member.id}><span className={`avatar ${member.tone}`}>{member.initials}</span><h3>{member.name}</h3><p className="form-help">{member.focus}</p></article>)}
      </section>
    </div>
  );
}
