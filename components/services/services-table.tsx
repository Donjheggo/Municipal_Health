import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetServices, TotalServices } from "@/lib/actions/services";
import { TablePagination } from "./pagination";
import { Badge } from "../ui/badge";

export default async function ServicesTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 10;

  const [totalServices, services] = await Promise.all([
    TotalServices(),
    GetServices(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalServices / items_per_page);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>List and prices of our services.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-normal">{item.name}</TableCell>
                <TableCell className="font-medium">
                  {item.price !== 0 ? `₱${item.price}` : <Badge>Free</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalServices)}</strong> of{" "}
          <strong>{totalServices}</strong> services
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
