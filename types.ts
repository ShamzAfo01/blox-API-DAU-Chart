
export enum View {
  DASHBOARD = 'dashboard',
  HEATMAP = 'heatmap',
  OPTIMIZE = 'optimize',
  CHAT = 'chat'
}

export interface MetricData {
  timestamp: string;
  dau: number;
  revenue: number;
  retention: number;
}

export interface OptimizationSuggestion {
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  category: 'Monetization' | 'Engagement' | 'Difficulty';
  description: string;
  actionable: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
