import { teamMembers, tasks } from "@/lib/mock-data";

export default function WorkloadPage() {
  return (
    <section className="panel">
      <div className="section-heading"><div><p className="eyebrow">Capacity</p><h2>Team workload management</h2></div><span className="pill warning">2 high load</span></div>
      <div className="workload-list">
        {teamMembers.map((member) => {
          const ownedTasks = tasks.filter((task) => task.assigneeId === member.id);
          return (
            <label key={member.id}>
              <span>{member.name}</span>
              <progress value={member.workload} max="100" />
              <strong>{member.workload}%</strong>
              <small className="form-help">{ownedTasks.length} active tasks</small>
            </label>
          );
        })}
      </div>
    </section>
  );
}
