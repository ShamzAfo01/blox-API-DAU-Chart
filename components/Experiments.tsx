import React from 'react';

export const Experiments: React.FC = () => {
    const experiments = [
        { id: 'EXP-104', name: 'Pet Zone FTUE Flow', status: 'Running', impact: '+4.2% D1', end: '2 days' },
        { id: 'EXP-103', name: 'Store UI Variant B', status: 'Concluded', impact: '+1.1% Rev', end: 'Ended' },
        { id: 'EXP-102', name: 'Ambient Sound A/B', status: 'Analysis', impact: 'Neutral', end: 'Ended' },
    ];

    return (
        <div className="space-y-6 animate-fade-in font-sans">
            <div className="flex justify-between items-center py-2">
                <h1 className="text-2xl font-medium text-text-primary font-heading">Experiments</h1>
                <button className="bg-primary hover:bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
                    New Experiment
                </button>
            </div>

            <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-text-secondary">
                    <thead className="bg-surface-elevated text-text-muted uppercase text-xs tracking-wider font-medium">
                        <tr>
                            <th className="px-6 py-3 font-medium">ID</th>
                            <th className="px-6 py-3 font-medium">Experiment Name</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Projected Impact</th>
                            <th className="px-6 py-3 font-medium">Duration</th>
                            <th className="px-6 py-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {experiments.map((exp) => (
                            <tr key={exp.id} className="hover:bg-surface-elevated/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">{exp.id}</td>
                                <td className="px-6 py-4 font-medium text-text-primary">{exp.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${exp.status === 'Running' ? 'bg-green-50 text-green-700 border-green-200' :
                                            exp.status === 'Concluded' ? 'bg-gray-50 text-gray-600 border-gray-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'
                                        }`}>
                                        {exp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-primary-700 font-medium">{exp.impact}</td>
                                <td className="px-6 py-4">{exp.end}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-text-muted hover:text-text-primary transition-colors">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
