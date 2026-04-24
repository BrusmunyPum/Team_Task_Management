export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Welcome back</p>
          <h2 className="text-lg font-semibold text-white">Muny Brus</h2>
        </div>

        <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
          New Task
        </button>
      </div>
    </header>
  );
}