import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAppointments } from "@/lib/actions/appointments";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

export default async function AppointmentTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 9;

  const [appointments] = await Promise.all([
    GetAppointments(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Appointments</CardTitle>
          <Link href="/dashboard/appointments">
            <Button variant="outline" className="flex items-center">
              View More
              <MoveUpRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">User email</TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Birthdate</TableHead>
              <TableHead className="table-cell">Address</TableHead>
              <TableHead className="table-cell">Contact no.</TableHead>
              <TableHead className="table-cell">Gender</TableHead>
              <TableHead className="table-cell">Service</TableHead>
              <TableHead className="table-cell">Schedule</TableHead>
              <TableHead className="table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-normal">{item.user_id.email}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.name}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.birthdate}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.address}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.contact_number}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.gender}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.service_id.name}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">
                    {new Date(item.schedule).toLocaleTimeString()} -{" "}
                    {new Date(item.schedule).toLocaleDateString()}
                  </p>
                </TableCell>
                <TableCell className="font-medium">
                  {(() => {
                    switch (item.status) {
                      case "PENDING":
                        return <Badge variant="outline">Pending</Badge>;
                      case "ACCEPTED":
                        return <Badge variant="outline">Accepted</Badge>;
                      case "CANCELLED":
                        return <Badge variant="destructive">Canceled</Badge>;
                      case "COMPLETED":
                        return <Badge variant="default">COMPLETED</Badge>;
                      default:
                        return null;
                    }
                  })()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
