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
import { DateRangePicker } from "@/app/admin/transactions/date-range-picker";
import DownloadCSV from "@/utils/array-to-csv";
import isWithinRange from "@/utils/date-range-filter";
import { FileCsv } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
import { AddPromo } from "./addpromo"
import { convertToShortDateMonthDay } from "@/lib/utils"
import { UpdatePromo } from "./updatepromo"
import { DeletePromo } from "./deletepromo"

export type PromotionData = {
    name: string
    startDate: number
    endDate: string
    creditAmount: string
    apply_to: string
    createdAt: string
    updatedAt: string
}


export const columns: ColumnDef<PromotionData>[] = [
    {
        accessorKey: "startDate",
        header: "Start",
        cell: ({ row }) => (
            <div className="capitalize">{convertToShortDateMonthDay(row.getValue("startDate"))}</div>
        ),
    },
    {
        accessorKey: "endDate",
        header: "End",
        cell: ({ row }) => (
            <div className="capitalize">{convertToShortDateMonthDay(row.getValue("endDate"))}</div>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "creditAmount",
        header: "Credits",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("creditAmount")}</div>
        ),
    },
    {
        accessorKey: "apply_to",
        header: "Apply to",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("apply_to")}</div>
        ),
    },
    {
        accessorKey: "promo_code",
        header: "Promo Code",
        cell: ({ row }) => (
            <div className="uppercase">
                {row.getValue("promo_code")}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="uppercase">
                {row.getValue("status")}
            </div>
        ),
    },
    {
        accessorKey: "used",
        header: "Used",
        cell: ({ row }) => (
            <div className="uppercase">
                {row.getValue("used")}
            </div>
        ),
    },
    {
        accessorKey: "max_user",
        header: "Max User",
        cell: ({ row }) => (
            <div className="uppercase">
                {row.getValue("max_user") === 0 ? 'No Limit' : row.getValue("max_user")}
            </div>
        ),
    },
    {
        header: "Actions",
        cell: ({ row }) => (
            <div className="uppercase flex items-center">
                <UpdatePromo data={row} />
                <DeletePromo data={row} />
            </div>
        ),
    },
]

export default function Promotions() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const { data: session } = useSession();
    const token = session?.user.accesstokens as unknown as string;
    const [promotions, setPromotions] = React.useState<any[]>([])

    const getPromotions = async () => {
        const response = await fetch(`${AtlasBackendApi}/admin/promotions`, {
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
        queryKey: ["promotions"],
        queryFn: getPromotions,
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
            setPromotions(filteredData)
        }
        refetch()
    }

    const table = useReactTable({
        data: promotions,
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

    React.useEffect(() => {
        if (data) {
            setPromotions(data)
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
                    onClick={() => DownloadCSV(promotions, 'Promotions')}
                    disabled={promotions.length === 0}
                    variant={'outline'} className="flex items-center hover:text-white hover:bg-green-600">
                    Download
                    <FileCsv className="mx-1" />
                </Button>
                <AddPromo refetch={refetch} />
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


