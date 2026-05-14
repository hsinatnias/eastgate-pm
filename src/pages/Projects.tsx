import { useState } from "react";

type Status = 'Active' | 'Review' | 'On hold' | 'Done';

interface Project {
  id: string;
  name: string;
  client: string;
  status: Status;
  progress: number;
  due: string;
  budget: string;
  color: string;
  team: string[];
}

const projects: Project[] = [
  { id: '1', name: 'SaaS Portal v2', client: 'Nihon Finance Ltd', status: 'Active', progress: 68, due: 'Jun 30', budget: '¥2.4M', color: 'bg-blue-500', team: ['YT', 'KJ'] },
  { id: '2', name: 'Mobile App MVP', client: 'TokyoTech Inc', status: 'Review', progress: 91, due: 'May 20', budget: '¥1.8M', color: 'bg-purple-500', team: ['AI', 'RY'] },
  { id: '3', name: 'E-commerce Platform', client: 'Sakura Retail Co', status: 'Active', progress: 34, due: 'Aug 15', budget: '¥3.2M', color: 'bg-red-500', team: ['AI', 'KJ'] },
  { id: '4', name: 'API Integration Hub', client: 'Osaka Logistics', status: 'On hold', progress: 55, due: 'TBD', budget: '¥960K', color: 'bg-green-500', team: ['RY'] },
  { id: '5', name: 'HR Dashboard SaaS', client: 'Inhouse', status: 'Active', progress: 12, due: 'Sep 01', budget: '—', color: 'bg-orange-500', team: ['YT'] },
  { id: '6', name: 'Analytics Module', client: 'Nihon Finance Ltd', status: 'Active', progress: 78, due: 'Jun 10', budget: '¥880K', color: 'bg-blue-500', team: ['KJ', 'RY'] },
  { id: '7', name: 'Customer Portal', client: 'TokyoTech Inc', status: 'Active', progress: 45, due: 'Jul 22', budget: '¥1.5M', color: 'bg-purple-500', team: ['AI'] },
  { id: '8', name: 'Legacy Migration', client: 'Sakura Retail Co', status: 'Done', progress: 100, due: 'May 01', budget: '¥2.1M', color: 'bg-red-500', team: ['YT', 'KJ', 'RY'] },
];

const statusStyles: Record<Status, string> = {
  'Active': 'bg-green-100 text-green-600',
  'Review': 'bg-orange-100 text-orange-600',
  'On hold': 'bg-gray-100 text-gray-400',
  'Done': 'bg-blue-100 text-blue-600',
};

const assigneeColors: Record<string, string> = {
  YT: 'bg-blue-100 text-blue-600',
  KJ: 'bg-purple-100 text-purple-600',
  AI: 'bg-pink-100 text-pink-600',
  RY: 'bg-teal-100 text-teal-600',
};

const tabs = ['All projects', 'Active', 'Review', 'On hold', 'Done'];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All projects');

  const filtered = activeTab === 'All projects'
    ? projects
    : projects.filter((p) => p.status === activeTab);

  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">
          Projects ({filtered.length})
        </h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
          + New project
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-12 px-5 py-3 border-b border-gray-50 bg-gray-50">
          <div className="col-span-4 text-xs font-medium text-gray-400">Project</div>
          <div className="col-span-2 text-xs font-medium text-gray-400">Client</div>
          <div className="col-span-1 text-xs font-medium text-gray-400">Status</div>
          <div className="col-span-2 text-xs font-medium text-gray-400">Progress</div>
          <div className="col-span-1 text-xs font-medium text-gray-400">Due</div>
          <div className="col-span-1 text-xs font-medium text-gray-400">Budget</div>
          <div className="col-span-1 text-xs font-medium text-gray-400">Team</div>
        </div>

        {/* Rows */}
        {filtered.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-12 px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer last:border-0 items-center"
          >
            {/* Project name */}
            <div className="col-span-4 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${project.color} flex-shrink-0`} />
              <span className="text-xs font-medium text-gray-900">{project.name}</span>
            </div>

            {/* Client */}
            <div className="col-span-2 text-xs text-gray-400">{project.client}</div>

            {/* Status */}
            <div className="col-span-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[project.status]}`}>
                {project.status}
              </span>
            </div>

            {/* Progress */}
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${project.color} rounded-full`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6">{project.progress}%</span>
              </div>
            </div>

            {/* Due */}
            <div className="col-span-1 text-xs text-gray-400">{project.due}</div>

            {/* Budget */}
            <div className="col-span-1 text-xs font-medium text-gray-700">{project.budget}</div>

            {/* Team */}
            <div className="col-span-1 flex -space-x-1">
              {project.team.map((member) => (
                <div
                  key={member}
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium border border-white ${assigneeColors[member]}`}
                >
                  {member[0]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}