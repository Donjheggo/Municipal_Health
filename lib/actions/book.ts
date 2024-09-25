"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

const supabase = createClient();

export async function CreateBooking(form: FormData) {
  try {
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
