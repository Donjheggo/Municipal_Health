import AppointmentCard from "@/components/appointments/appointment-card";
import { GetMyAppointments } from "@/lib/actions/appointments";
import { createClient } from "@/lib/supabase/server";

export default async function BookPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const appointments = await GetMyAppointments(data.user?.id || "");

  return (
    <div className="w-full md:w-[400px]">
      <h1 className="text-2xl text-center">My Appointments</h1>
      <div className="mt-5 flex flex-col gap-2">
        {appointments.map((item, index) => (
          <AppointmentCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
