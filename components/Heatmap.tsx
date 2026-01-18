
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const Heatmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ hot: 0, high: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 400;
    const gridSize = 14; // Smaller boxes
    const cols = Math.floor(width / gridSize);
    const rows = Math.floor(height / gridSize);

    d3.select(containerRef.current).selectAll('*').remove();
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'rounded-3xl border border-slate-200 bg-[#0c0a09] shadow-inner overflow-hidden');

    const generateData = () => {
      const data = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const centerX = cols / 2 + Math.sin(Date.now() / 5000) * 5;
          const centerY = rows / 2 + Math.cos(Date.now() / 3000) * 3;
          const dist = Math.sqrt(Math.pow(i - centerX, 2) + Math.pow(j - centerY, 2));
          const val = Math.max(0, 1 - dist / (cols / 2.5)) * (80 + Math.random() * 20);
          data.push({ i, j, val });
        }
      }
      return data;
    };

    const colorScale = d3.scaleSequential(d3.interpolateWarm).domain([0, 100]);

    const rects = svg.selectAll('rect')
      .data(generateData())
      .enter()
      .append('rect')
      .attr('x', d => d.i * gridSize)
      .attr('y', d => d.j * gridSize)
      .attr('width', gridSize - 1)
      .attr('height', gridSize - 1)
      .attr('rx', 2)
      .attr('fill', d => colorScale(d.val))
      .attr('opacity', 0.8);

    // Make it "alive" by updating periodically
    const interval = setInterval(() => {
      rects.data(generateData())
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attr('fill', d => colorScale(d.val));
      
      setStats({
          hot: Math.floor(Math.random() * 10 + 85),
          high: Math.floor(Math.random() * 15 + 40)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="font-heading text-3xl font-bold text-slate-900">Engagement Heatmap</h2>
        <p className="text-slate-500">Spatial distribution of player activity across the "Spawn Arena" zone.</p>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div ref={containerRef} className="w-full h-[400px] relative">
              <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur text-white text-[10px] px-3 py-1.5 rounded-full border border-slate-700 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  Live View: Map 01A
              </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h4 className="font-heading font-bold text-sm mb-4 text-slate-800">Real-time Density</h4>
            <div className="space-y-4">
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
                        <span>New Player Hub</span>
                        <span className="text-orange-600">{stats.hot}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full transition-all duration-1000" style={{width: `${stats.hot}%`}}></div>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
                        <span>Shop Area</span>
                        <span className="text-primary-700">{stats.high}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-primary-600 h-full transition-all duration-1000" style={{width: `${stats.high}%`}}></div>
                    </div>
                </div>
            </div>
          </div>

          <div className="p-6 bg-primary-900 rounded-2xl text-white shadow-lg">
            <h4 className="font-heading font-bold text-sm mb-2">Churn Alert</h4>
            <p className="text-xs text-primary-100 leading-relaxed mb-4">Unusual congestion detected near NPC 04. Average wait time exceeded 12s.</p>
            <button className="w-full py-2 bg-white text-primary-900 rounded-lg text-xs font-bold hover:bg-primary-50 transition-colors shadow-sm">
                Deploy Crowd Control NPC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
