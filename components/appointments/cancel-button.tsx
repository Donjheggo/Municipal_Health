"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader, Ban } from "lucide-react";
import { CancelAppointment } from "@/lib/actions/appointments";

export default function CancelButton({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { error } = await CancelAppointment(id);
      if (error) {
        toast.error(error);
      }
    } catch (error) {
      toast.error("Error updating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleUpdate}
      disabled={loading}
    >
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <Ban size={20}/> <p className="ml-1 text-base font-normal">Cancel</p>
        </>
      )}
    </Button>
  );
}
