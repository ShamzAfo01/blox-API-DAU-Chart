import React from 'react';
import { KPITile } from './KPITile';
import { TrendChart } from './TrendChart';
import { DistributionChart } from './DistributionChart';
import { GoalGauge } from './GoalGauge';
import { RecommendationCard } from './RecommendationCard'; // Kept for below the fold
import { KPI, Recommendation } from '../types';
import { motion } from 'framer-motion';

export const Scorecard: React.FC = () => {
    const kpis: KPI[] = [
        {
            id: 'revenue',
            label: 'Total Sales',
            value: '$983,410',
            delta: '+3.34%',
            deltaType: 'positive',
            status: 'healthy',
            history: [300, 400, 350, 500, 600, 700, 900]
        },
        {
            id: 'orders',
            label: 'Total Orders',
            value: '58,375',
            delta: '-2.89%',
            deltaType: 'negative',
            status: 'watch',
            history: [60, 55, 50, 45, 48, 42, 40]
        },
        {
            id: 'visitors',
            label: 'Total Visitors',
            value: '237,782',
            delta: '+8.02%',
            deltaType: 'positive',
            status: 'healthy',
            history: [200, 220, 210, 240, 235, 260, 280]
        }
    ];

    const trendData = [
        { date: '12 Aug', value: 14000, previousValue: 12000 },
        { date: '13 Aug', value: 16500, previousValue: 12500 },
        { date: '14 Aug', value: 14200, previousValue: 13000 },
        { date: '15 Aug', value: 18000, previousValue: 14000 },
        { date: '16 Aug', value: 21000, previousValue: 15000 },
        { date: '17 Aug', value: 17500, previousValue: 15500 },
        { date: '18 Aug', value: 16800, previousValue: 16000 },
        { date: '19 Aug', value: 19500, previousValue: 16500 },
    ];

    const categoryData = [
        { name: 'Electronics', value: 1200000 },
        { name: 'Fashion', value: 950000 },
        { name: 'Home & Kitchen', value: 750000 },
        { name: 'Beauty', value: 500000 },
    ];

    const recommendations: Recommendation[] = [
        {
            id: 'rec1',
            title: 'Optimize "Fashion" segment ad spend.',
            impact: 'High',
            confidence: 85,
            effort: 'Low',
            risk: 'Low',
            type: 'opportunity'
        },
        {
            id: 'rec2',
            title: 'High abandonment in checkout flow.',
            impact: 'Medium',
            confidence: 90,
            effort: 'Medium',
            risk: 'Medium',
            type: 'risk'
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-border shadow-sm">
                <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input type="text" placeholder="Search stock, order, etc" className="bg-surface-elevated pl-10 pr-4 py-2 rounded-lg text-sm border-none focus:ring-1 focus:ring-primary-500 w-64 text-text-primary placeholder:text-text-muted" />
                        <span className="absolute left-3 top-2.5 opacity-40">🔍</span>
                    </div>
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-xs font-bold text-primary-900">MG</div>
                    </div>
                </div>
            </div>

            {/* KPI Row */}
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

            {/* Main Grid: Revenue & Targets */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-[400px]">
                <div className="xl:col-span-2 h-full">
                    <TrendChart data={trendData} />
                </div>
                <div className="xl:col-span-1 h-full">
                    <GoalGauge current={510000} target={600000} />
                </div>
            </div>

            {/* Secondary Grid: Categories & Recommendations */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1 h-full">
                    <DistributionChart data={categoryData} />
                </div>
                <div className="xl:col-span-2">
                    <h3 className="text-xl font-bold text-text-primary mb-4">Recommended Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recommendations.map((rec) => (
                            <RecommendationCard key={rec.id} recommendation={rec} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
