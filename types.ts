
export enum View {
  SCORECARD = 'scorecard',
  LOOPS = 'loops',
  MONETIZE = 'monetize',
  EXPERIMENTS = 'experiments',
  AUTOPILOT = 'autopilot'
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaType: 'positive' | 'negative' | 'neutral';
  status: 'healthy' | 'watch' | 'risk';
  history: number[]; // for sparkline
}

export interface Recommendation {
  id: string;
  title: string;
  impact: string;
  confidence: number;
  effort: string;
  risk: string;
  type: 'opportunity' | 'risk';
}

export interface MetricData {
  timestamp: string;
  value: number;
}
