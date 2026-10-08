import { CircleStar } from "lucide-react";

export function BestStreakMetric() {
  const days = 5;

  return (
    <div className="pointer-events-none flex flex-col items-center justify-center gap-2">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <CircleStar
          size={68}
          strokeWidth={1.75}
          className="fill-amber-400 text-amber-600 drop-shadow-sm dark:fill-amber-500 dark:text-amber-300"
          aria-hidden="true"
        />

        <span className="centers absolute text-2xl font-black tracking-tight text-white select-none [-webkit-text-stroke:0.5px_black]">
          {days}
        </span>
      </div>

      <span className="text-[0.68rem] font-bold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
        Best streak
      </span>
    </div>
  );
}
