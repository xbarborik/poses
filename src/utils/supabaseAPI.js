// Functions generated by Supabase
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wowswyqevfnxdnyuperg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvd3N3eXFldmZueGRueXVwZXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5MjgwNDAsImV4cCI6MjAyMzUwNDA0MH0.uKm3hsAD82iBfNXb0DVsbr9pOqrq1i8viBDlJU5QY1o";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
const bucket_name = "poses";

const validateSupabaseConfig = () => {
  if (!supabaseUrl.length || !supabaseAnonKey || !supabase) {
    console.error(
      "Supabase client is not configured. Missing URL or Anon Key."
    );
    return false;
  }
  return true;
};

export async function uploadPose(id, objects, originalSize) {
  if (!validateSupabaseConfig()) return false;

  const { data, error } = await supabase
    .from("pose")
    .upsert({ id, image: `${id}.png`, objects, original_size: originalSize })
    .select();

  if (error) {
    console.error("Upload failed:", error.message, error.details, error.hint);
  } else {
    console.log("Upload success", data);
  }

  return { data, error };
}

export async function uploadImage(file_path, file) {
  if (!validateSupabaseConfig()) return false;

  const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(`public/${file_path}`, file);

  if (error) {
    console.error("Upload failed:", error.message, error.details, error.hint);
  } else {
    console.log("Upload success", data);
  }

  return { data, error };
}

export async function fetchPoseById(id) {
  if (!validateSupabaseConfig()) return false;

  const { data, error } = await supabase
    .from("pose")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }

  return data;
}

export async function fetchLatestPose() {
  if (!validateSupabaseConfig()) return false;

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
  if (!validateSupabaseConfig()) return false;

  const { data, error } = supabase.storage
    .from("poses")
    .getPublicUrl(`public/${image}`);

  if (error) {
    console.log("Image exists");
    return null;
  }
  return data.publicUrl;
}

export async function loadFromId(id) {
  if (!validateSupabaseConfig()) return false;

  const result = await fetchPoseById(id);
  if (result === null) return result;

  const pose = [
    {
      id: result.id,
      objects: result.objects,
      path: getPoseImageUrl(result.image),
      originalSize: result.original_size,
      file: null,
    },
  ];

  return pose;
}

export async function uploadImageAndPose(image, file) {
  if (!validateSupabaseConfig()) return false;

  const { error: imageError } = await uploadImage(`${image.id}.png`, file);
  if (imageError) {
    console.log("Image upload failed");
  }

  const { error } = uploadPose(image.id, image.objects, image.originalSize);
  if (error) {
    console.log("Upload failed");
    return false;
  }
  return true;
}

export async function fetchAllPoses() {
  if (!validateSupabaseConfig()) return false;

  let { data: poses, error } = await supabase
    .from("pose")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Failed to fetch poses");
    return [];
  }

  const posesWithPathToStorage = poses.map((pose) => {
    return { ...pose, path: getPoseImageUrl(pose.id) };
  });

  return posesWithPathToStorage;
}

export async function deletePoseFromCloud(id) {
  if (!validateSupabaseConfig()) return false;

  const { errorPose } = await supabase.from("pose").delete().eq("id", id);

  const { errorImage } = await supabase.storage
    .from(bucket_name)
    .remove([`public/${id}.png`]);

  if (errorPose || errorImage) console.log(errorPose, errorImage);
}
