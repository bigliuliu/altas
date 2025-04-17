"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DateRangePicker } from "./date-range-picker"
import { FileCsv } from "@phosphor-icons/react"
import DownloadCSV from "@/utils/array-to-csv"
import isWithinRange from "@/utils/date-range-filter"
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    dataFilterFn: (value: any) => void
}

interface DateRange {
    from: Date
    to: Date | undefined
}

export function DataTable<TData, TValue>({
    columns,
    data,
    dataFilterFn
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const table = useReactTable({
        data,
        columns,
        filterFns: {
            isWithinRange: isWithinRange,            //filter function added
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters,
        },

    })

    const handleDateFilter = (value: { range: DateRange, rangeCompare?: DateRange }) => {
        console.log(value)
        table.getColumn("createdAt")?.setFilterValue(
            isWithinRange(
                table.getRowModel().rows.find(value => value.index === 0),
                "createdAt",
                value.range
            )
        )
    }

    const handleCSVDownload = () => {
        DownloadCSV(data, 'Transactions');
    }


    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <div className="relative">
                    <DateRangePicker
                        onUpdate={(values) => dataFilterFn(values)
                        }
                        initialDateFrom="2024-01-01"
                        initialDateTo="2024-12-31"
                        align="start"
                        locale="en-GB"
                        showCompare={false}
                    />
                </div>
                <Input
                    placeholder="Filter by MpesaID ..."
                    value={(table.getColumn("mpesaReceiptID")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("mpesaReceiptID")?.setFilterValue(event.target.value)
                    }
                    className="bg-white focus:outline-none h-8 mx-4"
                />
                <Button
                    onClick={() => handleCSVDownload()}
                    disabled={data.length === 0}
                    variant={'outline'} className="flex items-center hover:text-white hover:bg-green-600">
                    Download
                    <FileCsv className="mx-1" />
                </Button>
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
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
    )
}
