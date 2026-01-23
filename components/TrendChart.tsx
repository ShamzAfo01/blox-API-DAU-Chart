import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
    data: { date: string; value: number; previousValue?: number }[];
    color?: string; // This will now serve as the primary brown color
    height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-border p-4 rounded-xl shadow-xl">
                <p className="text-text-muted text-xs font-medium mb-2 uppercase tracking-wide">{label}</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary-900"></div>
                        <p className="text-text-primary font-bold text-lg">
                            ${payload[0].value.toLocaleString()}
                        </p>
                    </div>
                    {payload[1] && (
                        <div className="flex items-center gap-2 opacity-60">
                            <div className="w-2 h-2 rounded-full bg-primary-300"></div>
                            <p className="text-text-secondary font-medium text-sm">
                                ${payload[1].value.toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

export const TrendChart: React.FC<TrendChartProps> = ({ data, color = "#5d3225", height = 320 }) => {
    return (
        <div className="w-full h-full min-h-[350px] bg-white border border-border rounded-2xl p-8 shadow-sm font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-medium text-text-primary font-heading">Revenue Analytics</h3>
                    <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary-900"></div>
                            <span className="text-sm text-text-secondary font-normal">Current Period</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                            <span className="text-sm text-text-secondary font-normal">Previous Period</span>
                        </div>
                    </div>
                </div>
                <div className="bg-surface-elevated rounded-lg p-1 flex">
                    <button className="px-4 py-1.5 text-xs font-medium text-primary-900 bg-white shadow-sm rounded-md transition-all">Daily</button>
                    <button className="px-4 py-1.5 text-xs font-medium text-text-muted hover:text-text-primary rounded-md transition-all">Weekly</button>
                    <button className="px-4 py-1.5 text-xs font-medium text-text-muted hover:text-text-primary rounded-md transition-all">Monthly</button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                        dy={15}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                        tickFormatter={(value) => `${value / 1000}k`}
                        dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }} />

                    {/* Previous Period Line (Dashed) */}
                    <Area
                        type="monotone"
                        dataKey="previousValue"
                        stroke="#eaddd7"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        fill="transparent"
                        activeDot={false}
                    />

                    {/* Current Period Area */}
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        activeDot={{ r: 6, strokeWidth: 4, stroke: '#fff', fill: color }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
