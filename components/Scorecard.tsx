import React from 'react';
import { KPITile } from './KPITile';
import { RecommendationCard } from './RecommendationCard';
import { TrendChart } from './TrendChart';
import { KPI, Recommendation } from '../types';
import { motion } from 'framer-motion';

export const Scorecard: React.FC = () => {
    const kpis: KPI[] = [
        {
            id: 'retention',
            label: 'D1 Retention',
            value: '42.8%',
            delta: '+1.2pp',
            deltaType: 'positive',
            status: 'healthy',
            history: [38, 39, 41, 40, 42, 42.8, 43]
        },
        {
            id: 'engagement',
            label: 'Avg Session Time',
            value: '12m 30s',
            delta: '-4.3%',
            deltaType: 'negative',
            status: 'watch',
            history: [14, 13.5, 13.2, 13.0, 12.8, 12.5, 12.2]
        },
        {
            id: 'monetization',
            label: 'ARPDAU',
            value: '$0.14',
            delta: '+0.8%',
            deltaType: 'positive',
            status: 'healthy',
            history: [0.12, 0.12, 0.13, 0.13, 0.14, 0.14, 0.14]
        }
    ];

    const recommendations: Recommendation[] = [
        {
            id: 'rec1',
            title: 'Cut Time-to-First-Fun by 20–30s to lift D1 retention.',
            impact: 'High',
            confidence: 85,
            effort: 'Low',
            risk: 'Low',
            type: 'opportunity'
        },
        {
            id: 'rec2',
            title: 'Mobile players are dropping during Step 2 of tutorial.',
            impact: 'Medium',
            confidence: 90,
            effort: 'Medium',
            risk: 'Medium',
            type: 'risk'
        }
    ];

    const chartData = [
        { date: 'Mon', value: 12400 },
        { date: 'Tue', value: 12800 },
        { date: 'Wed', value: 13900 },
        { date: 'Thu', value: 13500 },
        { date: 'Fri', value: 14200 },
        { date: 'Sat', value: 15100 },
        { date: 'Sun', value: 16000 },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary mb-1">Scorecard</h1>
                    <p className="text-text-secondary text-sm">Today’s health + what to do next</p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-mono text-text-muted block mb-1">LAST UPDATED</span>
                    <span className="text-sm font-medium text-text-primary">Just now</span>
                </div>
            </div>

            {/* KPI Row - Above the Fold */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kpis.map((kpi, index) => (
                    <motion.div
                        key={kpi.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <KPITile kpi={kpi} onClick={() => console.log('clicked', kpi.id)} />
                    </motion.div>
                ))}
            </div>

            {/* Mid Row: Opportunities & Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                        <span>💡</span> Recommended Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        {recommendations.map((rec) => (
                            <RecommendationCard key={rec.id} recommendation={rec} />
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                        <span>📉</span> Recent Alerts
                    </h2>
                    <div className="bg-surface border border-border rounded-xl p-5 h-full min-h-[220px]">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="text-xl">⚠️</span>
                            <div>
                                <p className="text-sm font-bold text-text-primary">Retention Anomaly Detected</p>
                                <p className="text-xs text-text-secondary mt-1">D1 Retention dropped 5% in creating segments.</p>
                            </div>
                        </div>
                        <div className="h-px bg-border my-4"></div>
                        <button className="w-full py-2 text-sm text-text-secondary hover:text-text-primary border border-dashed border-border rounded hover:border-text-muted transition-colors">
                            View Alert History
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Fold: Trends */}
            <div className="pt-4">
                <TrendChart data={chartData} />
            </div>
        </div>
    );
};
