
import React, { useState, useEffect, useRef } from 'react';
import RotatingGear from './components/RotatingCircle';
import MetricCard from './components/MetricCard';
import { DASHBOARD_CATEGORIES, ROTATION_SPEED, DWELL_DURATION } from './constants';
import { geminiService } from './services/geminiService';
import * as LucideIcons from 'lucide-react';

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [insight, setInsight] = useState("System initialization complete. Monitoring data streams...");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const lastActiveIndex = useRef(activeIndex);
  const lastPausedIndex = useRef<number | null>(null);
  const pauseTimerRef = useRef<number | null>(null);
  const insightDebounceRef = useRef<number | null>(null);

  // Smooth rotation animation
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!isPaused) {
        setRotation(prev => (prev + ROTATION_SPEED) % 360);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Handle snapping and dwell time logic
  useEffect(() => {
    const count = DASHBOARD_CATEGORIES.length;
    const segment = 360 / count;
    
    const normalizedRotation = (360 - (rotation % 360)) % 360;
    const index = Math.round(normalizedRotation / segment) % count;

    const targetRotation = (360 - (index * segment)) % 360;
    const diff = Math.abs((rotation % 360) - targetRotation);
    
    if (diff < ROTATION_SPEED && !isPaused && index !== lastPausedIndex.current) {
      setActiveIndex(index);
      setIsPaused(true);
      lastPausedIndex.current = index;
      
      if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = window.setTimeout(() => {
        setIsPaused(false);
      }, DWELL_DURATION);
    }

    if (diff > segment / 2) {
      lastPausedIndex.current = null;
    }
  }, [rotation, isPaused]);

  // Fetch AI insight when category locks in with debouncing to save quota
  useEffect(() => {
    if (activeIndex !== lastActiveIndex.current) {
      lastActiveIndex.current = activeIndex;
      const activeCat = DASHBOARD_CATEGORIES[activeIndex];
      
      // Cancel previous fetch if user moves too fast (though DWELL prevents this mostly)
      if (insightDebounceRef.current) window.clearTimeout(insightDebounceRef.current);

      insightDebounceRef.current = window.setTimeout(() => {
        setLoadingInsight(true);
        geminiService.getSmartInsight(activeCat.label, activeCat.subMetrics[0].value, activeCat.subMetrics[0].unit)
          .then(msg => {
            setInsight(msg || "Analyzing module dependencies and routing protocols.");
            setLoadingInsight(false);
          });
      }, 500); // 500ms delay before calling API
    }
  }, [activeIndex]);

  const activeCategory = DASHBOARD_CATEGORIES[activeIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start lg:justify-center p-4 lg:p-8 bg-slate-950 text-slate-200 overflow-x-hidden overflow-y-auto font-inter">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-cyan-500/5 blur-[100px] lg:blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-violet-500/5 blur-[100px] lg:blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      </div>

      {/* Top HUD */}
      <div className="relative w-full max-w-[1400px] flex flex-col sm:flex-row justify-between items-center mb-8 lg:mb-12 z-50 gap-4">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl border border-cyan-500/30 flex items-center justify-center bg-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                <LucideIcons.Activity className="text-cyan-400 animate-pulse w-6 h-6 lg:w-8 lg:h-8" />
            </div>
            <div>
                <h1 className="font-orbitron text-lg lg:text-xl font-black tracking-[0.3em] text-white leading-none">
                    AEGIS OS
                </h1>
                <p className="text-[9px] lg:text-[10px] text-cyan-500 font-mono tracking-widest mt-1 opacity-60">
                   KERNEL V.42.1 // SECTOR-07
                </p>
            </div>
        </div>
        
        <div className="flex items-center gap-6 lg:gap-12 font-orbitron text-[9px] lg:text-[10px] tracking-widest text-slate-500">
            <div className="flex flex-col items-center sm:items-end gap-1">
                <span className="text-cyan-500/50 uppercase">Sync Status</span>
                <span className="text-white bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-900/50">ENCRYPTED</span>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1">
                <span className="text-violet-500/50 uppercase">Session Time</span>
                <span className="text-white font-mono">08:42:15:00</span>
            </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="w-full max-w-[1600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-10 items-center z-10">
        
        {/* Left Peripheral Column */}
        <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-8 order-2 lg:order-1">
          <MetricCard data={activeCategory.subMetrics[0]} index={0} />
          <MetricCard data={activeCategory.subMetrics[1]} index={1} />
        </div>

        {/* Central Core Module */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-8 lg:space-y-16 order-1 lg:order-2 py-8 lg:py-0">
          <div className="transform scale-75 sm:scale-90 lg:scale-110">
            <RotatingGear 
              categories={DASHBOARD_CATEGORIES} 
              rotation={rotation} 
              activeIndex={activeIndex} 
            />
          </div>
          
          {/* AI Reasoning Module */}
          <div className="w-full max-w-xl relative px-4 sm:px-0">
             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-cyan-500/10 blur-xl opacity-50" />
             <div className="relative bg-slate-900/80 border border-slate-800 rounded-2xl p-4 lg:p-6 backdrop-blur-3xl shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_emerald]" />
                        <span className="text-[9px] font-orbitron text-slate-300 tracking-widest">NEURAL LINK</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                        <LucideIcons.Cpu className="text-cyan-400 w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                        <p className={`text-sm lg:text-base text-slate-200 leading-relaxed font-medium transition-all duration-700 ${loadingInsight ? 'opacity-20 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'}`}>
                           "{insight}"
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                            <span className="text-[8px] lg:text-[9px] font-mono text-cyan-600 font-bold uppercase">MODEL: GEMINI-FLASH-3</span>
                            <span className="text-[9px] font-mono text-slate-700 hidden sm:inline">|</span>
                            <span className="text-[8px] lg:text-[9px] font-mono text-slate-500 italic hidden sm:inline">Real-time Analysis</span>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Peripheral Column */}
        <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-8 order-3">
          <MetricCard data={activeCategory.subMetrics[2]} index={2} />
          <MetricCard data={activeCategory.subMetrics[3]} index={3} />
        </div>
      </div>

      <div className="hidden lg:flex fixed bottom-10 left-12 gap-4 text-slate-700 z-0 opacity-10 pointer-events-none">
        <LucideIcons.Box className="w-24 h-24 lg:w-32 lg:h-32 -rotate-12" />
        <LucideIcons.Command className="w-24 h-24 lg:w-32 lg:h-32 rotate-12" />
      </div>
      <div className="hidden lg:flex fixed bottom-10 right-12 text-slate-700 z-0 opacity-10 pointer-events-none">
        <LucideIcons.CircuitBoard className="w-32 h-32 lg:w-48 lg:h-48" />
      </div>

      <div className="h-10 lg:hidden" />
    </div>
  );
};

export default App;
