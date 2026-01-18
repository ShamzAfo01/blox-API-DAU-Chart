
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const items = [
    { id: View.DASHBOARD, label: 'Overview', icon: '📊' },
    { id: View.HEATMAP, label: 'Heatmaps', icon: '📍' },
    { id: View.OPTIMIZE, label: 'Optimize', icon: '🧠' },
    { id: View.CHAT, label: 'The Brain', icon: '💬' },
  ];

  return (
    <aside className="w-64 h-screen border-r border-slate-200 bg-white sticky top-0 hidden lg:flex flex-col p-6">
      <div className="flex items-center gap-2 mb-10">
        <img 
          src="https://bloxx.online/assets/images/logo_trans.png" 
          alt="BloxAPI Logo" 
          className="h-10 w-auto object-contain cursor-pointer"
          onClick={() => onNavigate(View.DASHBOARD)}
        />
      </div>

      <nav className="space-y-1 flex-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              currentView === item.id 
                ? 'bg-primary-50 text-primary-900 shadow-sm border border-primary-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-primary-800'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-5 bg-white border border-primary-200 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-primary-700 uppercase tracking-widest bg-primary-50 px-2 py-0.5 rounded">PRO TIER</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">Neural tuning active on 3 experiences.</p>
        <button className="w-full py-2 bg-primary-900 hover:bg-primary-800 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95">
          Manage Token
        </button>
      </div>
    </aside>
  );
};
