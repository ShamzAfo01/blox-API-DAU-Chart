import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GoalGaugeProps {
    current: number;
    target: number;
    title?: string;
}

export const GoalGauge: React.FC<GoalGaugeProps> = ({
    current,
    target,
    title = "Monthly Target"
}) => {
    const percentage = Math.min(100, Math.round((current / target) * 100));
    const data = [
        { name: 'Progress', value: current },
        { name: 'Remaining', value: target - current }
    ];

    return (
        <div className="w-full h-full min-h-[350px] bg-white border border-border rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
            <div className="w-full flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-text-primary">{title}</h3>
                <button className="text-text-muted hover:text-text-primary">•••</button>
            </div>

            <div className="relative w-full h-48 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="80%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={80}
                            outerRadius={100}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={10}
                        >
                            <Cell key="progress" fill="#5d3225" />
                            <Cell key="remaining" fill="#f3f4f6" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 top-16 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-4xl font-bold text-text-primary">{percentage}%</span>
                    <span className="text-success text-xs font-bold bg-success/10 px-2 py-0.5 rounded mt-2">+8.02% from last month</span>
                </div>
            </div>

            <div className="mt-8 text-center max-w-[200px]">
                <h4 className="font-bold text-text-primary mb-1">Great Progress! 🎉</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                    Our achievement increased by <span className="text-primary-600 font-bold">$200,000</span>; let's reach 100% next month.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-auto pt-6">
                <div className="bg-surface-elevated rounded-xl p-3">
                    <p className="text-xs text-text-muted mb-1">Target</p>
                    <p className="text-sm font-bold text-text-primary">${target.toLocaleString()}</p>
                </div>
                <div className="bg-surface-elevated rounded-xl p-3">
                    <p className="text-xs text-text-muted mb-1">Revenue</p>
                    <p className="text-sm font-bold text-text-primary">${current.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};
