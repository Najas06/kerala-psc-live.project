import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Job } from "@/types/type";
import Link from "next/link";
import { buttonVariants } from "./ui/button";


export function JobTable({ title, data }: { title: string; data: Job[] }) {
  return (
    <Table className="p-5 border rounded-xl mx-2 md:mx-0">
      <TableCaption className="py-5">
        {`A list of ${title} Kerala PSC Jobs`}
      </TableCaption>
      <TableHeader className="bg-slate-100">
        <TableRow>
          <TableHead className="uppercase text-black/80 font-medium tracking-tighter">
            job title
          </TableHead>
          <TableHead className="uppercase text-black/80 font-medium tracking-tighter max-sm:hidden ">
            Department
          </TableHead>
          <TableHead className="uppercase text-black/80 font-medium tracking-tighter w-[200px]">
            Dead Line
          </TableHead>
          <TableHead className="uppercase text-black/80 font-medium tracking-tighter w-[100px]">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {data ? (
          data.map((job) => (
            <TableRow key={job._id}>
              <TableCell className="font-medium">{job.postName}</TableCell>
              <TableCell className="text-green-600 font-medium max-sm:hidden ">
                {job.department}
              </TableCell>
              <TableCell className="text-red-700 font-semibold">
                {job.lastDate}
              </TableCell>
              <TableCell>
                <Link
                  href={`/jobs/${job._id}`}
                  className={buttonVariants({ variant: "default" })}
                >
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <>
            <p className="text-center my-3 ">Loading ...</p>
          </>
        )}
      </TableBody>
    </Table>
  );
}
