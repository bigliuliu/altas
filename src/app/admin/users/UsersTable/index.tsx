import { DataTable } from "@/components/table/data-table";
import isWithinRange from "@/utils/date-range-filter";
import { FileCsv, MagnifyingGlass } from "@phosphor-icons/react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { DateRangePicker } from "../../transactions/date-range-picker";
import { Button } from "@/components/ui/button";
import DownloadCSV from "@/utils/array-to-csv";

interface TblProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dataFilterFn: (value: any) => void
}


export default function UsersTable<TData, TValue>({
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
    filterFns: {
      isWithinRange: isWithinRange,            //filter function added
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });




  return (
    <DataTable table={table} columns={columns} data={data} dataFilterFn={dataFilterFn}>
      <div className="p-3 flex items-center justify-between">
        <DateRangePicker
          onUpdate={(values) => dataFilterFn(values)
          }
          initialDateFrom="2024-01-01"
          initialDateTo="2024-12-31"
          align="start"
          locale="en-GB"
          showCompare={false}
        />
        <div className="flex items-center border border-[#ccc] rounded-full px-2 w-1/2">
          <MagnifyingGlass size={24} color="#1e1e1e" weight="bold" />
          <input
            type="text"
            className="outline-none p-2 w-full"
            placeholder="Search property by title number"
            value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              table
                .getColumn("fullName")
                ?.setFilterValue(event.currentTarget.value);
            }}
          />
        </div>
        <Button
          onClick={() => DownloadCSV(data, 'Users')}
          disabled={data.length === 0}
          variant={'outline'} className="flex items-center hover:text-white hover:bg-green-600">
          Download
          <FileCsv className="mx-1" />
        </Button>
      </div>
    </DataTable>
  );

}
