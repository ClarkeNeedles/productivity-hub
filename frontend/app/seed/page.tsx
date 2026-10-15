// src/app/seed/page.tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

export default function SeedPage() {
  const [status, setStatus] = useState<string>('Ready')
  const [diagnostics, setDiagnostics] = useState<string | null>(null)
  const supabase = createClient()

  const handleSeed = async () => {
    setStatus('Seeding data...')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return setStatus('❌ No user logged in')

    const { error } = await supabase
      .from('user_module_data')
      .upsert({
        user_id: user.id,
        module_id: 'streak-counter',
        state: { best_streak: 12, current_streak: 5 }, 
        updated_at: new Date().toISOString()
      })

    if (error) setStatus(`❌ DB Error: ${error.message}`)
    else setStatus('✅ Seed executed! Now press "Run Diagnostics".')
  }

  // DIAGNOSTIC BUTTON: Tests the raw returned data types
  const handleTestFetch = async () => {
    setStatus('Running diagnostic fetch...')
    setDiagnostics(null)
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return setStatus('❌ No user logged in')

    const { data, error } = await supabase
      .from('user_module_data')
      .select('state')
      .eq('user_id', user.id)
      .eq('module_id', 'streak-counter')
      .single()

    if (error) {
      setStatus(`❌ Fetch Error: ${error.message}`)
      return
    }

    if (!data || !data.state) {
      setStatus('❌ Diagnostic Error: Row empty or data missing.')
      return
    }

    // Capture exactly what JavaScript thinks this data is
    const dataType = typeof data.state
    let currentStreakValue = 'N/A'
    let parseTestResult = 'N/A'

    if (dataType === 'object') {
      // If it's a native JSONB object, this mapping will work instantly
      currentStreakValue = data.state.current_streak ?? 'undefined'
      parseTestResult = 'Skipped (Already a native object)'
    } else if (dataType === 'string') {
      // If it's text, the mapping returns undefined until manually parsed
      currentStreakValue = (data.state as any).current_streak ?? 'undefined (Because it is a raw string string)'
      try {
        const doubleParsed = JSON.parse(data.state)
        parseTestResult = `Success! current_streak after JSON.parse is: ${doubleParsed.current_streak}`
      } catch (e) {
        parseTestResult = 'Failed to parse string as JSON'
      }
    }

    setDiagnostics(JSON.stringify({
      raw_data_returned: data.state,
      javascript_detected_type: dataType,
      mapping_without_parsing: `state.current_streak = ${currentStreakValue}`,
      manual_json_parse_test: parseTestResult
    }, null, 2))
    
    setStatus('✅ Diagnostics complete.')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold">Database Seeding Tool & Diagnostics</h1>
      <p className="text-slate-400 text-sm">Status: <span className="font-mono text-indigo-400">{status}</span></p>
      
      <div className="flex gap-4">
        <button onClick={handleSeed} className="rounded bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500">
          Seed Clean JSONB Data
        </button>
        <button onClick={handleTestFetch} className="rounded bg-emerald-600 px-6 py-3 font-medium hover:bg-emerald-500">
          Run Diagnostics
        </button>
      </div>

      {diagnostics && (
        <pre className="mt-4 max-w-xl w-full rounded border border-slate-700 bg-slate-950 p-4 font-mono text-xs text-emerald-400 whitespace-pre-wrap">
          {diagnostics}
        </pre>
      )}
    </div>
  )
}
