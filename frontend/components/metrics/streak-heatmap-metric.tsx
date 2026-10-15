"use client";

import { useMemo } from 'react'

interface StreakHeatmapProps {
  resetHistory: string[]
}

export function StreakHeatmapMetric({ resetHistory }: StreakHeatmapProps) {
  const weeksToShow = 53
  const daysToShow = weeksToShow * 7

  // Group timestamps by clean calendar date string safely via memoization
  const activityMap = useMemo(() => {
    const counts: Record<string, number> = {}

    resetHistory.forEach((timestamp) => {
      if (!timestamp) return

      const dateKey = new Date(timestamp).toISOString().split('T')[0]
      counts[dateKey] = (counts[dateKey] || 0) + 1
    })

    return counts
  }, [resetHistory])

  // Generate an index map array
  const calendarGrid = useMemo(() => {
    const grid: { date: Date; dateStr: string; count: number; dayOfWeek: number }[] = []
    const today = new Date()

    for (let i = daysToShow - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(today.getDate() - i)
      
      const dateStr = d.toISOString().split('T')[0]
      grid.push({
        date: d,
        dateStr,
        count: activityMap[dateStr] || 0,
        dayOfWeek: d.getDay(), 
      })
    }
    return grid
  }, [activityMap, daysToShow])

  // Slice the flat array list into 7 distinct day rows to draw vertical grid columns
  const rows = useMemo(() => {
    const horizontalRows: typeof calendarGrid[] = Array.from({ length: 7 }, () => [])

    calendarGrid.forEach((day) => {
      // Slot days into their correct absolute horizontal row container indices
      horizontalRows[day.dayOfWeek].push(day)
    })

    return horizontalRows
  }, [calendarGrid])

  const monthLabels = useMemo(() => {
    const labels: { name: string; colSpan: number }[] = []
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    // Look directly at the top row (Sunday index) to step column by column
    const topRowWeeks = rows[0]
    if (!topRowWeeks || topRowWeeks.length === 0) return []

    let currentMonth = topRowWeeks[0].date.getMonth()
    let currentSpan = 0

    topRowWeeks.forEach((weekColumn, index) => {
      const colMonth = weekColumn.date.getMonth()

      if (colMonth !== currentMonth) {
        // When the month increments, save the previous span tally
        labels.push({ name: monthNames[currentMonth], colSpan: currentSpan })
        currentMonth = colMonth
        currentSpan = 1
      } else {
        currentSpan++
      }

      // Handle the final trailing column closure guard
      if (index === topRowWeeks.length - 1) {
        labels.push({ name: monthNames[currentMonth], colSpan: currentSpan })
      }
    })

    return labels
  }, [rows])

  // Helper map utility to determine the shading value depending on operational reset volatility
  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800/60' // Zero resets
    // Custom Tailwind arbitrary value mappings matching GitHub's exact palette
    if (count === 1) return 'bg-[#196c2e] text-white'
    if (count === 2) return 'bg-[#2ea043] text-white'
    return 'bg-[#56d364] text-black'
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        <div className="flex flex-col font-mono text-[10px] text-slate-400 dark:text-slate-500 min-w-[940px] px-2 py-2 select-none">
          <div className="flex gap-2 pl-7 mb-1.5 font-sans font-medium text-slate-400 dark:text-slate-500 h-4">
            {monthLabels.map((month, idx) => (
              <div 
                key={idx} 
                // Grid spacing calculation matching 14px blocks + 3px gap exactly
                style={{ width: `calc(${month.colSpan} * 16px - 3px)` }} 
                className="truncate text-left pr-1"
              >
                {month.colSpan >= 2 && month.name}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-[17px] pr-1 font-sans font-medium text-slate-400 text-right w-6 leading-none pt-[19px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="flex flex-col gap-[3px] h-[116px]">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-[3px]">
                  {row.map((day) => (
                    <div
                      key={day.dateStr}
                      title={`${day.dateStr}: ${day.count} reset event${day.count !== 1 ? 's' : ''}`}
                      className={`h-[14px] w-[14px] rounded-[2px] transition-all duration-200 hover:scale-125 hover:ring-2 hover:ring-indigo-500/40 cursor-crosshair ${getColorClass(day.count)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 w-full text-[10px] font-medium text-slate-400 px-6">
        <span>Less Resets</span>
        <div className="h-2.5 w-2.5 rounded-[1px] bg-slate-100 dark:bg-slate-800/60" />
        <div className="h-2.5 w-2.5 rounded-[1px] bg-[#196c2e]" />
        <div className="h-2.5 w-2.5 rounded-[1px] bg-[#2ea043]" />
        <div className="h-2.5 w-2.5 rounded-[1px] bg-[#56d364]" />
        <span>More Resets</span>
      </div>
    </div>
  )
}
