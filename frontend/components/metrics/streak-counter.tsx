import { Flame } from "lucide-react";

export function StreakCounterMetric() {
  const days = 5;
  const isStreakActive = days > 0;

  return (
    <div className="pointer-events-none flex flex-col items-center justify-center gap-2">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <Flame
          size={68}
          strokeWidth={1.5}
          className={`transition-colors duration-300 ${
            isStreakActive
              ? "animate-pulse fill-orange-500 text-orange-600 dark:fill-orange-600 dark:text-orange-500"
              : "text-slate-300 dark:text-slate-700"
          }`}
          aria-hidden="true"
        />

        <span className="absolute text-2xl font-black tracking-tight text-white select-none [-webkit-text-stroke:0.5px_black]">
          {days}
        </span>
      </div>

      <span className="text-[0.68rem] font-bold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
        Day streak
      </span>
    </div>
  );
}
