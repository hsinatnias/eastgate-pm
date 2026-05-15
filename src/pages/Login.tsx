import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-sm">

        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-lg font-medium text-gray-900">Eastgate PM</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to your workspace</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-xs text-red-500">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors"
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!email || !password || loading}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          Eastgate Infotech · SaaS Workspace
        </p>
      </div>
    </div>
  );
}