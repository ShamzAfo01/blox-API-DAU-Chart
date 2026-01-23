
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const items = [
    { id: View.SCORECARD, label: 'Scorecard', icon: '🏁' },
    { id: View.LOOPS, label: 'Loops', icon: '🔁' },
    { id: View.MONETIZE, label: 'Monetize', icon: '🛒' },
    { id: View.EXPERIMENTS, label: 'Experiments', icon: '🧪' },
    { id: View.AUTOPILOT, label: 'Autopilot', icon: '🤖' },
  ];

  return (
    <aside className="w-64 h-screen border-r border-border bg-surface sticky top-0 hidden lg:flex flex-col p-6">
      <div className="flex items-center gap-2 mb-10">
        <img
          src="https://bloxx.online/assets/images/logo_trans.png"
          alt="BloxAPI Logo"
          className="h-10 w-auto object-contain cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
          onClick={() => onNavigate(View.SCORECARD)}
        />
      </div>

      <nav className="space-y-1 flex-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm border ${currentView === item.id
                ? 'bg-primary-900/20 text-primary-300 border-primary-900/50 shadow-sm'
                : 'text-text-secondary border-transparent hover:bg-surface-elevated hover:text-text-primary'
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-5 bg-surface-elevated border border-border rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-primary-300 uppercase tracking-widest bg-primary-900/30 px-2 py-0.5 rounded border border-primary-900/50">PRO TIER</span>
        </div>
        <p className="text-xs text-text-muted leading-relaxed mb-4">Neural tuning active on 3 experiences.</p>
        <button className="w-full py-2 bg-primary hover:bg-primary-600 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95">
          Manage Token
        </button>
      </div>
    </aside>
  );
};
