export default function Header() {
  return (
    <header className="h-13 bg-white border-b border-gray-100 flex items-center justify-between px-5">
      {/* Page title */}
      <h1 className="text-sm font-medium text-gray-900">Dashboard</h1>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-gray-400 text-xs">🔍</span>
          <span className="text-xs text-gray-400">Search tasks, projects…</span>
        </div>

        {/* New task button */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
          + New task
        </button>
      </div>
    </header>
  );
}