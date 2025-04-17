import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispute } from "@/types/api-types";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export const DisputeColumns: ColumnDef<Dispute>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    accessorKey: "propertyId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Title" />
    ),
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Raised By" />
    ),
  },
  {
    accessorKey: "nature",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nature" />
    ),
  },
  {
    accessorKey: "attachment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attachment(s)" />
    ),
    cell: ({ cell }) => {
      return (<>{cell.row.original?.updatedAt}</>)
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  // {
  //   id: "actions",
  //   accessorKey: "ACTIONS",
  //   header: "Actions",
  //   cell: () => {
  //     return <DropDown />;
  //   },
  // },
];

import React, { useState } from "react";

const DropDown = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <main>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="py-3 px-5 w-[120px] bg-[#218B531A] text-[#218B53] rounded-lg hover:font-semibold">
            View
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Property Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            Reject Dispute
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => router.replace("/registry/updateProperty")}
          >
            Update Property
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              Are you sure you want to reject this Dispute
            </DialogTitle>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="py-3 px-5 w-full bg-red-500 text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold"
              >
                Reject
              </button>
              {/* <button className="py-3 px-5 mx-2 w-full bg-black text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold">
                        Cancel
                      </button> */}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default DropDown;
