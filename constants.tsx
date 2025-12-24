
import { MetricCategory } from './types';

export const DASHBOARD_CATEGORIES: MetricCategory[] = [
  {
    id: 'storage',
    label: '儲能矩陣',
    icon: 'HardDrive',
    color: '#06b6d4',
    description: 'Storage array health and allocation.',
    subMetrics: [
      { label: '已用空間', value: '42.5', unit: 'TB', icon: 'PieChart', color: '#06b6d4' },
      { label: '剩餘空間', value: '57.5', unit: 'TB', icon: 'Database', color: '#22d3ee' },
      { label: '存取速度', value: '1.2', unit: 'GB/s', icon: 'Zap', color: '#0891b2' },
      { label: '硬體健康', value: '98', unit: '%', icon: 'ShieldCheck', color: '#0ea5e9' }
    ]
  },
  {
    id: 'compute',
    label: '數據分析',
    icon: 'Cpu',
    color: '#8b5cf6',
    description: 'Processing power and neural load.',
    subMetrics: [
      { label: 'CPU 負載', value: '64', unit: '%', icon: 'Activity', color: '#8b5cf6' },
      { label: 'GPU 頻率', value: '2.4', unit: 'GHz', icon: 'BarChart3', color: '#a78bfa' },
      { label: '執行緒數', value: '256', unit: 'TH', icon: 'Network', color: '#7c3aed' },
      { label: '核心溫度', value: '42', unit: '°C', icon: 'Thermometer', color: '#6d28d9' }
    ]
  },
  {
    id: 'energy',
    label: '能源模組',
    icon: 'Zap',
    color: '#f59e0b',
    description: 'System power consumption and efficiency.',
    subMetrics: [
      { label: '即時電壓', value: '220', unit: 'V', icon: 'Zap', color: '#f59e0b' },
      { label: '當前電流', value: '5.4', unit: 'A', icon: 'Activity', color: '#fbbf24' },
      { label: '系統功耗', value: '1.2', unit: 'kW', icon: 'BatteryCharging', color: '#d97706' },
      { label: '備用電力', value: '100', unit: '%', icon: 'LifeBuoy', color: '#b45309' }
    ]
  },
  {
    id: 'network',
    label: '通訊網路',
    icon: 'Globe',
    color: '#10b981',
    description: 'Data uplink and interface latency.',
    subMetrics: [
      { label: '下行速度', value: '850', unit: 'Mbps', icon: 'ArrowDownCircle', color: '#10b981' },
      { label: '上行速度', value: '420', unit: 'Mbps', icon: 'ArrowUpCircle', color: '#34d399' },
      { label: '網路延遲', value: '12', unit: 'ms', icon: 'Timer', color: '#059669' },
      { label: '封包損耗', value: '0.01', unit: '%', icon: 'XCircle', color: '#047857' }
    ]
  }
];

export const ROTATION_SPEED = 0.25; // Adjusted for a smoother experience
export const DWELL_DURATION = 3000; // Stay for 3 seconds on each item
