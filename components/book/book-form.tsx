"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, SendHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GetAllServices } from "@/lib/actions/services";
import { Tables } from "@/database.types";
import { CreateAppointment } from "@/lib/actions/appointments";

export default function BookingForm() {
  const router = useRouter();
  const [services, setServices] = useState<ServicesT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const { error } = await CreateAppointment(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/appointments");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const data = await GetAllServices();
      if (data) setServices(data);
    };

    fetchServices();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="service">Service</Label>
          <Select name="service_id">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {services?.map((item, index) => (
                  <SelectItem key={index} value={item.id}>
                    {item.name} - ₱{item.price}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Schedule</Label>
          <Input
            name="schedule"
            id="schedule"
            type="datetime-local"
            placeholder=""
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="John H. Doe"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Birth date</Label>
          <Input
            name="birthdate"
            id="birthdate"
            type="date"
            placeholder=""
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            name="address"
            id="address"
            type="text"
            placeholder="Complete Address"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact_number">Contact Number</Label>
          <Input
            name="contact_number"
            id="contact_number"
            type="number"
            placeholder="09123456789"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button size="lg" disabled={loading} type="submit" className="w-full">
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <h1 className="mr-2"> Submit Booking</h1>
              <SendHorizontal size={18}/>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export type ServicesT = Tables<"services">;
