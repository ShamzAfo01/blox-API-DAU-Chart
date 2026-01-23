import React from 'react';
import { KPI } from '../types';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface KPITileProps {
    kpi: KPI;
    onClick: () => void;
}

export const KPITile: React.FC<KPITileProps> = ({ kpi, onClick }) => {
    const getStatusEmoji = (status: KPI['status']) => {
        switch (status) {
            case 'healthy': return '🟢';
            case 'watch': return '🟠';
            case 'risk': return '🔴';
            default: return '🟢';
        }
    };

    const getDeltaColor = (deltaType: KPI['deltaType']) => {
        switch (deltaType) {
            case 'positive': return 'text-success bg-success/10 border-success/20';
            case 'negative': return 'text-danger bg-danger/10 border-danger/20';
            case 'neutral': return 'text-info bg-info/10 border-info/20';
        }
    };

    const getDeltaIcon = (deltaType: KPI['deltaType']) => {
        switch (deltaType) {
            case 'positive': return <TrendingUp size={12} />;
            case 'negative': return <TrendingDown size={12} />;
            case 'neutral': return <Minus size={12} />;
        }
    };

    const data = kpi.history.map((val, i) => ({ val, i }));

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="kpi-card bg-surface border border-border rounded-xl p-5 shadow-soft cursor-pointer relative overflow-hidden group hover:border-border/50 transition-colors"
            onClick={onClick}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm shadow-sm">{getStatusEmoji(kpi.status)}</span>
                    <span className="text-text-secondary font-medium text-sm">{kpi.label}</span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded textxs font-bold uppercase tracking-wide border ${getDeltaColor(kpi.deltaType)}`}>
                    {getDeltaIcon(kpi.deltaType)}
                    <span>{kpi.delta}</span>
                </div>
            </div>

            <div className="flex items-end justify-between mt-4">
                <div className="text-2xl font-bold text-text-primary tabular-nums tracking-tight">
                    {kpi.value}
                </div>

                <div className="h-10 w-24 opacity-60 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line
                                type="monotone"
                                dataKey="val"
                                stroke={kpi.deltaType === 'negative' ? '#EF4444' : '#5d3225'}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Tooltip for hover effect */}
            <div className="kpi-tooltip">
                Click to see drivers + segments
            </div>
        </motion.div>
    );
};
