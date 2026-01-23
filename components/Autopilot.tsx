import React from 'react';

export const Autopilot: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in font-sans">
            <div className="flex justify-between items-center py-2">
                <h1 className="text-2xl font-medium text-text-primary font-heading">Autopilot Config</h1>
                <div className="flex gap-2">
                    <span className="text-xs text-text-muted flex items-center">Last synced: 2m ago</span>
                    <div className="h-2 w-2 rounded-full bg-green-500 my-auto"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-text-primary mb-6">Dynamic Difficulty</h3>

                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-text-primary">Global Difficulty Scaling</label>
                                <span className="text-sm text-primary-600 font-medium">1.2x</span>
                            </div>
                            <input type="range" className="w-full accent-primary-600 h-1 bg-surface-elevated rounded-lg appearance-none cursor-pointer" />
                            <p className="text-xs text-text-muted mt-1">Multiplies enemy HP and damage output.</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-sm font-medium text-text-primary">New Player Shield</label>
                                <p className="text-xs text-text-muted">Prevent damage for first 5 mins.</p>
                            </div>
                            <div className="w-11 h-6 bg-primary-600 rounded-full cursor-pointer relative">
                                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl p-6 shadow-sm opacity-60 pointer-events-none relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] z-10">
                        <div className="bg-surface border border-border px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-text-secondary">
                            Monetization AI requires Pro Tier
                        </div>
                    </div>
                    <h3 className="text-lg font-medium text-text-primary mb-6">Monetization AI</h3>
                    {/* Visual Placeholder for disabled content */}
                    <div className="space-y-6 blur-[2px]">
                        <div className="h-4 bg-surface-elevated rounded w-3/4"></div>
                        <div className="h-10 bg-surface-elevated rounded w-full"></div>
                        <div className="h-4 bg-surface-elevated rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
