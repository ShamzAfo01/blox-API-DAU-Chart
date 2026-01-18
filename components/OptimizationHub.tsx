
import React, { useState, useEffect } from 'react';
import { getOptimizationSuggestions } from '../services/geminiService';
import { OptimizationSuggestion } from '../types';

export const OptimizationHub: React.FC = () => {
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTuning, setActiveTuning] = useState({
    chaosLevel: 42,
    difficultyScale: 1.2,
    dropRate: 0.05
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getOptimizationSuggestions({ dau: 124000, arpu: 3.2, retention: 0.42 });
      setSuggestions(res);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold text-slate-900">Optimization Hub</h2>
          <p className="text-slate-500">AI-assisted tuning and real-time variable deployment.</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-slate-800 text-lg flex items-center gap-2">
            🧠 AI Insights
            {loading && <span className="text-xs font-normal text-slate-400 animate-pulse">Analysing real-time data...</span>}
          </h3>
          
          <div className="space-y-4">
            {suggestions.map((s, i) => (
              <div key={i} className="group bg-white border border-slate-200 p-6 rounded-3xl hover:border-primary-400 transition-all shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                      s.impact === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-50 text-slate-600 border border-slate-100'
                    }`}>
                      {s.impact} Impact
                    </span>
                    <span className="text-[10px] font-bold bg-primary-50 text-primary-900 border border-primary-100 px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {s.category}
                    </span>
                  </div>
                </div>
                <h4 className="font-heading font-bold text-slate-900 mb-2">{s.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{s.description}</p>
                {s.actionable && (
                  <button className="flex items-center gap-2 text-primary-800 text-sm font-bold group-hover:gap-3 transition-all">
                    Apply Variable Fix &rarr;
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-heading font-bold text-slate-800 text-lg">Live Dynamic Tuning</h3>
          <div className="bg-[#1e1b1a] rounded-3xl p-8 text-white relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
             <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chaos Event Probability</label>
                        <span className="font-mono text-primary-300">{activeTuning.chaosLevel}%</span>
                    </div>
                    <input 
                        type="range" 
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-400"
                        value={activeTuning.chaosLevel}
                        onChange={(e) => setActiveTuning({...activeTuning, chaosLevel: parseInt(e.target.value)})}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Difficulty Scalar</label>
                        <span className="font-mono text-emerald-400">{activeTuning.difficultyScale}x</span>
                    </div>
                    <input 
                        type="range" 
                        min="0.5" max="3" step="0.1"
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        value={activeTuning.difficultyScale}
                        onChange={(e) => setActiveTuning({...activeTuning, difficultyScale: parseFloat(e.target.value)})}
                    />
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-medium text-slate-400 mb-1">Status: <span className="text-green-500">Connected</span></p>
                        <p className="text-[9px] text-slate-500 font-mono italic">Syncing with BloxAPI Plugin v4.2.0</p>
                    </div>
                    <button className="bg-primary-700 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95">
                        Push Updates Live
                    </button>
                </div>
             </div>
          </div>

          <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center py-10 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-3">
                ➕
            </div>
            <p className="text-sm font-bold text-slate-900">Add Custom Parameter</p>
            <p className="text-xs text-slate-500 max-w-[180px] mt-1">Expose new experience variables.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
