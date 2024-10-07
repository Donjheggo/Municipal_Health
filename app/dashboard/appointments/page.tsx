import SearchBar from "@/components/search-bar";
import AppointmentTable from "@/components/admin/appointments/table";

export default function Appointments({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-2xl mx-auto">
      <h1 className="text-center text-2xl">Appointments</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between gap-2">
          <SearchBar />
        </div>
        <div className="mt-2">
          <AppointmentTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
