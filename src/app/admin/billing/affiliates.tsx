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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AtlasBackendApi } from "@/constants/atlas-backend-api"
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react"
import { convertToShortDateMonthDay } from "@/lib/utils"
import { DateRangePicker } from "@/app/admin/transactions/date-range-picker";
import DownloadCSV from "@/utils/array-to-csv";
import isWithinRange from "@/utils/date-range-filter";
import { FileCsv } from "@phosphor-icons/react";

export type AffiliatesData = {
    inviter: string
    invitee: number
    hasEnlistedProperty: boolean
    hasVerifiedProperty: boolean
    hasLoadedWallet: boolean
    createdAt: string
    updatedAt: string
}

export const columns: ColumnDef<AffiliatesData>[] = [
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => (
            <div className="capitalize">{convertToShortDateMonthDay(row.getValue("createdAt"))}</div>
        ),
    },
    {
        accessorKey: "inviter",
        header: "Inviter",
        cell: ({ row }) => (
            <div className="capitalize">{(row.getValue("inviter") as any)?.fullName}</div>
        ),
    },
    {
        accessorKey: "invitee",
        header: "Invitee",
        cell: ({ row }) => (
            <div className="capitalize">{(row.getValue("invitee") as any)?.fullName}</div>
        ),
    },
    {
        accessorKey: "hasEnlistedProperty",
        header: "Has Enlisted Property",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("hasEnlistedProperty") ? 'Yes' : 'No'}</div>
        ),
    },
    {
        accessorKey: "hasVerifiedProperty",
        header: "Has Verified Property",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("hasVerifiedProperty") ? 'Yes' : 'No'}</div>
        ),
    },
    {
        accessorKey: "hasLoadedWallet",
        header: "Has Deposited Funds",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("hasLoadedWallet") ? 'Yes' : 'No'}</div>
        ),
    }
]

export default function Affiliates() {
    const [affiliates, setAffiliates] = React.useState<any[]>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const { data: session } = useSession();
    const token = session?.user.accesstokens as unknown as string;

    const getAffiliates = async () => {
        const response = await fetch(`${AtlasBackendApi}/admin/affiliates`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "omit",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch billing data");
        }
        return response.json();
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["affiliates"],
        queryFn: getAffiliates,
    });

    const handleDateFilter = (value: any) => {
        console.log(value);
        const from = value.range.from;
        const to = value.range.to;
        if (data) {
            const filteredData = data.filter((value: any) => {
                if (from && !to) {
                    return new Date(value.createdAt).getTime() >= from.getTime()
                } else if (!from && to) {
                    return new Date(value.createdAt).getTime() <= to.getTime()
                } else if (from && to) {
                    return new Date(value.createdAt).getTime() >= from.getTime() && new Date(value.createdAt).getTime() <= to.getTime()
                } else return true;
            })
            console.log(filteredData)
            setAffiliates(filteredData)
        }
        refetch()
    }

    const table = useReactTable({
        data: affiliates,
        columns,
        filterFns: {
            isWithinRange: isWithinRange,            //filter function added
        },
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

    const prepDataForCsv = (data: any[]) => {
        let formatedData: any = [];
        data.forEach((element: any) => {
            let promo = {
                "Date": element.createdAt,
                Inviter: element.inviter.fullName,
                Invitee: element.invitee.fullName,
                hasEnlistedProperty: element.hasEnlistedProperty ? 'Yes' : 'No',
                hasVerifiedProperty: element.hasVerifiedProperty ? 'Yes' : 'No',
                hasLoadedWallet: element.hasLoadedWallet ? 'Yes' : 'No',

            }
            formatedData.push(promo)
        })
        return formatedData
    }

    React.useEffect(() => {
        if (data) {
            setAffiliates(data)
        }
    }, [data])

    return (
        <div className="w-full">
            <div className="w-full flex justify-between py-2 bg-gray shadow-md px-4">
                <DateRangePicker
                    onUpdate={(values) => handleDateFilter(values)
                    }
                    initialDateFrom="2024-01-01"
                    initialDateTo="2024-12-31"
                    align="start"
                    locale="en-GB"
                    showCompare={false}
                />
                <Button
                    onClick={() => DownloadCSV(prepDataForCsv(affiliates), 'Affiliates')}
                    disabled={affiliates.length === 0}
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
