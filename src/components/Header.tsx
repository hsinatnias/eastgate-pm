interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-13 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-5">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Hamburger button — only visible on mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden flex flex-col gap-1 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="w-4 h-0.5 bg-gray-600 block" />
          <span className="w-4 h-0.5 bg-gray-600 block" />
          <span className="w-4 h-0.5 bg-gray-600 block" />
        </button>
        <h1 className="text-sm font-medium text-gray-900">Dashboard</h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Search — hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-gray-400 text-xs">🔍</span>
          <span className="text-xs text-gray-400">Search tasks, projects…</span>
        </div>

        {/* New task button */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
          <span className="hidden sm:inline">+ New task</span>
          <span className="sm:hidden">+</span>
        </button>
      </div>
    </header>
  );
}