import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const bucket_name = "poses";

export async function uploadPose(id, image, objects) {
  const { data, error } = await supabase
    .from("pose")
    .upsert({ id, image, objects })
    .select();

  if (error) {
    console.error("Upload failed:", error.message, error.details, error.hint);
  } else {
    console.log("Upload success", data);
  }

  return { data, error };
}

export async function uploadImage(file_path, file) {
  const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(`public/${file_path}`, file);

  if (error) {
    console.error("Upload failed:", error.message, error.details, error.hint);
  } else {
    console.log("Upload success", data);
  }

  return data;
}

export async function fetchPoseById(id) {
  const { data, error } = await supabase
    .from("pose")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching data:", error.message);
  }

  return data;
}

export async function fetchLatestPose() {
  const { data, error } = await supabase
    .from("pose")
    .select("*")
    .order("created_at", { ascending: false })
    .single();

  if (error) {
    console.error("Error fetching data:", error.message);
  }

  return data;
}

export function getPoseImageUrl(image) {
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/poses/public/${image}`;
  return imageUrl;
}
