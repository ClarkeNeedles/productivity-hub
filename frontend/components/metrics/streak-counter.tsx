import { Flame } from "lucide-react";

export function StreakCounterMetric() {
  const days = 5;
  const isStreakActive = days > 0;

  return (
    <div className="pointer-events-none flex flex-col items-center justify-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <Flame
          size={56}
          strokeWidth={1.5}
          className={`transition-colors duration-300 ${
            isStreakActive 
              ? "fill-orange-500 text-orange-600 dark:fill-orange-600 dark:text-orange-500 animate-pulse" 
              : "text-slate-300 dark:text-slate-700"
          }`}
          aria-hidden="true"
        />
        
        <span 
          className={`absolute bottom-2.5 text-center text-base font-bold tracking-tight select-none ${
            isStreakActive 
              ? "text-white" 
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {days}
        </span>
      </div>

      <span className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
        Day Streak
      </span>
    </div>
  );
}
