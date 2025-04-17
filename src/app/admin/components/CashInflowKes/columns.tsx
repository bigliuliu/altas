import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { CashInflowKesType } from "@/types/api-types";
import { ColumnDef } from "@tanstack/react-table";

export const CashInflowKesColumns: ColumnDef<CashInflowKesType>[] = [
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
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account ID" />
    ),
  },
  {
    accessorKey: "accountName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Name" />
    ),
  },
  {
    accessorKey: "topUp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Top Up" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
  },
];
