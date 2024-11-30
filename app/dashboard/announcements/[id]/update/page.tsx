import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GetAnnouncementById } from "@/lib/actions/announcements";
import UpdateAnnouncementForm from "@/components/admin/announcement/update-form";

export default async function UpdateService({
  params,
}: {
  params: { id: string };
}) {
  const appointment = await GetAnnouncementById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateAnnouncementForm item={appointment} />
      </div>
    </div>
  );
}
