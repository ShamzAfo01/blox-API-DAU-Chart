import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Scorecard } from './components/Scorecard';
import { Loops } from './components/Loops';
import { Monetize } from './components/Monetize';
import { Experiments } from './components/Experiments';
import { Autopilot } from './components/Autopilot';
import { View } from './types';
import { Menu } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.SCORECARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case View.SCORECARD:
        return <Scorecard />;
      case View.LOOPS:
        return <Loops />;
      case View.MONETIZE:
        return <Monetize />;
      case View.EXPERIMENTS:
        return <Experiments />;
      case View.AUTOPILOT:
        return <Autopilot />;
      default:
        return <Scorecard />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-primary font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-surface border-r border-border transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar currentView={currentView} onViewChange={(view) => {
          setCurrentView(view);
          setIsSidebarOpen(false);
        }} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden h-14 border-b border-border bg-surface flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 hover:bg-surface-elevated rounded-lg text-text-secondary"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-lg text-primary">BloxAPI</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200" />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
