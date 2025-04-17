"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MapIcon, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { formatDateString } from "@/lib/utils"
import Link from "next/link"
import { MarkerCircle } from "@phosphor-icons/react/dist/ssr"


export type SearchResult = {
    propertyOwner: string
    propertyAlias: string
    propertyId: string
    propertyImage: string
    createdAt: string
    propertyCoordinate: string
}

const createQueryString = (key: string, value: string) => {
    const params = new URLSearchParams();
    params.set(key, value);
    return params.toString();
}

export const columns: ColumnDef<SearchResult>[] = [
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Label

                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-start"
                >
                    Saved On
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Label>
            )
        },
        cell: ({ row }) => <div className="uppercase">{formatDateString(row.getValue("createdAt"))}</div>,
    },
    {
        accessorKey: "propertyTitle",
        header: ({ column }) => {
            return (
                <Label

                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-start"
                >
                    Property Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Label>
            )
        },
        cell: ({ row }) => <div className="uppercase">
            <Link href={`${'/public/property'}?${createQueryString("title", row.getValue("propertyTitle"))}`} className="font-bold text-blue-600 underline">
                {row.getValue("propertyTitle")}
            </Link>
        </div>,
    },
    {
        accessorKey: "propertyOwner",
        header: ({ column }) => {
            return (
                <Label
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-start"
                >
                    Property Owner
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Label>
            )
        },
        cell: ({ row }) => <div className="text-start uppercase">{row.getValue("propertyOwner")}</div>,
    },
    {
        accessorKey: "propertyCoordinate",
        header: () => <div className="text-start">View on Map</div>,
        cell: ({ row }) => {
            return <div className="text-start font-medium">
                <Link target="_blank" href={row.getValue("propertyCoordinate")} className="underline text-blue-600 flex items-center">
                    <MapPin size={20} className="mx-1" />View
                </Link>
            </div>
        },
    },
]

export function SavedResult({ data }: { data: SearchResult[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <h1 className="py-4 font-bold">My Saved Search</h1>
            <div className="flex items-center py-2">
                <Input
                    placeholder="Search Aliases..."
                    value={(table.getColumn("propertyTitle")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("propertyTitle")?.setFilterValue(event.target.value)
                    }
                    className="max-w-md bg-white focus:outline-none w-full h-10"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s)
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
