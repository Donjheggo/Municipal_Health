import SearchBar from "@/components/search-bar";
import AnnouncementTable from "@/components/admin/announcement/table";
import CreateAnnouncementDialog from "@/components/admin/announcement/create-dialog";

export default function Announcements({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto">
      <h1 className="text-center text-2xl">Announcements</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between gap-2">
          <SearchBar />
          <CreateAnnouncementDialog />
        </div>
        <div className="mt-2">
          <AnnouncementTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
