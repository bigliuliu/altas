import { DataTable } from "@/components/table/data-table";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

interface TblProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dataFilterFn: (value:any)=>void
}

export default function CashOutflowKesTable<TData, TValue>({
  columns,
  data,
  dataFilterFn
}: TblProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <DataTable dataFilterFn={dataFilterFn} table={table} columns={columns} data={data}>
      <div className="p-3">
        <div className="p-3 font-bold">Cash Outflows</div>
        <div className="flex items-center border border-[#ccc] rounded-full px-2 w-1/2">
          <MagnifyingGlass size={24} color="#1e1e1e" weight="bold" />
          <input
            type="text"
            className="outline-none p-2 w-full"
            placeholder="Search AccountID"
            value={
              (table.getColumn("accountId")?.getFilterValue() as string) ?? ""
            }
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              table
                .getColumn("accountId")
                ?.setFilterValue(event.currentTarget.value);
            }}
          />
        </div>
      </div>
    </DataTable>
  );
}
