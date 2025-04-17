"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef, FilterFnOption } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { formatDateString } from "@/lib/utils"
import isWithinRange from "@/utils/date-range-filter"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  _id: string
  amount: number
  phoneNumber: string
  note: string
  transactionID: string
  mpesaReceiptID: string
  user: string
  status: "pending" | "processing" | "success" | "failed"
  transactionType: string
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "createdAt",
    filterFn: isWithinRange as FilterFnOption<Transaction>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      const formatted = formatDateString(date)
      return <div className="text-start font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "mpesaReceiptID",
    header: "MpesaCode"
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-start">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "transactionType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("transactionType")}</div>
    }
  },
  {
    accessorKey: "phoneNumber",
    header: 'Phone Number'
  },
  {
    accessorKey: "note",
    header: 'Billing Type'
  }
]
