import { AppIcon } from "@/components/ui/AppIcon";
import { activity, projects, tasks } from "@/lib/mock-data";

const bars = [32, 54, 72, 92, 46, 64, 82];

export default function AnalyticsPage() {
  const completeTasks = tasks.filter((task) => task.status === "Done").length;
  const activeProjects = projects.filter((project) => project.status === "Active").length;

  return (
    <div className="page-stack">
      <section className="metric-grid">
        <article className="metric-card"><span className="metric-icon"><AppIcon name="workspace" /></span><div><strong>{projects.length}</strong><small>Total projects</small></div></article>
        <article className="metric-card"><span className="metric-icon"><AppIcon name="tasks" /></span><div><strong>{tasks.length}</strong><small>Total tasks</small></div></article>
        <article className="metric-card"><span className="metric-icon"><AppIcon name="calendar" /></span><div><strong>{completeTasks}</strong><small>Completed tasks</small></div></article>
        <article className="metric-card"><span className="metric-icon"><AppIcon name="dashboard" /></span><div><strong>{activeProjects}</strong><small>Active projects</small></div></article>
      </section>

      <section className="split-layout">
        <div className="panel">
          <div className="section-heading"><div><p className="eyebrow">Velocity</p><h2>Project velocity</h2></div><span className="pill progress">This month</span></div>
          <div className="chart-bars" aria-label="Weekly velocity bar chart">
            {bars.map((value, index) => <div className="chart-bar" style={{ height: `${value}%` }} key={index} title={`${value}%`} />)}
          </div>
          <div className="card-meta">
            {["W1", "W2", "W3", "W4", "W5", "W6", "W7"].map((week) => <span className="pill neutral" key={week}>{week}</span>)}
          </div>
        </div>

        <aside className="panel">
          <div className="section-heading"><div><p className="eyebrow">Distribution</p><h2>Task mix</h2></div></div>
          <div className="donut"><span>{tasks.length}</span></div>
          <div className="form-stack" style={{ marginTop: 18 }}>
            <p className="form-help"><strong>58%</strong> In progress</p>
            <p className="form-help"><strong>24%</strong> Completed</p>
            <p className="form-help"><strong>18%</strong> Backlog</p>
          </div>
        </aside>
      </section>

      <section className="panel">
        <div className="section-heading"><div><p className="eyebrow">Activity</p><h2>Recent team movement</h2></div></div>
        <div className="activity-list">
          {activity.map((item) => <article key={item.title}><span className="avatar">{item.memberId.slice(0, 2).toUpperCase()}</span><div><strong>{item.title}</strong><small>{item.description} - {item.time}</small></div></article>)}
        </div>
      </section>
    </div>
  );
}
