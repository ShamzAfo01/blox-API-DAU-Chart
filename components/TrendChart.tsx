import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TrendChartProps {
    data: { date: string; value: number }[];
    color?: string;
    height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-surface-elevated border border-border p-3 rounded-lg shadow-xl">
                <p className="text-text-muted text-xs mb-1">{label}</p>
                <p className="text-text-primary font-bold text-lg">
                    {payload[0].value.toLocaleString()}
                    <span className="text-text-muted text-xs font-normal ml-1">DAU</span>
                </p>
            </div>
        );
    }
    return null;
};

export const TrendChart: React.FC<TrendChartProps> = ({ data, color = "#5d3225", height = 300 }) => {
    // Calculate median for the reference line
    const values = data.map(d => d.value);
    const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)];

    return (
        <div className="w-full h-full min-h-[300px] bg-surface border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-text-primary">Engagement Trend</h3>
                    <p className="text-sm text-text-muted">Daily Active Users against median baseline.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium bg-surface-elevated text-text-primary rounded-md border border-border">7D</button>
                    <button className="px-3 py-1 text-xs font-medium text-text-muted hover:text-text-primary rounded-md">30D</button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.48)', fontSize: 11 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.48)', fontSize: 11 }}
                        dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={median} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" label={{ position: 'right', value: 'Median', fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
