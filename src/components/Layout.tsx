import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  onSignOut: ()=> void;
}

export default function Layout({ children, activePage, onNavigate, onSignOut }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={onNavigate} onSignOut={onSignOut} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
}