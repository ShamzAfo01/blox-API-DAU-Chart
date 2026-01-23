
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Scorecard } from './components/Scorecard';
import { View } from './types';

// Placeholder for other views
const PlaceholderView = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <div className="text-4xl mb-4">🚧</div>
    <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
    <p className="text-text-secondary max-w-md">
      This module is currently under construction. Check back later for updates.
    </p>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState<View>(View.SCORECARD);

  const renderView = () => {
    switch (currentView) {
      case View.SCORECARD:
        return <Scorecard />;
      case View.LOOPS:
        return <PlaceholderView title="Engagement Loops" />;
      case View.MONETIZE:
        return <PlaceholderView title="Monetization" />;
      case View.EXPERIMENTS:
        return <PlaceholderView title="Experiments" />;
      case View.AUTOPILOT:
        return <PlaceholderView title="Autopilot Config" />;
      default:
        return <Scorecard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      <main className="flex-1 overflow-x-hidden p-6 lg:p-12">
        <div className="max-w-[1200px] mx-auto h-full">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-8 p-4 bg-surface border border-border rounded-2xl shadow-sm">
            <div className="flex items-center gap-2">
              <img
                src="https://bloxx.online/assets/images/logo_trans.png"
                alt="BloxAPI Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <select
              className="bg-surface-elevated border-border text-[11px] font-bold text-text-primary rounded-full px-4 py-1.5 focus:ring-1 focus:ring-primary-500"
              value={currentView}
              onChange={(e) => setCurrentView(e.target.value as View)}
            >
              <option value={View.SCORECARD}>SCORECARD</option>
              <option value={View.LOOPS}>LOOPS</option>
              <option value={View.MONETIZE}>MONETIZE</option>
              <option value={View.EXPERIMENTS}>EXPERIMENTS</option>
              <option value={View.AUTOPILOT}>AUTOPILOT</option>
            </select>
          </div>

          <div className="min-h-[80vh]">
            {renderView()}
          </div>

          <footer className="mt-12 pt-8 border-t border-border text-center text-text-muted text-[10px] font-bold uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} BloxAPI Systems. AI Layer Active.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
