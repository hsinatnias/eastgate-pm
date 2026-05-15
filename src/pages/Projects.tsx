import { useEffect, useState } from "react";
import { supabase } from '../lib/supabase';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All projects');

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filtered = activeTab === 'All projects'
    ? projects
    : projects.filter((p) => p.status === activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-gray-400">Loading projects...</p>
      </div>
    );
  }

  
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

        {/* Column headers - hidden on mobile */}
        <div className="hidden lg:grid grid-cols-12 px-5 py-3 border-b border-gray-50 bg-gray-50">
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
          className="flex flex-col lg:grid lg:grid-cols-12 px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer last:border-0 gap-2 lg:gap-0 lg:items-center"
        >
          {/* Project name */}
          <div className="col-span-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${project.color} flex-shrink-0`} />
            <span className="text-xs font-medium text-gray-900">{project.name}</span>
          </div>

          {/* Mobile row — client + status side by side */}
          <div className="flex items-center justify-between lg:contents">
            <div className="col-span-2 text-xs text-gray-400">{project.client}</div>
            <div className="col-span-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[project.status]}`}>
                {project.status}
              </span>
            </div>
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

          {/* Due + Budget + Team - hidden on mobile */}
          <div className="hidden lg:block col-span-1 text-xs text-gray-400">{project.due}</div>
          <div className="hidden lg:block col-span-1 text-xs font-medium text-gray-700">{project.budget}</div>
          <div className="col-span-1 flex -space-x-1">
            {(project.team || []).map((member) => (
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