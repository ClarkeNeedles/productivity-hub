"use client";

import { useMemo } from "react";

interface StreakHeatmapProps {
  resetHistory: string[];
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function StreakHeatmapMetric({ resetHistory }: StreakHeatmapProps) {
  const weeksToShow = 53;

  // Group timestamps by clean calendar date string safely via memoization
  const activityMap = useMemo(() => {
    const counts: Record<string, number> = {};

    resetHistory.forEach((timestamp) => {
      if (!timestamp) return;

      const dateKey = formatDateKey(new Date(timestamp));
      counts[dateKey] = (counts[dateKey] || 0) + 1;
    });

    return counts;
  }, [resetHistory]);

  // Build complete Sunday-to-Saturday columns so each column is one real calendar week.
  const weeks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());

    const firstWeekStart = new Date(currentWeekStart);
    firstWeekStart.setDate(currentWeekStart.getDate() - (weeksToShow - 1) * 7);

    return Array.from({ length: weeksToShow }, (_, weekIndex) =>
      Array.from({ length: 7 }, (_, dayIndex) => {
        const date = new Date(firstWeekStart);
        date.setDate(firstWeekStart.getDate() + weekIndex * 7 + dayIndex);

        const dateStr = formatDateKey(date);
        return {
          date,
          dateStr,
          count: activityMap[dateStr] || 0,
        };
      })
    );
  }, [activityMap, weeksToShow]);

  const monthLabels = useMemo(() => {
    const labels: { name: string; colSpan: number }[] = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (weeks.length === 0) return [];

    let currentMonth = weeks[0][0].date.getMonth();
    let currentSpan = 0;

    weeks.forEach((week, index) => {
      const colMonth = week[0].date.getMonth();

      if (colMonth !== currentMonth) {
        // When the month increments, save the previous span tally
        labels.push({ name: monthNames[currentMonth], colSpan: currentSpan });
        currentMonth = colMonth;
        currentSpan = 1;
      } else {
        currentSpan++;
      }

      // Handle the final trailing column closure guard
      if (index === weeks.length - 1) {
        labels.push({ name: monthNames[currentMonth], colSpan: currentSpan });
      }
    });

    return labels;
  }, [weeks]);

  // Helper map utility to determine the shading value depending on operational reset volatility
  const getColorClass = (count: number) => {
    if (count === 0) return "bg-slate-100 dark:bg-slate-800/60"; // Zero resets
    // Custom Tailwind arbitrary value mappings matching GitHub's exact palette
    if (count === 1) return "bg-[#196c2e] text-white";
    if (count === 2) return "bg-[#2ea043] text-white";
    return "bg-[#56d364] text-black";
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="w-full scrollbar-thin scrollbar-thumb-slate-200 overflow-x-auto pb-2 dark:scrollbar-thumb-slate-800">
        <div className="flex min-w-[940px] flex-col px-2 py-2 font-mono text-[10px] text-slate-400 select-none dark:text-slate-500">
          <div className="mb-1.5 flex h-4 gap-2 pl-7 font-sans font-medium text-slate-400 dark:text-slate-500">
            {monthLabels.map((month, idx) => (
              <div
                key={idx}
                // Grid spacing calculation matching 14px blocks + 3px gap exactly
                style={{ width: `calc(${month.colSpan} * 16px - 3px)` }}
                className="truncate pr-1 text-left"
              >
                {month.colSpan >= 2 && month.name}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex w-6 flex-col gap-[24px] pt-[19px] pr-1 text-right font-sans leading-none font-medium text-slate-400">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="flex h-[116px] flex-row gap-[3px]">
              {weeks.map((week) => (
                <div key={week[0].dateStr} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.dateStr}
                      title={`${day.dateStr}: ${day.count} reset event${day.count !== 1 ? "s" : ""}`}
                      className={`h-[14px] w-[14px] cursor-crosshair rounded-[2px] transition-all duration-200 hover:scale-125 hover:ring-2 hover:ring-indigo-500/40 ${getColorClass(day.count)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex w-full items-center justify-end gap-1.5 px-6 text-[10px] font-medium text-slate-400">
        <span>Less Resets</span>
        <div className="h-2.5 w-2.5 rounded-[1px] bg-slate-100 dark:bg-slate-800/60" />
        <div className="h-2.5 w-2.5 rounded-[1px] bg-[#196c2e]" />
        <div className="h-2.5 w-2.5 rounded-[1px] bg-[#2ea043]" />
        <div className="h-2.5 w-2.5 rounded-[1px] bg-[#56d364]" />
        <span>More Resets</span>
      </div>
    </div>
  );
}
