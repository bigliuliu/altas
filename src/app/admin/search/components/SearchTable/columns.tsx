import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Property } from "@/types/api-types";
import { ColumnDef } from "@tanstack/react-table";

export const SearchPropertyColumns: ColumnDef<Property>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Land Name" />
    ),
  },
  {
    accessorKey: "registrationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration Date" />
    ),
  },
  {
    accessorKey: "primaryContact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Primary Contact" />
    ),
  },
  {
    accessorKey: "assetValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Value" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    id: "actions",
    accessorKey: "ACTIONS",
    header: "Actions",
    cell: () => {
      return (
        <button className="py-3 px-5 w-[120px] bg-[#218B531A] text-[#218B53] rounded-lg hover:font-semibold">
          More
        </button>
      );
    },
  },
];
