import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface FeatureCarouselProps {
    className?: string; // Allow external sizing
}

const COLORS = ['#5d3225', '#e0c1b3', '#a1a1aa'];

// Custom minimal tooltip component
const InfoTooltip = ({ content }: { content: string }) => (
    <div className="group relative inline-block ml-1 align-baseline">
        <span className="cursor-help text-text-muted opacity-50 hover:opacity-100 transition-opacity">ⓘ</span>
        <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-surface border border-border text-xs text-text-secondary rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10 text-center font-normal">
            {content}
        </div>
    </div>
);

export const FeatureCarousel: React.FC<FeatureCarouselProps> = ({ className }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % 3);
        }, 3500); // 3.5s reading time (2s felt too fast for content)
        return () => clearInterval(timer);
    }, []);

    // --- Slide 1: Revenue Mix ---
    const revenueData = [
        { name: 'Game Passes', value: 1200000 },
        { name: 'Dev Products', value: 950000 },
        { name: 'Premium Payouts', value: 750000 },
    ];

    const RevenueSlide = () => (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-base font-normal text-text-primary font-heading">Total Revenue Mix</h3>
                    <p className="text-xs text-text-muted font-normal mt-1 text-balance">Breakdown of Robux sources this week.</p>
                </div>
                <button className="text-xs text-primary-500 hover:text-primary-700 font-normal underline decoration-dashed">Details</button>
            </div>

            <div className="flex-1 flex items-center gap-4">
                <div className="h-24 w-24 flex-shrink-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={revenueData}
                                cx="50%"
                                cy="50%"
                                innerRadius={28}
                                outerRadius={40}
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
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-[10px] text-text-muted">Mix</span>
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                    {revenueData.map((item, i) => (
                        <div key={item.name} className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-text-secondary font-normal">{item.name}</span>
                            </div>
                            <span className="text-text-primary font-medium">${(item.value / 1000).toFixed(0)}k</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-auto pt-2 border-t border-dashed border-border flex justify-between items-center">
                <span className="text-xs text-text-primary">Total</span>
                <span className="text-sm font-medium text-text-primary">$2.9M</span>
            </div>
        </div>
    );

    // --- Slide 2: Biggest Opportunity ---
    const OpportunitySlide = () => (
        <div className="h-full flex flex-col font-sans">
            <div className="flex items-center gap-2 mb-2 text-yellow-600">
                <span className="text-xs uppercase tracking-widest font-normal">Biggest Opportunity</span>
                <InfoTooltip content="Based on peer benchmarks for Obby completion rates." />
            </div>

            <h3 className="text-base font-normal text-text-primary font-heading mb-1 text-balance leading-tight">
                Optimize "Pet Zone" FTUE flow.
            </h3>

            <div className="flex gap-4 my-3 text-xs text-text-secondary">
                <div>
                    <span className="block text-text-muted text-[10px] mb-0.5">Impact</span>
                    <span className="text-text-primary font-medium">High</span>
                </div>
                <div>
                    <span className="block text-text-muted text-[10px] mb-0.5">Confidence</span>
                    <span className="text-text-primary font-medium">85%</span>
                </div>
                <div>
                    <span className="block text-text-muted text-[10px] mb-0.5">Effort</span>
                    <span className="text-text-primary font-medium">Low</span>
                </div>
            </div>

            <div className="mt-auto flex items-center gap-3">
                <button className="flex-1 bg-primary-50 hover:bg-primary-100 text-primary-900 text-xs font-normal py-2 rounded transition-colors text-center">
                    Create Experiment
                </button>
                <button className="text-xs text-text-muted hover:text-text-primary transition-colors">Details</button>
            </div>
        </div>
    );

    // --- Slide 3: Risk Detected ---
    const RiskSlide = () => (
        <div className="h-full flex flex-col font-sans">
            <div className="flex items-center gap-2 mb-2 text-red-600">
                <span className="text-xs uppercase tracking-widest font-normal">Risk Detected</span>
                <InfoTooltip content="Unusually high drop-off detected in the last 6 hours." />
            </div>

            <h3 className="text-base font-normal text-text-primary font-heading mb-1 text-balance leading-tight">
                High abandonment in store checkout.
            </h3>

            <div className="flex gap-4 my-3 text-xs text-text-secondary">
                <div>
                    <span className="block text-text-muted text-[10px] mb-0.5">Impact</span>
                    <span className="text-text-primary font-medium">Medium</span>
                </div>
                <div>
                    <span className="block text-text-muted text-[10px] mb-0.5">Confidence</span>
                    <span className="text-text-primary font-medium">90%</span>
                </div>
                <div>
                    <span className="block text-text-muted text-[10px] mb-0.5">Risk</span>
                    <span className="text-text-primary font-medium">Medium</span>
                </div>
            </div>

            <div className="mt-auto flex items-center gap-3">
                <button className="flex-1 border border-red-200 text-red-700 hover:bg-red-50 text-xs font-normal py-2 rounded transition-colors text-center">
                    Mitigate Risk
                </button>
                <button className="text-xs text-text-muted hover:text-text-primary transition-colors">Details</button>
            </div>
        </div>
    );

    const slides = [<RevenueSlide />, <OpportunitySlide />, <RiskSlide />];

    return (
        <div className={`relative bg-surface border border-border rounded-xl mt-8 pt-4 pb-4 px-6 overflow-hidden shadow-sm ${className}`}>
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 flex h-0.5">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="flex-1 bg-border relative overflow-hidden">
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

            <div className="h-48 relative">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="h-full"
                    >
                        {slides[index]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
