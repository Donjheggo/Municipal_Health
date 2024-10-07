import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  ClipboardListIcon,
  Hospital,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="container max-w-screen-lg mx-auto px-4 py-12 min-h-screen flex flex-col">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-primary">
        Welcome to San Jose Municipal Health
      </h1>
      <p className="text-xl text-center mb-12 text-muted-foreground">
        Your one-stop solution for managing appointments.
      </p>
      <div>
        <Card className="transform transition-all hover:scale-105 bg-background shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Hospital className="w-6 h-6 text-primary" />
              View Our Services
            </CardTitle>
            <CardDescription className="text-center">
              View the list of our available services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/services">
              <Button variant="outline" className="w-full">
                View Services
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
        <Card className="transform transition-all hover:scale-105 bg-background shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-primary" />
              Book an Appointment
            </CardTitle>
            <CardDescription>
              Schedule your next visit or medical test
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/book">
              <Button className="w-full">
                Book Now
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="transform transition-all hover:scale-105 bg-background shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardListIcon className="w-6 h-6 text-primary" />
              My Appointments
            </CardTitle>
            <CardDescription>
              View and manage your upcoming appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/appointments">
              <Button className="w-full" variant="outline">
                View Appointments
                <ArrowRight size={18} className="ml-2"/>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
