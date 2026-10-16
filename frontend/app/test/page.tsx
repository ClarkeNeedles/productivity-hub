'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { STREAK_COUNTER_MODULE_ID } from '@/configs/modules-config'

export default function TestSeedPage() {
  const [status, setStatus] = useState<string>('Ready')
  const supabase = createClient()

  // Your historical streak lengths from most recent to oldest
  const historicalStreaks = [
    1, 5, 2, 0, 0, 5, 7, 0, 0, 0, 4, 0, 6, 0, 0, 0, 0, 0, 0, 7, 
    6, 2, 0, 0, 3, 0, 0, 0, 2, 0, 1, 0, 1, 1, 1, 0, 3, 0, 8, 0, 
    0, 1, 7, 0, 0, 3, 0, 4, 1, 2, 0, 0, 0, 0, 7, 1, 0, 2, 0, 0, 
    0, 0, 2, 9, 0, 2, 0, 2, 4, 2, 4, 0, 4, 0, 1, 3
  ]

  const handleGenerateTestData = async () => {
    setStatus('Calculating historical timestamps...')

    // 1. Get the current active user session dynamically
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      setStatus(`❌ Auth Error: ${authError?.message || 'No user logged in'}`)
      return
    }

    // 2. Pivot point anchor: Oct 14, 2026, 9:00 PM
    let currentTime = new Date('2026-10-14T21:00:00.000Z')
    const computedResetHistory: string[] = []

    // 3. Work backwards through the array to generate authentic calendar timestamps
    for (const streakLength of historicalStreaks) {
      computedResetHistory.push(currentTime.toISOString())
      
      // Calculate how long that streak lasted (0 days gets a 1-day fallback spacing gap)
      const daysToSubtract = streakLength > 0 ? streakLength : 1
      
      // Shift our time machine back to find the prior reset moment
      currentTime.setDate(currentTime.getDate() - daysToSubtract)
    }

    setStatus('Pushing pristine JSONB seed data to Supabase...')

    // 4. Compute your current live active streak relative to right now (Oct 15, 2026)
    const nowMs = new Date().getTime()
    const lastResetMs = new Date('2026-10-14T21:00:00.000Z').getTime()
    const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000
    const currentActiveStreak = Math.floor((nowMs - lastResetMs) / TWENTY_FOUR_HOURS_MS) + 1

    // 5. Commit the payload cleanly to your database column
    const { error: dbError } = await supabase
      .from('user_module_data')
      .upsert({
        user_id: user.id,
        module_id: STREAK_COUNTER_MODULE_ID,
        state: {
          current_streak: currentActiveStreak, // Will compute to 1 or 2 depending on current execution second
          best_streak: 9,                      // Matches your requirement
          streak_started_at: '2026-10-14T21:00:00.000Z',
          reset_history: computedResetHistory
        },
        updated_at: new Date().toISOString()
      })

    if (dbError) {
      setStatus(`❌ DB Error: ${dbError.message}`)
      console.error(dbError)
    } else {
      setStatus(`✅ Success! Generated ${computedResetHistory.length} timeline milestones.`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white p-6">
      <div className="text-center max-w-md space-y-2">
        <h1 className="text-2xl font-black tracking-tight">Analytics Stress-Test Seeder</h1>
        <p className="text-slate-400 text-xs leading-relaxed">
          Backfills your <code className="text-indigo-400 font-mono">reset_history</code> log arrays with 76 sequential timestamp nodes tracking back from Oct 14, 9:00 PM.
        </p>
      </div>

      <div className="rounded border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-indigo-400">
        Status: {status}
      </div>

      <button
        onClick={handleGenerateTestData}
        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-98"
      >
        Inject Deep History Seed Data
      </button>
    </div>
  )
}
