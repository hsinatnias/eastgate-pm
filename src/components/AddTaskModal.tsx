import { useState } from 'react';
import type { Status, Priority } from '../types/index';
import { supabase } from '../lib/supabase';
import Modal from './Modal';

interface AddTaskModalProps {
  onClose: () => void;
  onTaskAdded: () => void;
}

const priorities: Priority[] = ['high', 'mid', 'low'];
const statuses: { value: Status; label: string }[] = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
];

const assignees = ['YT', 'KJ', 'AI', 'RY'];
const projects = ['SaaS Portal', 'E-commerce', 'Mobile App', 'API Hub'];

export default function AddTaskModal({ onClose, onTaskAdded }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState(projects[0]);
  const [priority, setPriority] = useState<Priority>('mid');
  const [assignee, setAssignee] = useState(assignees[0]);
  const [status, setStatus] = useState<Status>('backlog');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from('tasks')
      .insert({
        title: title.trim(),
        project,
        priority,
        assignee,
        status,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onTaskAdded();
      onClose();
    }
  };

  return (
    <Modal title="Add new task" onClose={onClose}>
      <div className="flex flex-col gap-4">
        {error && (
          <div className="px-3 py-2 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Task title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Implement user authentication"
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors"
            autoFocus
          />
        </div>

        {/* Project */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Project</label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors bg-white"
          >
            {projects.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Priority + Assignee */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors bg-white"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Assignee</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors bg-white"
            >
              {assignees.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors bg-white"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-40"
          >
            {loading ? 'Adding...' : 'Add task'}
          </button>
        </div>
      </div>
    </Modal>
  );
}