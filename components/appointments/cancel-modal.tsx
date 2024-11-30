"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Ban } from "lucide-react";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import { CancelAppointment } from "@/lib/actions/appointments";

export default function CancelDialog({ id }: { id: string }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get("cancelation_note")) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    try {
      const { error } = await CancelAppointment(formData);
      if (error) {
        toast.error(error.toString());
      }
      toast.success("Cancelled successfuly.");
    } catch (error) {
      toast.error("There was an unexpected error creating.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Ban size={20} /> <p className="ml-1 text-base font-normal">Cancel</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Are you sure to Cancel?</DialogTitle>
            <DialogDescription>
              Provide your reason of cancelation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cancelation_note">Reason:</Label>
              <input name="id" defaultValue={id} hidden />
              <Textarea
                name="cancelation_note"
                id="cancelation_note"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
