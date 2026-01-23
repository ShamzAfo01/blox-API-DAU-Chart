import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const TooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-surface border border-border p-3 rounded-lg shadow-lg text-xs">
                <p className="text-text-primary font-medium">{label}: {payload[0].value}%</p>
            </div>
        );
    }
    return null;
};

export const Loops: React.FC = () => {
    const retentionData = [
        { day: 'D1', value: 32 },
        { day: 'D7', value: 14 },
        { day: 'D14', value: 8 },
        { day: 'D30', value: 4 },
    ];

    return (
        <div className="space-y-6 animate-fade-in font-sans">
            <div className="flex justify-between items-center py-2">
                <h1 className="text-2xl font-medium text-text-primary font-heading">Engagement Loops</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-text-primary mb-1">Retention Curve</h3>
                    <p className="text-sm text-text-secondary mb-6">User return rate over 30 days.</p>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={retentionData}>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717A' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717A' }} />
                                <Tooltip content={<TooltipContent />} cursor={{ stroke: '#E4E4E7' }} />
                                <Area type="monotone" dataKey="value" stroke="#5d3225" fill="#5d3225" fillOpacity={0.1} strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-text-primary mb-1">Session Depth</h3>
                    <p className="text-sm text-text-secondary mb-6">Average levels completed per session.</p>
                    <div className="flex items-center justify-center h-64 text-text-muted text-sm border border-dashed border-border rounded-lg">
                        Additional metrics placeholder
                    </div>
                </div>
            </div>
        </div>
    );
};
