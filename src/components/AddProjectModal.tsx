import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Modal from './Modal';

interface AddProjectModalProps {
  onClose: () => void;
  onProjectAdded: () => void;
}

const statuses = ['Active', 'Review', 'On hold'];
const colors = [
  { label: 'Blue', value: 'bg-blue-500' },
  { label: 'Purple', value: 'bg-purple-500' },
  { label: 'Red', value: 'bg-red-500' },
  { label: 'Green', value: 'bg-green-500' },
  { label: 'Orange', value: 'bg-orange-500' },
];

export default function AddProjectModal({ onClose, onProjectAdded }: AddProjectModalProps) {
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('Active');
  const [due, setDue] = useState('');
  const [budget, setBudget] = useState('');
  const [color, setColor] = useState('bg-blue-500');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }
    if (!client.trim()) {
      setError('Client name is required');
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from('projects')
      .insert({
        name: name.trim(),
        client: client.trim(),
        status,
        progress: 0,
        due: due || 'TBD',
        budget: budget || '—',
        color,
        team: [],
      });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onProjectAdded();
      onClose();
    }
  };

  return (
    <Modal title="Add new project" onClose={onClose}>
      <div className="flex flex-col gap-4">
        {error && (
          <div className="px-3 py-2 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}

        {/* Project name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Project name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Customer Portal v2"
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors"
            autoFocus
          />
        </div>

        {/* Client */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Client</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="e.g. Nihon Finance Ltd"
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Status + Color */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors bg-white"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors bg-white"
            >
              {colors.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Due + Budget */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Due date</label>
            <input
              type="text"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              placeholder="e.g. Jun 30"
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Budget</label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. ¥1.5M"
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors"
            />
          </div>
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
            {loading ? 'Adding...' : 'Add project'}
          </button>
        </div>
      </div>
    </Modal>
  );
}