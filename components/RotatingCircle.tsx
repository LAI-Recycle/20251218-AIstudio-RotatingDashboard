
import React from 'react';
import { MetricCategory } from '../types';
import * as LucideIcons from 'lucide-react';

interface RotatingGearProps {
  categories: MetricCategory[];
  rotation: number;
  activeIndex: number;
}

const RotatingGear: React.FC<RotatingGearProps> = ({ categories, rotation, activeIndex }) => {
  const activeCategory = categories[activeIndex];

  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/10 shadow-[0_0_80px_rgba(34,211,238,0.05)]" />
      
      {/* The Gear Body */}
      <div 
        className="absolute w-full h-full will-change-transform"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Gear Teeth */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 w-8 h-10 sm:w-10 sm:h-14 bg-slate-800 border-x border-t border-slate-700 -translate-x-1/2"
            style={{ 
              transform: `rotate(${i * 30}deg) translateY(-145px) sm:translateY(-185px)`,
              clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
            }}
          />
        ))}

        {/* Main Gear Disc */}
        <div className="absolute inset-4 sm:inset-6 rounded-full border-4 sm:border-8 border-slate-800 bg-slate-900 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-slate-700 opacity-20" />
          
          {/* Node Icons on the Disc */}
          {categories.map((cat, i) => {
            const angle = (i * 360) / categories.length;
            const isActive = i === activeIndex;
            const Icon = (LucideIcons as any)[cat.icon] || LucideIcons.Activity;

            return (
              <div
                key={cat.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
                style={{
                  transform: `rotate(${angle}deg) translateY(-80px) sm:translateY(-115px) rotate(-${angle + rotation}deg)`,
                }}
              >
                <div 
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive 
                      ? 'scale-110 bg-slate-900 border-2 shadow-[0_0_30px_currentColor]' 
                      : 'bg-slate-950 border border-slate-800 opacity-20 scale-90'
                  }`}
                  style={{ color: isActive ? cat.color : '#475569', borderColor: isActive ? cat.color : '#334155' }}
                >
                  <Icon size={24} className="sm:size-28" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Static Inner Hub */}
      <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-slate-950 border-2 sm:border-4 border-slate-800 flex flex-col items-center justify-center backdrop-blur-2xl shadow-2xl z-20">
        <div className="absolute inset-2 rounded-full border border-cyan-500/10 animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-violet-500/5 animate-[spin_15s_linear_infinite_reverse]" />
        
        <div className="z-30 text-center px-4">
          <div className="text-cyan-500 font-orbitron text-[8px] sm:text-[9px] tracking-[0.4em] mb-1 uppercase opacity-60">
            Node Signal
          </div>
          <h2 className="text-white font-orbitron text-sm sm:text-lg font-black mb-1 truncate max-w-[120px] sm:max-w-[150px] uppercase tracking-wider leading-tight">
            {activeCategory.label}
          </h2>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_cyan]" />
            <span className="text-slate-500 text-[8px] sm:text-[9px] font-mono tracking-widest">LOCKED</span>
          </div>
        </div>

        {/* Pointer Indicator */}
        <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-30">
            <LucideIcons.ChevronDown className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-bounce w-8 h-8 sm:w-10 sm:h-10" />
        </div>
      </div>
    </div>
  );
};

export default RotatingGear;
