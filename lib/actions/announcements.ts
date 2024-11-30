"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function GetAnnouncement(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  const supabase = createClient();
  try {
    const query = supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("description", `%${searchQuery}%`)
      : await query;

    if (error) {
      console.error(error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return [];
    }
  }
}

export async function CreateAnnouncement(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("announcements")
      .insert({
        description: formData.get("description"),
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/announcements");
    revalidatePath("/dashboard/announcements");
    return { error: "" };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export async function GetAnnouncementById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("announcements")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error.message);
      return false;
    }
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function UpdateAnnouncement(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("announcements")
      .update({
        description: formData.get("description"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/announcements");
    revalidatePath("/dashboard/announcements");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteAnnouncement(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/announcements");
    revalidatePath("/dashboard/announcements");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalAnnouncement() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("announcements").select("*");

    if (error) {
      console.error(error.message);
      return 0;
    }
    return data?.length || 0;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return 0;
    }
    return 0;
  }
}

export async function GetAllAnnouncement() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("announcements").select("*");

    if (error) {
      console.error(error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return [];
    }
    return [];
  }
}
