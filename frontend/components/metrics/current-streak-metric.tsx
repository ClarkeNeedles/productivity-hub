"use client";

import Image from "next/image";
import { useStreakCounterStore } from "@/providers/modules-store-provider";

export function CurrentStreakMetric() {
  const currentStreak = useStreakCounterStore((state) => state.currentStreak);
  const isStreakActive = currentStreak > 0;

  return (
    <div className="pointer-events-none flex flex-col items-center justify-center gap-2">
      <span className="text-[0.68rem] font-bold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
        Current Streak
      </span>

      <div className="relative flex h-20 w-20 items-center justify-center">
        {isStreakActive ? (
          <Image
            src="/animations/fire.webp"
            alt="Current streak counter animation"
            width={64}
            height={64}
            unoptimized
          />
        ) : (
          <Image src="/images/fire-static.webp" alt="Inactive Streak" width={64} height={64} />
        )}

        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-2xl font-black tracking-tight text-white select-none [-webkit-text-stroke:0.5px_black]">
          {currentStreak}
        </span>
      </div>
    </div>
  );
}
