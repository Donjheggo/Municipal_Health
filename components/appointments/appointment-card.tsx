import { Tables } from "@/database.types";
import { ActivityIcon, CalendarClock } from "lucide-react";
import { GetAppointmentById } from "@/lib/actions/appointments";
import CancelButton from "./cancel-button";
import { Badge } from "../ui/badge";
import { FormatDateTime } from "@/lib/utils";

export default async function AppointmentCard({
  item,
}: {
  item: AppointmentT;
}) {
  const appointment = await GetAppointmentById(item.service_id);

  return (
    <div className="border rounded-lg p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ActivityIcon className="mr-1" />
          <h1 className="text-xl font-semibold">{appointment.name}</h1>
        </div>
        {item.status === "PENDING" && <CancelButton id={item.id} />}
      </div>
      <div>
        <div className="flex items-center">
          <CalendarClock size={18} />
          <h1 className="ml-1">{FormatDateTime(new Date(item.schedule))}</h1>
        </div>
        <h1>
          <Badge variant="default"> {item.status} </Badge>
        </h1>
        <div className="mt-2">
          <h1>Name: {item.name}</h1>
          <h1>Birthdate: {item.birthdate}</h1>
          <h1>Address: {item.address}</h1>
          <h1>Contact number: {item.contact_number}</h1>
          <h1>Gender: {item.gender}</h1>
        </div>
      </div>
    </div>
  );
}

export type AppointmentT = Tables<"appointments">;
