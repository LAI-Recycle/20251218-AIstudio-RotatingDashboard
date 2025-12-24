
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
  const activeColor = activeCategory.color;

  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20 transition-colors duration-1000 blur-3xl"
        style={{ background: `radial-gradient(circle, ${activeColor} 0%, transparent 70%)` }}
      />

      {/* Outer Tech Ring - Static but glows with active color */}
      <div
        className="absolute inset-0 rounded-full border border-slate-800 transition-all duration-700"
        style={{
          boxShadow: `0 0 40px -10px ${activeColor}33`,
          borderColor: `${activeColor}22`
        }}
      />

      {/* Rotating Outer Dashed/Orbit Ring */}
      <div
        className="absolute inset-[-20px] rounded-full border border-dashed border-slate-700/50 transition-all duration-1000"
        style={{ transform: `rotate(-${rotation * 0.5}deg)` }}
      />

      {/* Orbiting Beacon - Satellite Sphere */}
      <div
        className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full z-30 transition-[background-color,border-color,color,box-shadow] duration-500 will-change-transform flex items-center justify-center border-[3px] backdrop-blur-sm"
        style={{
          backgroundColor: activeColor,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: `0 0 30px ${activeColor}, inset 0 0 10px rgba(255,255,255,0.4)`,
          color: '#ffffff',
          transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-190px)`
        }}
      >
        <div className="absolute inset-0 animate-pulse opacity-40 rounded-full bg-white" />
        {/* Counter-rotate the icon so it stays upright relative to the screen */}
        <LucideIcons.Zap
          className="relative z-10 w-8 h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          style={{ transform: `rotate(-${rotation}deg)` }}
        />
      </div>

      {/* The Main Gear Assembly */}
      <div
        className="absolute w-full h-full will-change-transform"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Mechanical Teeth */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-8 h-12 sm:w-10 sm:h-16 -translate-x-1/2 transition-colors duration-500"
            style={{
              backgroundColor: i % 2 === 0 ? '#1e293b' : '#0f172a', // Slate-800 / Slate-900
              border: `1px solid ${activeColor}11`,
              transform: `rotate(${i * 30}deg) translateY(-145px) sm:translateY(-175px)`,
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
              boxShadow: `inset 0 10px 20px -10px ${activeColor}22`
            }}
          />
        ))}

        {/* Main Disc Body */}
        <div
          className="absolute inset-5 sm:inset-8 rounded-full border-4 bg-slate-950 transition-colors duration-500"
          style={{
            borderColor: '#1e293b',
            boxShadow: `inset 0 0 60px ${activeColor}11`
          }}
        >
          {/* Decorative Inner Lines */}
          <div className="absolute inset-2 rounded-full border border-slate-800 opacity-50" />
          <div className="absolute inset-8 rounded-full border border-dashed border-slate-800 opacity-30" />

          {/* Category Icons */}
          {categories.map((cat, i) => {
            const angle = (i * 360) / categories.length;
            const isActive = i === activeIndex;
            const Icon = (LucideIcons as any)[cat.icon] || LucideIcons.Activity;

            return (
              <div
                key={cat.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateY(-85px) sm:translateY(-120px) rotate(-${angle + rotation}deg)`,
                }}
              >
                <div
                  className={`relative flex items-center justify-center rounded-full transition-all duration-500 ${isActive ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-14 sm:h-14 opacity-40 grayscale'
                    }`}
                >
                  {/* Active Halo Effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full animate-pulse opacity-50" style={{ backgroundColor: `${cat.color}33`, filter: 'blur(10px)' }} />
                  )}

                  <div
                    className="relative z-10 w-full h-full rounded-full flex items-center justify-center border-2 bg-slate-900/90 backdrop-blur-sm"
                    style={{
                      borderColor: isActive ? cat.color : '#334155',
                      boxShadow: isActive ? `0 0 30px ${cat.color}66` : 'none',
                      color: isActive ? cat.color : '#64748b'
                    }}
                  >
                    <Icon size={isActive ? 32 : 20} className="transition-all duration-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Central Static Core (The "Brain") */}
      <div className="relative z-20 w-44 h-44 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center">

        {/* Glassy Background with Tint */}
        <div
          className="absolute inset-0 rounded-full bg-slate-950/80 backdrop-blur-xl border-2 transition-colors duration-700"
          style={{ borderColor: `${activeColor}44`, boxShadow: `inset 0 0 40px ${activeColor}22` }}
        />

        {/* Spinning Reactivity Rings */}
        <div
          className="absolute inset-3 rounded-full border-t-2 border-b-2 border-transparent animate-[spin_10s_linear_infinite]"
          style={{ borderTopColor: activeColor, borderBottomColor: `${activeColor}44` }}
        />
        <div
          className="absolute inset-6 rounded-full border-l-2 border-r-2 border-transparent animate-[spin_15s_linear_infinite_reverse] opacity-60"
          style={{ borderLeftColor: activeColor, borderRightColor: activeColor }}
        />

        {/* Center UI Content */}
        <div className="relative z-30 flex flex-col items-center text-center p-4">
          <div
            className="text-[10px] font-orbitron tracking-[0.3em] uppercase opacity-80 mb-2 transition-colors duration-500"
            style={{ color: activeColor }}
          >
            SYSTEM LOCK
          </div>

          <h2 className="text-white font-orbitron text-xl sm:text-2xl font-black mb-2 uppercase tracking-widest drop-shadow-lg">
            {activeCategory.label}
          </h2>

          <div
            className="px-3 py-1 rounded-full border bg-slate-900/50 flex items-center gap-2 transition-colors duration-500"
            style={{ borderColor: `${activeColor}44` }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeColor, boxShadow: `0 0 8px ${activeColor}` }} />
            <span className="text-[10px] sm:text-xs font-mono text-slate-300 tracking-wider">
              Online
            </span>
          </div>
        </div>

        {/* Top Pointer Triangle */}
        <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <div
            className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] animate-bounce"
            style={{ borderTopColor: activeColor, filter: `drop-shadow(0 0 8px ${activeColor})` }}
          />
          <div className="h-4 w-[1px]" style={{ background: `linear-gradient(to bottom, ${activeColor}, transparent)` }} />
        </div>
      </div>

    </div >
  );
};

export default RotatingGear;

