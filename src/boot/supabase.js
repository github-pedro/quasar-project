import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = 'https://fqdyolysgkkajnokcdip.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZHlvbHlzZ2trYWpub2tjZGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU5Mzc5MzksImV4cCI6MTk4MTUxMzkzOX0.qYitUAqrZp3SM0cT5ZQpyDOXXoI_Y9gub-ZxlySbENQ'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})

export default function useSupabase() {
  return { supabase }
}
