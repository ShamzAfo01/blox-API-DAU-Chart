
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Heatmap } from './components/Heatmap';
import { OptimizationHub } from './components/OptimizationHub';
import { BrainChat } from './components/BrainChat';
import { View } from './types';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard />;
      case View.HEATMAP:
        return <Heatmap />;
      case View.OPTIMIZE:
        return <OptimizationHub />;
      case View.CHAT:
        return <BrainChat />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f8]">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 overflow-x-hidden p-6 lg:p-12">
        <div className="max-w-7xl mx-auto h-full">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-8 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
             <div className="flex items-center gap-2">
                <img 
                  src="https://bloxx.online/assets/images/logo_trans.png" 
                  alt="BloxAPI Logo" 
                  className="h-8 w-auto object-contain"
                />
             </div>
             <select 
               className="bg-primary-50 border-none text-[11px] font-bold text-primary-900 rounded-full px-4 py-1.5 focus:ring-1 focus:ring-primary-200"
               value={currentView}
               onChange={(e) => setCurrentView(e.target.value as View)}
             >
                <option value={View.DASHBOARD}>DASHBOARD</option>
                <option value={View.HEATMAP}>HEATMAPS</option>
                <option value={View.OPTIMIZE}>OPTIMIZATION</option>
                <option value={View.CHAT}>THE BRAIN</option>
             </select>
          </div>

          <div className="min-h-[80vh]">
            {renderView()}
          </div>

          <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} BloxAPI Systems. AI Layer Active.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
