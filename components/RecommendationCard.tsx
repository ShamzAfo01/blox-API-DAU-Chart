import React from 'react';
import { Recommendation } from '../types';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, Activity } from 'lucide-react';

interface RecommendationCardProps {
    recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
    const isOpportunity = recommendation.type === 'opportunity';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-xl border p-6 flex flex-col justify-between h-full shadow-soft hover:shadow-hover transition-all duration-300 ${isOpportunity
                    ? 'bg-gradient-to-br from-white to-primary-50 border-primary-100'
                    : 'bg-white border-danger/20'
                }`}
        >
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    {isOpportunity ? (
                        <div className="bg-yellow-100 text-yellow-600 p-1.5 rounded-lg">
                            <Zap size={16} fill="currentColor" />
                        </div>
                    ) : (
                        <div className="bg-danger/10 text-danger p-1.5 rounded-lg">
                            <AlertTriangle size={16} />
                        </div>
                    )}
                    <span className={`text-xs font-bold tracking-widest uppercase ${isOpportunity ? 'text-yellow-700' : 'text-danger'
                        }`}>
                        {isOpportunity ? 'Biggest Opportunity' : 'Risk Detected'}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">
                    {recommendation.title}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    Impact: <span className="text-text-primary font-medium">{recommendation.impact}</span> •
                    Confidence: <span className="text-text-primary font-medium">{recommendation.confidence}%</span>
                </p>
            </div>

            {/* Stats/Badges Row */}
            <div className="flex flex-wrap gap-2 mb-6">
                <div className="px-2.5 py-1 rounded bg-surface-elevated border border-border text-xs text-text-secondary">
                    Effort: <span className="text-text-primary font-medium">{recommendation.effort}</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-surface-elevated border border-border text-xs text-text-secondary">
                    Risk: <span className="text-text-primary font-medium">{recommendation.risk}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-auto">
                <button className="flex-1 bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md active:scale-95">
                    <Activity size={14} />
                    {isOpportunity ? 'Create Experiment' : 'Mitigate Risk'}
                </button>
                <button className="px-4 py-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border text-text-secondary hover:text-text-primary text-sm font-medium transition-colors">
                    Details
                </button>
            </div>
        </motion.div>
    );
};
