"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetAppointments(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  const supabase = createClient();
  try {
    const query = supabase
      .from("appointments")
      .select(`*, user_id(email), service_id(name)`)
      .order("name", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
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

export async function GetMyAppointments(user_id: string) {
  try {
    const supabase = createClient();

    const { error, data } = await supabase
      .from("appointments")
      .select(`*, user_id(email), service_id(*)`)
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

export async function CreateAppointment(form: FormData) {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const { error } = await supabase.from("appointments").insert([
      {
        name: form.get("name"),
        birthdate: form.get("birthdate"),
        address: form.get("address"),
        contact_number: form.get("contact_number"),
        gender: form.get("gender"),
        service_id: form.get("service_id"),
        schedule: form.get("schedule"),
        status: "PENDING",
        user_id: data.user?.id,
      },
    ]);

    if (error) {
      return { error: error.message, sucess: false };
    }

    revalidatePath("/appointments");
    return { sucess: true };
  } catch (error) {
    return { error: error, sucess: false };
  }
}

export async function GetAppointmentById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("appointments")
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

export async function UpdateAppointment(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointments")
      .update({
        status: formData.get("status"),
        schedule: formData.get("schedule"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/appointments");
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteAppointment(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/appointments");
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalAppoiments() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("appointments").select("*");

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
