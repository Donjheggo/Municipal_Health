"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetMyAppointments(user_id: string) {
  try {
    const supabase = createClient();

    const { error, data } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GetAppointmentById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return false;
    }
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function CancelAppointment(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointments")
      .update({ status: "CANCELLED" })
      .eq("id", id)
      .select();

    if (error) {
      return { error: "Error cancelling appointment.", sucess: false };
    }
    revalidatePath("/appointments");
    return { success: true, error: "" };
  } catch (error) {
    return { error: "There was unexpected error.", sucess: false };
  }
}
