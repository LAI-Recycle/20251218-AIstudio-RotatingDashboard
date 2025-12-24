
export interface SubMetric {
  label: string;
  value: string;
  unit: string;
  icon: string;
  color: string;
}

export interface MetricCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  subMetrics: SubMetric[];
}

export interface DashboardState {
  activeId: string;
  rotation: number;
}
