import supabase, { supabaseUrl } from "./supabase";

export async function createAsana(newAsana) {
  const { data, error } = await supabase
    .from("asana")
    .insert([{ ...newAsana }])
    .select();

  return { data, error };
}
