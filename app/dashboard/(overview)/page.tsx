import DashboardCard from "@/components/admin/dashboard/dashboard-card";
import AppointmentTable from "@/components/admin/dashboard/appointment-table";
import { Hospital, Users, CalendarDays } from "lucide-react";
import { GetTotalUsers } from "@/lib/actions/users";
import { GetTotalServices } from "@/lib/actions/services";
import { GetTotalAppoiments } from "@/lib/actions/appointments";

export default async function Dashboard() {
  const [appointments, services, users] = await Promise.all([
    GetTotalAppoiments(),
    GetTotalServices(),
    GetTotalUsers(),
  ]);

  const cards = [
    {
      title: "Total Services",
      number: services,
      icon: <Hospital size={25} className="text-primary" />,
    },
    {
      title: "Total Appointments",
      number: appointments,
      icon: <CalendarDays size={25} className="text-primary" />,
    },
    {
      title: "Total Users",
      number: users,
      icon: <Users size={25} className="text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-2xl p-4 lg:p-6">
      <h1 className="text-center text-2xl">Dashboard</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-1 xl:grid-cols-3 mt-4">
        {cards.map((item, index) => (
          <DashboardCard key={index} item={item} />
        ))}
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mt-4">
        <div className="w-full">
          <AppointmentTable searchQuery="" page={1} />
        </div>
      </div>
    </div>
  );
}
