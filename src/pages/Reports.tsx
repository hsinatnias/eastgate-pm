import { useState, useRef } from 'react';
import jsPDF from 'jspdf';

interface Report {
  id: string;
  title: string;
  client: string;
  date: string;
  type: 'Weekly' | 'Monthly' | 'Quarterly';
  status: 'Draft' | 'Sent';
}

const reports: Report[] = [
  { id: '1', title: 'Week 19 Status Update', client: 'Nihon Finance Ltd', date: 'May 15, 2026', type: 'Weekly', status: 'Draft' },
  { id: '2', title: 'Week 18 Status Update', client: 'Nihon Finance Ltd', date: 'May 6, 2026', type: 'Weekly', status: 'Sent' },
  { id: '3', title: 'April Billing Summary', client: 'TokyoTech Inc', date: 'May 1, 2026', type: 'Monthly', status: 'Sent' },
  { id: '4', title: 'Week 17 Status Update', client: 'Sakura Retail Co', date: 'Apr 29, 2026', type: 'Weekly', status: 'Sent' },
  { id: '5', title: 'Q1 Project Health Report', client: 'All clients', date: 'Apr 1, 2026', type: 'Quarterly', status: 'Sent' },
];

const typeStyles: Record<string, string> = {
  Weekly: 'bg-blue-100 text-blue-600',
  Monthly: 'bg-green-100 text-green-600',
  Quarterly: 'bg-purple-100 text-purple-600',
};

const aiPrompts = [
  { icon: '📄', client: 'Nihon Finance Ltd', description: 'Week 19 status report · SaaS Portal v2 + Analytics Module', prompt: 'Generate a weekly status report for Nihon Finance Ltd covering SaaS Portal v2 (68% complete) and Analytics Module (78% complete). Include completed milestones, upcoming tasks, and any risks.' },
  { icon: '🧾', client: 'TokyoTech Inc', description: 'Monthly billing summary · Mobile App MVP + Customer Portal', prompt: 'Generate a monthly billing summary for TokyoTech Inc covering Mobile App MVP and Customer Portal. Include time breakdown, completed tasks, and an invoice-ready summary in Japanese Yen.' },
  { icon: '📊', client: 'Sakura Retail Co', description: 'Project health dashboard · E-commerce Platform', prompt: 'Create an executive project health report for Sakura Retail Co covering the E-commerce Platform (34% complete). Include current status, risks, recommendations, and next milestones.' },
];

export default function Reports() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (prompt: string, client: string) => {
    setGenerating(client);
    setGeneratedReport(null);
    setSelectedPrompt(client);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1024,
          system: 'You are a professional project manager at a SaaS development company. Generate concise, professional client reports in markdown format. Use clear headings, bullet points, and professional language suitable for executive stakeholders.',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();
      setGeneratedReport(data.content[0].text);
    } catch {
      setGeneratedReport('Failed to generate report. Please try again.');
    } finally {
      setGenerating(null);
    }
  };

  const handleDownloadPDF = () => {
    if (!generatedReport || !selectedPrompt) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Header
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(31, 27, 75); // indigo
    pdf.text('Client Report', 20, 20);

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Client: ${selectedPrompt}`, 20, 30);
    pdf.text(`Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, 37);

    // Divider
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, 42, 190, 42);

    // Report content
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(50, 50, 50);

    const lines = pdf.splitTextToSize(generatedReport, 170);
    let y = 50;
    const lineHeight = 5;
    const pageHeight = 280;

    lines.forEach((line: string) => {
      if (y > pageHeight) {
        pdf.addPage();
        y = 20;
      }

      // Bold headers (lines starting with #)
      if (line.startsWith('#')) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(31, 27, 75);
        pdf.text(line.replace(/^#+\s*/, ''), 20, y);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(50, 50, 50);
        y += lineHeight + 2;
      } else {
        pdf.text(line, 20, y);
        y += lineHeight;
      }
    });

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Generated by Eastgate PM · AI-powered project management', 20, 290);

    pdf.save(`report-${selectedPrompt.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  return (
    <div className="flex flex-col gap-5">

      {/* AI Report Generator */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm">✦</div>
            <div>
              <p className="text-sm font-medium text-gray-900">AI report generator</p>
              <p className="text-xs text-gray-400">Auto-draft professional client updates in seconds</p>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          {aiPrompts.map((p) => (
            <button
              key={p.client}
              onClick={() => handleGenerate(p.prompt, p.client)}
              disabled={!!generating}
              className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl text-left hover:border-gray-200 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-base mt-0.5">{p.icon}</span>
              <div>
                <p className="text-xs font-medium text-gray-900">{p.client}</p>
                <p className="text-xs text-gray-400 mt-0.5">{p.description}</p>
              </div>
              {generating === p.client && (
                <div className="ml-auto flex gap-1 items-center mt-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Generated report output */}
        {generatedReport && (
          <div className="mx-4 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-gray-900">Generated report — {selectedPrompt}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(generatedReport)}
                  className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Copy
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="text-xs px-2.5 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ↓ PDF
                </button>
              </div>
            </div>
            <div ref={reportRef}>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed font-sans">
                {generatedReport}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Recent reports */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">Recent reports</h2>
          <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            ↓ Export all
          </button>
        </div>

        {reports.map((report) => (
          <div key={report.id} className="flex items-center gap-4 px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer last:border-0">
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">
              📄
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-900">{report.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{report.client} · {report.date}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeStyles[report.type]}`}>
              {report.type}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              report.status === 'Sent'
                ? 'bg-green-100 text-green-600'
                : 'bg-orange-100 text-orange-600'
            }`}>
              {report.status}
            </span>
            <button className="text-xs px-2.5 py-1 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              ↓ PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}