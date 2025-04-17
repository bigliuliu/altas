"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef, FilterFnOption } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { formatDateString } from "@/lib/utils"
import isWithinRange from "@/utils/date-range-filter"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Subscription = {
  _id: string
  name: number
  email: string
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "createdAt",
    filterFn: isWithinRange as FilterFnOption<Subscription>,
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
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("email")}</div>
    }
  }
]
