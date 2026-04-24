import { AppIcon } from "@/components/ui/AppIcon";
import { ActionModalButton } from "@/components/ui/ActionModalButton";
import { activity, teamMembers } from "@/lib/mock-data";

export default function ActivityPage() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div><p className="eyebrow">Audit log</p><h2>Comments and activity</h2></div>
        <ActionModalButton action="comment" />
      </div>
      <div className="activity-list">
        {activity.map((item) => {
          const member = teamMembers.find((person) => person.id === item.memberId);
          return (
            <article key={item.title}>
              <span className={`avatar ${member?.tone ?? ""}`}>{member?.initials}</span>
              <div><strong>{item.title}</strong><small>{item.description} - {item.time}</small></div>
              <AppIcon name="tasks" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
