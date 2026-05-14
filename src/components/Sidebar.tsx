const navItems = [
  { label: 'Dashboard', icon: '⊞' },
  { label: 'Projects', icon: '📁' },
  { label: 'Tasks', icon: '✓' },
  { label: 'Time Tracking', icon: '⏱' },
  { label: 'Reports', icon: '📊' },
  { label: 'AI Assistant', icon: '✦' },
];

export default function Sidebar() {
  return (
    <aside className="w-52 h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">Eastgate PM</p>
        <p className="text-xs text-gray-400 mt-0.5">SaaS Workspace</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors mb-0.5"
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-2 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
            A
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">Anish</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}