
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: '00:00', dau: 4000, revenue: 2400, retention: 45 },
  { name: '04:00', dau: 3000, revenue: 1398, retention: 48 },
  { name: '08:00', dau: 2000, revenue: 9800, retention: 52 },
  { name: '12:00', dau: 2780, revenue: 3908, retention: 50 },
  { name: '16:00', dau: 1890, revenue: 4800, retention: 44 },
  { name: '20:00', dau: 2390, revenue: 3800, retention: 46 },
  { name: '23:59', dau: 3490, revenue: 4300, retention: 49 },
];

const kpis = [
  { 
    label: 'DAU', 
    val: '124,502', 
    change: '+12%', 
    desc: 'Daily Active Users: The number of unique players who logged in today.' 
  },
  { 
    label: 'Avg Session', 
    val: '24.5m', 
    change: '+2m', 
    desc: 'Average Session Length: How long players stay in your game per visit.' 
  },
  { 
    label: 'Daily Robux', 
    val: 'R$ 450k', 
    change: '-4%', 
    desc: 'Gross Revenue: Total Robux earned across all developer products.' 
  },
  { 
    label: 'D1 Retention', 
    val: '42.8%', 
    change: '+0.5%', 
    desc: 'Day 1 Retention: Percentage of new players who return the next day.' 
  },
];

export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold text-slate-900">Experience Overview</h2>
          <p className="text-slate-500">Real-time performance metrics for <span className="text-primary-800 font-semibold">"Ultimate Tycoon Sim"</span></p>
        </div>
        <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-bold border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                LIVE SYNC
            </span>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="kpi-card relative group bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-primary-300 transition-all cursor-help">
            <div className="kpi-tooltip">{kpi.desc}</div>
            <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
            <div className="flex items-end gap-3">
              <span className="text-2xl font-bold text-slate-900">{kpi.val}</span>
              <span className={`text-xs font-bold ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-rose-600'}`}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-lg flex items-center gap-2 text-slate-800">
                Engagement & Monetization 
            </h3>
            <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-[11px] font-bold text-primary-700 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full focus:ring-1 focus:ring-primary-400 outline-none cursor-pointer"
            >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5d3225" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#5d3225" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#fff'}}
                  itemStyle={{fontSize: '12px', fontWeight: '600'}}
                />
                <Area 
                    type="monotone" 
                    dataKey="dau" 
                    stroke="#5d3225" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorDau)"
                    radius={[4, 4, 0, 0]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#d3a088" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="relative z-10">
            <h3 className="font-heading font-bold text-lg mb-6 text-slate-800">Retention Curve</h3>
            <div className="h-[200px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="retention" stroke="#8e4a33" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="space-y-3">
                <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Day 1</span>
                    <span className="font-bold text-primary-900">42.8%</span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between opacity-80 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Day 7</span>
                    <span className="font-bold text-slate-900">18.2%</span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between opacity-60 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Day 30</span>
                    <span className="font-bold text-slate-900">5.4%</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
