import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  { icon: '🎯', label: 'This week\'s priorities', prompt: 'What tasks should my team focus on this week given all our project deadlines and current progress?' },
  { icon: '⚠️', label: 'Portfolio risk analysis', prompt: 'Analyze our project portfolio. Which projects are at risk and what should we do?' },
  { icon: '✍️', label: 'Draft a project proposal', prompt: 'Help me write a project proposal for a new SaaS analytics platform for a Japanese enterprise client.' },
  { icon: '👥', label: 'Smart workload balancing', prompt: 'What is the optimal task distribution across our team for the next two weeks?' },
  { icon: '🧮', label: 'Project estimation', prompt: 'Estimate the time and budget needed to build a multi-tenant SaaS billing module from scratch.' },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // API call will go here later
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚙️ AI assistant coming soon — API key not configured yet. Check back tonight!'
        }
      ]);
      setLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base">✦</div>
          <div>
            <p className="text-sm font-medium text-gray-900">AI project assistant</p>
            <p className="text-xs text-gray-400">Powered by Claude · Ask anything about your projects</p>
          </div>
        </div>
      </div>

      {/* Suggestions — show only when no messages */}
      {messages.length === 0 && (
        <div className="grid grid-cols-1 gap-2">
          {suggestions.map((s) => (
            <button
              key={s.label}
              onClick={() => handleSend(s.prompt)}
              className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-xl text-left hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <span className="text-base mt-0.5">{s.icon}</span>
              <div>
                <p className="text-xs font-medium text-gray-900">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{s.prompt}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xl px-4 py-2.5 rounded-xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-100 text-gray-700'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5">
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="bg-white border border-gray-100 rounded-xl p-3 flex items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your projects, tasks, or team…"
          rows={2}
          className="flex-1 text-xs text-gray-700 placeholder-gray-300 resize-none outline-none"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || loading}
          className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>

    </div>
  );
}