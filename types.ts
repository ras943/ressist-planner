export interface StrategyStep {
  title: string;
  description: string;
  rationale: string;
}

export interface Strategy {
  title: string;
  overview: string;
  targetAudienceAnalysis: string;
  steps: StrategyStep[];
}