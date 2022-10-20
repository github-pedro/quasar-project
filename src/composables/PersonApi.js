import useSupabase from 'src/boot/supabase'
import useAuthUser from './UseAuthUser'

export default function useApi () {

  const { supabase } = useSupabase()

  const inserir = async (form) => {
    const { data, error } = await supabase
      .from('person')
      .insert([
        {
          ...form
        }
      ])
    if (error) throw error
    return data
  }
  const listar = async () => {
    const { data, error } = await supabase
      .from('person')
      .select('*')
    if (error) throw error
    return data
  }
  const deletar = async (id) => {
    const { data, error } = await supabase
      .from('person')
      .delete()
      .match({ id })
    if (error) throw error
    return data
  }
  const buscarPorID = async (id) => {
    const { data, error } = await supabase
      .from('person')
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data
  }
  const update = async (form) => {
    const { data, error } = await supabase
      .from('person')
      .update({ ...form })
      .match({ id: form.id })
    if (error) throw error
    return data
  }
  return {
    inserir,
    listar,
    deletar,
    buscarPorID,
    update
  }
}
