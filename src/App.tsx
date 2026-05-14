import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';

function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <Layout activePage={page} onNavigate={setPage}>
      {page === 'dashboard' && <Dashboard />}
      {page === 'tasks' && <Kanban />}
    </Layout>
  );
}

export default App;