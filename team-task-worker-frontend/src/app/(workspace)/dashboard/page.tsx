const stats = [
  { label: "Total Projects", value: "12" },
  { label: "Total Tasks", value: "48" },
  { label: "In Progress", value: "16" },
  { label: "Completed", value: "21" },
];

export default function DashboardPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Overview of your projects, tasks, and team progress.
        </p>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold text-white">Recent Tasks</h2>

        <div className="mt-4 space-y-3">
          {["Design dashboard UI", "Create project page", "Prepare mock data"].map(
            (task) => (
              <div
                key={task}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <p className="font-medium text-white">{task}</p>
                <p className="mt-1 text-sm text-slate-400">
                  Static UI with mock data
                </p>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}