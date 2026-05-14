import { useState } from 'react';
import type{ Task, Column, Status } from '../types/index';

const columns: Column[] = [
  { id: 'backlog', label: 'Backlog', count: 0 },
  { id: 'inprogress', label: 'In Progress', count: 0 },
  { id: 'review', label: 'Review', count: 0 },
  { id: 'done', label: 'Done', count: 0 },
];

const initialTasks: Task[] = [
  { id: '1', title: 'OAuth2 integration', project: 'SaaS Portal', priority: 'high', assignee: 'KJ', status: 'inprogress' },
  { id: '2', title: 'Payment gateway module', project: 'E-commerce', priority: 'high', assignee: 'AI', status: 'inprogress' },
  { id: '3', title: 'Mobile push notifications', project: 'Mobile App', priority: 'mid', assignee: 'RY', status: 'inprogress' },
  { id: '4', title: 'User onboarding redesign', project: 'SaaS Portal', priority: 'high', assignee: 'YT', status: 'review' },
  { id: '5', title: 'Database optimization', project: 'E-commerce', priority: 'mid', assignee: 'AI', status: 'review' },
  { id: '6', title: 'CI/CD pipeline setup', project: 'SaaS Portal', priority: 'mid', assignee: 'KJ', status: 'done' },
  { id: '7', title: 'Design system audit', project: 'SaaS Portal', priority: 'low', assignee: 'RY', status: 'backlog' },
  { id: '8', title: 'API rate limiting', project: 'SaaS Portal', priority: 'mid', assignee: 'KJ', status: 'backlog' },
];

const priorityColors = {
  high: 'bg-red-100 text-red-600',
  mid: 'bg-orange-100 text-orange-600',
  low: 'bg-green-100 text-green-600',
};

const assigneeColors = [
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-pink-100 text-pink-600',
  'bg-teal-100 text-teal-600',
];

export default function Kanban() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [dragging, setDragging] = useState<string | null>(null);

  const getTasksByStatus = (status: string) =>
    tasks.filter((t) => t.status === status);

  const handleDragStart = (taskId: string) => {
    setDragging(taskId);
  };

  const handleDrop = (status: Status) => {
    if (!dragging) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === dragging ? { ...t, status } : t))
    );
    setDragging(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Task board</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
          + Add task
        </button>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-4 gap-3">
        {columns.map((col) => {
          const colTasks = getTasksByStatus(col.id);
          return (
            <div
              key={col.id}
              className="bg-gray-50 rounded-xl p-2"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-2 py-1.5 mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {col.label}
                </span>
                <span className="text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5 text-gray-400">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="flex flex-col gap-2">
                {colTasks.map((task, i) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className="bg-white border border-gray-100 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <p className="text-xs font-medium text-gray-900 mb-2 leading-snug">
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-400">{task.project}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${assigneeColors[i % assigneeColors.length]}`}>
                        {task.assignee}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}