import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DistributionChartProps {
    data: { name: string; value: number }[];
    title?: string;
    totalLabel?: string;
}

const COLORS = ['#5d3225', '#8e4a33', '#c37d5d', '#e0c1b3'];

export const DistributionChart: React.FC<DistributionChartProps> = ({
    data,
    title = "Top Categories",
    totalLabel = "Total Revenue"
}) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="w-full h-full min-h-[350px] bg-white border border-border rounded-2xl p-8 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-text-primary">{title}</h3>
                <button className="text-sm text-primary-600 font-semibold hover:text-primary-800">See All</button>
            </div>

            <div className="relative flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={105}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            itemStyle={{ color: '#5d3225', fontWeight: 'bold' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-text-muted text-sm font-medium mb-1">{totalLabel}</span>
                    <span className="text-2xl font-bold text-text-primary">${total.toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                {data.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-md" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <span className="text-text-secondary font-medium text-sm">{item.name}</span>
                        </div>
                        <span className="text-text-primary font-bold text-sm">${item.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
