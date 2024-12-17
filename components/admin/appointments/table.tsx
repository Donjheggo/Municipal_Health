import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetAppointments,
  GetTotalAppoiments,
} from "@/lib/actions/appointments";
import { TablePagination } from "./pagination";
import DeleteButton from "./delete-button";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import UpdateButton from "./update-button";
import { Badge } from "@/components/ui/badge";
import { FormatDateTime } from "@/lib/utils";

export default async function AppointmentTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 9;

  const [totalAppointments, appointments] = await Promise.all([
    GetTotalAppoiments(),
    GetAppointments(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalAppointments / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage appointments.</CardDescription>
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
              <TableHead className="table-cell">Created At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
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
                    {FormatDateTime(new Date(item.schedule))}
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
                <TableCell>
                  <p className="font-normal">
                    {FormatDateTime(new Date(item.created_at))}
                  </p>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UpdateButton id={item.id} />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <DeleteButton id={item.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalAppointments)}</strong>{" "}
          of <strong>{totalAppointments}</strong>
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
