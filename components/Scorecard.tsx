import React from 'react';
import { KPITile } from './KPITile';
import { TrendChart } from './TrendChart';
import { GoalGauge } from './GoalGauge';
import { FeatureCarousel } from './FeatureCarousel';
import { KPI } from '../types';
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
            label: 'Avg. Session',
            value: '14m 20s',
            delta: '-2.89%',
            deltaType: 'negative',
            status: 'watch',
            history: [60, 55, 50, 45, 48, 42, 40]
        },
        {
            id: 'visitors',
            label: 'Daily Active',
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

    return (
        <div className="space-y-6 animate-fade-in pb-12 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-border shadow-sm">
                <h1 className="text-xl font-medium text-text-primary font-heading">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <div className="bg-surface-elevated rounded-lg px-2 py-1 text-xs text-text-muted">
                        BloxAPI v2.0
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

            {/* Main Grid Mix */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 min-h-[400px] items-start">
                {/* Trend Chart - Spans 2 Cols */}
                <div className="xl:col-span-2 h-full">
                    <TrendChart data={trendData} height={380} />
                </div>

                {/* Goal Gauge - Spans 1 Col */}
                <div className="xl:col-span-1 h-full">
                    <GoalGauge current={510000} target={600000} />
                </div>

                {/* Feature Carousel - Spans 1 Col (Replaces old List/Recs) */}
                <div className="xl:col-span-1 h-full flex flex-col gap-6">
                    <FeatureCarousel className="flex-1" />
                </div>
            </div>
        </div>
    );
};
