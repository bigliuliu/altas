import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { CashInflowUsdType } from "@/types/api-types";
import { ColumnDef } from "@tanstack/react-table";

export const CashInflowUsdColumns: ColumnDef<CashInflowUsdType>[] = [
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
    accessorKey: "bankSeller",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="USD Seller" />
    ),
  },
  {
    accessorKey: "usdUnitPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="USD/KES" />
    ),
  },
  {
    accessorKey: "usdPurchased",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="USD Purchased" />
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
