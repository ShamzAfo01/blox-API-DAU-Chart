import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const Monetize: React.FC = () => {
    const revenueData = [
        { date: 'Mon', value: 1200 },
        { date: 'Tue', value: 1350 },
        { date: 'Wed', value: 1100 },
        { date: 'Thu', value: 1600 },
        { date: 'Fri', value: 1450 },
        { date: 'Sat', value: 1900 },
        { date: 'Sun', value: 1750 },
    ];

    return (
        <div className="space-y-6 animate-fade-in font-sans">
            <div className="flex justify-between items-center py-2">
                <h1 className="text-2xl font-medium text-text-primary font-heading">Monetization</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-text-primary mb-1">ARPDAU Trend</h3>
                            <p className="text-sm text-text-secondary">Average Revenue Per Daily Active User.</p>
                        </div>
                        <span className="text-lg font-medium text-text-primary">$0.14</span>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#5d3225" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#5d3225" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717A' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717A' }} prefix="$" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #E4E4E7', boxShadow: 'none' }}
                                    itemStyle={{ color: '#5d3225', fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#5d3225" fill="url(#colorRev)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-text-primary mb-4">Payer Conversion</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-text-secondary">Game Pass Conversion</span>
                                <span className="text-text-primary font-medium">2.4%</span>
                            </div>
                            <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden">
                                <div className="h-full bg-primary-600 w-[24%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-text-secondary">Dev Product Repeats</span>
                                <span className="text-text-primary font-medium">18%</span>
                            </div>
                            <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden">
                                <div className="h-full bg-primary-400 w-[18%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
