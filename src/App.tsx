import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import TimeTracking from './pages/TimeTracking';
import AIAssistant from './pages/AIAssistant';
import Projects from './pages/Projects';
import Reports from './pages/Reports';


function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <Layout activePage={page} onNavigate={setPage}>
      {page === 'dashboard' && <Dashboard />}
      {page === 'tasks' && <Kanban />}
      {page == 'time' && <TimeTracking />}
      {page === 'ai' && <AIAssistant />}
      {page === 'projects' && <Projects />}
      {page === 'reports' && <Reports />}
    </Layout>
  );
}

export default App;