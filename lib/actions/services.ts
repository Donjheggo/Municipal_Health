"use server";

import { createClient } from "../supabase/server";
import { toast } from "react-toastify";

const supabase = createClient();

export async function GetServices(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    let query = supabase
      .from("services")
      .select("*")
      .order("name", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.textSearch("name", searchQuery)
      : await query;

    if (error) {
      toast.error(error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      return [];
    }
  }
}

export async function TotalServices() {
  try {
    const { data, error } = await supabase.from("services").select("*");

    if (error) {
      toast.error(error.message);
      return 0;
    }

    return data?.length || 0;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      return 0;
    }
    return 0;
  }
}
