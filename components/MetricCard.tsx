
import React from 'react';
import { SubMetric } from '../types';
import * as LucideIcons from 'lucide-react';

interface MetricCardProps {
  data: SubMetric;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ data, index }) => {
  const Icon = (LucideIcons as any)[data.icon] || LucideIcons.Activity;

  return (
    <div 
      className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl group hover:bg-slate-900/60 transition-all duration-500 overflow-hidden"
    >
      {/* Synchronization Glow */}
      <div 
        className="absolute top-0 left-0 w-1.5 h-full opacity-40 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: data.color, boxShadow: `0 0 15px ${data.color}` }}
      />
      
      <div className="flex items-start justify-between mb-4">
        <div 
          className="p-2.5 rounded-xl bg-slate-800/80 transition-transform group-hover:scale-110"
          style={{ color: data.color }}
        >
          <Icon size={22} />
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-slate-600 tracking-widest uppercase">
              Ch-0{index + 1}
            </span>
            <div className="flex gap-0.5 mt-1">
                <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
                <div className="w-1 h-1 rounded-full bg-cyan-500/20" />
            </div>
        </div>
      </div>

      <p className="text-slate-500 text-[10px] font-orbitron uppercase tracking-[0.2em] mb-1 group-hover:text-slate-300 transition-colors">
        {data.label}
      </p>
      
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-orbitron font-black text-white group-hover:text-cyan-50 transition-colors">
          {data.value}
        </span>
        <span className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
          {data.unit}
        </span>
      </div>

      <div className="mt-5 flex gap-1.5">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="h-1 flex-1 rounded-full bg-slate-800/50 transition-all duration-700"
            style={{ 
                backgroundColor: i < 7 ? `${data.color}55` : undefined,
                boxShadow: i < 7 ? `0 0 10px ${data.color}33` : 'none',
                transform: `scaleY(${1 + (Math.sin(Date.now() / 1000 + i) * 0.2)})`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricCard;
