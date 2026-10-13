import Image from 'next/image';

export function StreakCounterMetric() {
  const days = 3;
  const isStreakActive = days > 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        {isStreakActive ? (
          <Image 
            src="/animations/fire.gif" 
            alt="Streak counter animation"
            width={64}
            height={64}
          />
        ) : (
          <Image 
            src="/images/fire-static.png" 
            alt="Inactive Streak"
            width={64}
            height={64}
          />
        )}
        
        <span className="centers absolute text-2xl font-black tracking-tight text-white select-none [-webkit-text-stroke:0.5px_black]">
          {days}
        </span>
      </div>
      <span className="text-[0.68rem] font-bold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
        Day Streak
      </span>
    </div>
  );
}
