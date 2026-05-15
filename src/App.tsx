import { useState } from 'react';
import { AuthProvider,  useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import TimeTracking from './pages/TimeTracking';
import AIAssistant from './pages/AIAssistant';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Login from './pages/Login';



function AppContent(){
  const { user, loading, signOut } = useAuth();
  const [page, setPage] = useState('dashboard');

  if(loading){
    return(
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if(!user){
    return <Login/>;
  }
  return (
    <Layout activePage={page} onNavigate={setPage} onSignOut={signOut}>
      {page === 'dashboard' && <Dashboard />}
      {page === 'tasks' && <Kanban />}
      {page === 'time' && <TimeTracking />}
      {page === 'ai' && <AIAssistant />}
      {page === 'projects' && <Projects />}
      {page === 'reports' && <Reports />}
    </Layout>
  );
}


function App() {  

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;