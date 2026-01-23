import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface FeatureCarouselProps {
    className?: string;
}

const COLORS = ['#5d3225', '#e0c1b3', '#a1a1aa'];

// Custom minimal tooltip component
const InfoTooltip = ({ content }: { content: string }) => (
    <div className="group relative inline-block ml-2 align-middle">
        <span className="cursor-help text-text-muted opacity-50 hover:opacity-100 transition-opacity text-xs">ⓘ</span>
        <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-surface border border-border text-xs text-text-secondary rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all z-50 text-center font-normal pointer-events-none">
            {content}
        </div>
    </div>
);

export const FeatureCarousel: React.FC<FeatureCarouselProps> = ({ className }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % 3);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    // --- Slide 1: Revenue Mix ---
    const revenueData = [
        { name: 'Game Passes', value: 1200000 },
        { name: 'Dev Products', value: 950000 },
        { name: 'Premium', value: 750000 },
    ];

    const RevenueSlide = () => (
        <div className="h-full flex items-center justify-between px-8 w-full">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-widest font-medium text-text-secondary">Revenue Insight</span>
                    <InfoTooltip content="Breakdown of your Robux revenue sources for the current week." />
                </div>
                <h3 className="text-2xl font-medium text-text-primary font-heading">
                    Game Passes lead with <span className="text-primary-600">41%</span> mix.
                </h3>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex gap-4">
                    {revenueData.map((item, i) => (
                        <div key={item.name} className="flex flex-col items-center">
                            <span className="text-xs text-text-secondary mb-1">{item.name}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-lg font-medium text-text-primary">${(item.value / 1000).toFixed(0)}k</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-16 w-16 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={revenueData}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={30}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {revenueData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-800 font-medium underline decoration-dashed transition-colors">Details</button>
            </div>
        </div>
    );

    // --- Slide 2: Biggest Opportunity ---
    const OpportunitySlide = () => (
        <div className="h-full flex items-center justify-between px-8 w-full">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-widest font-medium text-yellow-600">Biggest Opportunity</span>
                    <InfoTooltip content="Based on peer benchmarks for Obby completion rates in your genre." />
                </div>
                <h3 className="text-2xl font-medium text-text-primary font-heading">
                    Optimize "Pet Zone" FTUE flow.
                </h3>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex gap-6 text-sm">
                    <div>
                        <span className="block text-text-muted text-[10px] mb-1 uppercase tracking-wider">Impact</span>
                        <span className="text-text-primary font-medium">High</span>
                    </div>
                    <div>
                        <span className="block text-text-muted text-[10px] mb-1 uppercase tracking-wider">Confidence</span>
                        <span className="text-text-primary font-medium">85%</span>
                    </div>
                    <div>
                        <span className="block text-text-muted text-[10px] mb-1 uppercase tracking-wider">Effort</span>
                        <span className="text-text-primary font-medium">Low</span>
                    </div>
                </div>
                <button className="bg-primary-50 hover:bg-primary-100 text-primary-900 border border-primary-200 text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
                    Create Experiment
                </button>
            </div>
        </div>
    );

    // --- Slide 3: Risk Detected ---
    const RiskSlide = () => (
        <div className="h-full flex items-center justify-between px-8 w-full">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-widest font-medium text-red-600">Risk Detected</span>
                    <InfoTooltip content="Unusually high drop-off detected in the last 6 hours." />
                </div>
                <h3 className="text-2xl font-medium text-text-primary font-heading">
                    High abandonment in store checkout.
                </h3>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex gap-6 text-sm">
                    <div>
                        <span className="block text-text-muted text-[10px] mb-1 uppercase tracking-wider">Impact</span>
                        <span className="text-text-primary font-medium">Medium</span>
                    </div>
                    <div>
                        <span className="block text-text-muted text-[10px] mb-1 uppercase tracking-wider">Risk</span>
                        <span className="text-text-primary font-medium">Medium</span>
                    </div>
                </div>
                <button className="bg-white hover:bg-red-50 text-red-700 border border-red-200 text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
                    Mitigate Risk
                </button>
            </div>
        </div>
    );

    const slides = [<RevenueSlide />, <OpportunitySlide />, <RiskSlide />];

    return (
        <div className={`relative bg-surface border border-border rounded-2xl overflow-hidden shadow-sm h-32 ${className}`}>
            {/* Simple Line Progress Bar */}
            <div className="absolute top-0 left-0 right-0 flex h-1">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="flex-1 bg-surface-elevated relative overflow-hidden">
                        {i === index && (
                            <motion.div
                                className="absolute inset-0 bg-primary-400"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3.5, ease: "linear" }}
                            />
                        )}
                        {i < index && <div className="absolute inset-0 bg-primary-400" />}
                    </div>
                ))}
            </div>

            <div className="h-full relative">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="h-full w-full"
                    >
                        {slides[index]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
