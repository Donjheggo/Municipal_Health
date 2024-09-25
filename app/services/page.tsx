import ServicesTable from "@/components/services/services-table";
import SearchBar from "@/components/services/search-bar";

export default function Services({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div>
      <h1 className="text-center text-2xl">Our Services</h1>
      <div className="mt-5">
        <SearchBar />
        <div className="mt-2">
          <ServicesTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
