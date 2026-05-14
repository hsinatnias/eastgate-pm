import { useState, useEffect } from 'react';

interface TimeEntry {
  id: string;
  member: string;
  initials: string;
  task: string;
  project: string;
  seconds: number;
  billable: number;
  running: boolean;
}

const initialEntries: TimeEntry[] = [
  { id: '1', member: 'Yuki Tanaka', initials: 'YT', task: 'SaaS Portal UI Review', project: 'SaaS Portal', seconds: 1394, billable: 5804, running: true },
  { id: '2', member: 'Kenji Ito', initials: 'KJ', task: 'OAuth2 integration', project: 'SaaS Portal', seconds: 11520, billable: 48000, running: false },
  { id: '3', member: 'Aiko Nakamura', initials: 'AI', task: 'Payment gateway module', project: 'E-commerce', seconds: 9900, billable: 41250, running: false },
  { id: '4', member: 'Ryo Suzuki', initials: 'RY', task: 'Mobile push notifications', project: 'Mobile App', seconds: 5400, billable: 22500, running: false },
  { id: '5', member: 'Kenji Ito', initials: 'KJ', task: 'Code review', project: 'SaaS Portal', seconds: 2700, billable: 11250, running: false },
];

const assigneeColors: Record<string, string> = {
  YT: 'bg-blue-100 text-blue-600',
  KJ: 'bg-purple-100 text-purple-600',
  AI: 'bg-pink-100 text-pink-600',
  RY: 'bg-teal-100 text-teal-600',
};

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatYen(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

const stats = [
  { label: 'Today', value: '6h 42m', sub: 'Team total' },
  { label: 'This week', value: '87h 15m', sub: 'of 120h capacity' },
  { label: 'Billable this month', value: '¥1.24M', sub: '72% utilization' },
];

export default function TimeTracking() {
  const [entries, setEntries] = useState<TimeEntry[]>(initialEntries);

  // useEffect runs after every render
  // The empty array [] means "only set this up once when component mounts"
  useEffect(() => {
    const timer = setInterval(() => {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.running
            ? { ...entry, seconds: entry.seconds + 1 }
            : entry
        )
      );
    }, 1000);

    // Cleanup function — stops the timer when component unmounts
    return () => clearInterval(timer);
  }, []);

  const handleToggle = (id: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, running: !entry.running }
          : { ...entry, running: false }
      )
    );
  };

  return (
    <div className="flex flex-col gap-5">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-medium text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Time entries table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">Time entries — today</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
            + Start timer
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Member</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Task</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Project</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Duration</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Billable</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${assigneeColors[entry.initials]}`}>
                      {entry.initials}
                    </div>
                    <span className="text-xs text-gray-700">{entry.member}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-xs text-gray-700">{entry.task}</td>
                <td className="px-5 py-3 text-xs text-gray-400">{entry.project}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-mono font-medium ${entry.running ? 'text-green-500' : 'text-gray-700'}`}>
                    {formatTime(entry.seconds)}
                    {entry.running && ' ●'}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs font-medium text-gray-700">
                  {formatYen(entry.billable)}
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${entry.running ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {entry.running ? 'Running' : 'Logged'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => handleToggle(entry.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${entry.running ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {entry.running ? 'Stop' : 'Start'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}