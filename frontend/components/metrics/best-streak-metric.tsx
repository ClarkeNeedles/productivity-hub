"use client";

import Image from "next/image";
import { useStreakCounterStore } from "@/providers/modules-store-provider";

export function BestStreakMetric() {
  const bestStreak = useStreakCounterStore((state) => state.bestStreak);

  return (
    <div className="pointer-events-none flex flex-col items-center justify-center gap-2">
      <span className="text-[0.68rem] font-bold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
        Best streak
      </span>

      <div className="relative flex h-20 w-20 items-center justify-center">
        <Image
          src="/animations/trophy.webp"
          alt="Best streak counter animation"
          width={64}
          height={64}
          unoptimized
        />

        <span className="absolute top-3 text-2xl font-black tracking-tight text-white select-none [-webkit-text-stroke:0.5px_black]">
          {bestStreak}
        </span>
      </div>
    </div>
  );
}
