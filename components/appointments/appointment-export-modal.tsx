"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ExportToExcelAppointments } from "@/lib/utils";
import { toast } from "react-toastify";
import { File } from "lucide-react";
import { Input } from "../ui/input";
import type { AppointmentT } from "./appointment-card";

export default function ExportToExcelDialog({
  appointments,
}: {
  appointments: AppointmentT[];
}) {
  const handleExport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get("from") || !formData.get("to")) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }

    const from = formData.get("from") as string;
    const to = formData.get("to") as string;

    try {
      ExportToExcelAppointments(appointments, from, to);
    } catch (error) {
      toast.error("There was an unexpected error creating.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <File size={18} className="mr-2" /> Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleExport}>
          <DialogHeader>
            <DialogTitle className="text-center">
              Export Appointments
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-col gap-4">
              <Label htmlFor="from">From</Label>
              <Input name="from" type="date" id="from" required />
            </div>
            <div className="grid grid-col gap-4">
              <Label htmlFor="to">To</Label>
              <Input name="to" type="date" id="to" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Export</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
