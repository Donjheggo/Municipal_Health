import ServicesTable from "@/components/services/services-table";
import SearchBar from "@/components/search-bar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Services({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-sm mx-auto">
      <h1 className="text-center text-2xl">Our Services</h1>
      <div className="mt-5">
        <SearchBar />
        <div className="mt-2">
          <ServicesTable searchQuery={searchQuery} page={page} />
        </div>
        <div className="mt-2">
          <Link href="/book">
            <Button className="w-full">
              Book Now
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
