import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Subscriber } from "@/types/type"; // Ensure this path is correct

export function UsersTable({
  suscribersData,
}: {
  suscribersData: Subscriber[];
}) {
  //   console.log(suscribersData);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No:</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Subscription Date</TableHead>{" "}
          {/* Changed "Date" to "Subscription Date" for clarity */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {suscribersData.map(
          (
            subscriber,
            index // Corrected map arguments: (item, index)
          ) => (
            <TableRow key={subscriber._id}>
              {" "}
              {/* Use subscriber._id as the key */}
              <TableCell className="font-medium">{index + 1}</TableCell>{" "}
              {/* Display index + 1 for numbering */}
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>
                {subscriber.createdAt
                  ? new Date(subscriber.createdAt).toLocaleDateString()
                  : "N/A"}
                {/* Format the date for better readability */}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
