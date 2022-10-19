import useSupabase from 'src/boot/supabase'
import useAuthUser from './UseAuthUser'

export default function useApi () {

  const { supabase } = useSupabase()
  const { user } = useAuthUser()

  return {
    insert,
  }
}
