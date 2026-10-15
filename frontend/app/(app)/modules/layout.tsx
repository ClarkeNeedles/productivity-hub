import { ModulesStoreProvider } from '@/providers/modules-store-provider'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ModulesLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  // This is okay because the middleware already caches the user session
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <ModulesStoreProvider userId={user.id}>
      <div className="modules-route-container">
        {children}
      </div>
    </ModulesStoreProvider>
  )
}
