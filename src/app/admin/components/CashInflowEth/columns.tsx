import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { CashInflowEthType } from "@/types/api-types";
import { ColumnDef } from "@tanstack/react-table";

export const CashInflowEthColumns: ColumnDef<CashInflowEthType>[] = [
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
    accessorKey: "usdSpent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="USD Spent" />
    ),
  },
  {
    accessorKey: "ethUnitPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ETH Unit Price" />
    ),
  },
  {
    accessorKey: "etherUnitsReceived",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ETH Units Received" />
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
