const stats = [
  { label: 'Active projects', value: '8', sub: '↑ 2 this month', color: 'text-green-500' },
  { label: 'Open tasks', value: '34', sub: '6 overdue', color: 'text-orange-400' },
  { label: 'Hours this week', value: '87h', sub: 'of 120h capacity', color: 'text-gray-400' },
  { label: 'Billable this month', value: '¥1.2M', sub: '↑ 18% vs last month', color: 'text-green-500' },
];

const projects = [
  { name: 'SaaS Portal v2', client: 'Nihon Finance Ltd', progress: 68, color: 'bg-blue-500' },
  { name: 'Mobile App MVP', client: 'TokyoTech Inc', progress: 91, color: 'bg-purple-500' },
  { name: 'E-commerce Platform', client: 'Sakura Retail Co', progress: 34, color: 'bg-red-500' },
  { name: 'API Integration Hub', client: 'Osaka Logistics', progress: 55, color: 'bg-green-500' },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-medium text-gray-900">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.color}`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">Active projects</h2>
          <button className="text-xs text-gray-400 hover:text-gray-900 transition-colors">View all</button>
        </div>
        {projects.map((project) => (
          <div key={project.name} className="flex items-center gap-4 px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer last:border-0">
            <div className={`w-2 h-2 rounded-full ${project.color} flex-shrink-0`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{project.name}</p>
              <p className="text-xs text-gray-400">{project.client}</p>
            </div>
            <div className="w-24">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-400">{project.progress}%</span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${project.color} rounded-full`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}