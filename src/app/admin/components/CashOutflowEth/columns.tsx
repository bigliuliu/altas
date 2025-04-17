import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { CashOutflowEthType } from "@/types/api-types";
import { ColumnDef } from "@tanstack/react-table";

export const CashOutflowEthColumns: ColumnDef<CashOutflowEthType>[] = [
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
    accessorKey: "transactionType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Type" />
    ),
  },
  {
    accessorKey: "gasPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gas Price" />
    ),
  },
  {
    accessorKey: "etherUnitsConsumed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ether Units Consumed" />
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
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
  },
];
