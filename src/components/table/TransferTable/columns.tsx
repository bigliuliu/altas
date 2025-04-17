import DashboardGeolocator from "@/components/dashboard/DashboardGeolocator";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Land } from "@/constants/png";
import { convertToShortDateMonthDay, getCoordinatesFromLink } from "@/lib/utils";
import { Transfer } from "@/types/api-types";
import isWithinRange from "@/utils/date-range-filter";
import { Scales, SealCheck } from "@phosphor-icons/react";
import { Cell, ColumnDef, FilterFnOption } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const TransferColumns: ColumnDef<Transfer>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "createdAt",
    filterFn: isWithinRange as FilterFnOption<Transfer>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      const formatted = convertToShortDateMonthDay(date)
      return <div className="text-start font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title No" />
    ),
  },
  {
    accessorKey: "county",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="County" />
    ),
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size (Ha)" />
    ),
  },
  {
    accessorKey: "ownerId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => {
      let owner: any = row.getValue("ownerId")
      return (
        <div>{owner?.fullName}</div>
      )
    }
  },
  {
    accessorKey: "recipientId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipient" />
    ),
    cell: ({ row }) => {
      let recipient: any = row.getValue("recipientId")
      return (
        <div>{recipient?.fullName}</div>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    id: "actions",
    accessorKey: "ACTIONS",
    header: "Actions",
    cell: ({ cell }) => {
      return <DropDown cell={cell} />;
    },
  },
];

import React, { useState } from "react";
import { Controller } from "react-hook-form";

// id:item.id,
// titleLR:item.titleLR,
// county:item.county,
// registrationSection:item.registrationSection,
// blockNumber:item.blockNumber,
// parcelNumber:item.parcelNumber,
// sizeHa:item.sizeHa,
// ownerName:item.ownerName,
// leaseType:item.leaseType,
// acquistionType:item.acquistionType,
// encumbrance:item.encumbrance,
// landRateBalance:item.landRateBalance,
// status:item.status,
// propertyTitleDeed:item.propertyTitleDeed,
// propertyImage:item.propertyImage

const DropDown = ({ cell }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button className="py-3 px-5 w-[120px] bg-[#218B531A] text-[#218B53] rounded-lg hover:font-semibold mx-1">
            View Property
          </button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-screen-md overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              Property {cell.row.original.title}
            </DialogTitle>
            <div className=" rounded-xl hover:cursor-pointer flex flex-col w-full">
              {cell.row.original.propertyDetails?.propertyImage ? (
                <Image
                  src={cell.row.original.propertyDetails?.propertyImage}
                  alt=""
                  width={300}
                  height={300}
                  className="rounded-xl w-full h-96"
                />
              ) : (
                <Image src={Land} alt="" className=" rounded-xl " />
              )}
              <article className="p-3">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-xl">
                    {cell.row.original.propertyDetails?.titleLR?.toUpperCase()}<br />
                    <span className="text-sm">{cell.row.original.propertyDetails?.propertyAlias}</span>

                  </h4>
                  <span className="flex items-center ">
                    <SealCheck size={24} color="#398DEE" weight="fill" />
                    <h4 className="my-2 text-[#398DEE]">{cell.row.original.propertyDetails?.status}</h4>
                  </span>
                </div>
                <span className="flex justify-between items-center">
                  <h4 className=" mb-3">
                    <span className="font-semibold">
                      {cell.row.original.propertyDetails?.sizeHa} Ha
                    </span>
                  </h4>
                </span>
                <span className="flex justify-start gap-2 items-center">
                  <h4 className=" mb-3">
                    <span className="font-semibold">
                      {cell.row.original.propertyDetails?.leaseType ? cell.row.original.propertyDetails?.leaseType.charAt(0).toUpperCase() + cell.row.original.propertyDetails?.leaseType.slice(1) : ''} /
                    </span>
                  </h4>
                  <p className=" mb-3">
                    <span className="font-semibold">
                      {cell.row.original.propertyDetails?.userType ? cell.row.original.propertyDetails?.userType.charAt(0).toUpperCase() + cell.row.original.propertyDetails?.userType.slice(1) : ''}
                    </span>{" "}
                  </p>
                </span>
                <span className="flex justify-start gap-2 items-center">
                  <h4 className=" mb-3">
                    <span className="font-semibold capitalize">
                      {cell && cell.row.original.propertyDetails?.acquistionType}
                      {cell && cell.row.original.propertyDetails?.acquistionType === 'commercial' ? ' ' + 'Purchase' : ''}  /
                    </span>
                  </h4>
                  <p className=" mb-3">
                    <span className="font-semibold">
                      {cell.row.original.propertyDetails?.acquisitionDate?.split(' ').slice(1).join(' ')}
                    </span>{" "}
                  </p>

                </span>
                <span className="flex justify-between items-center">
                  <h4 className=" mb-3">
                    <span className="font-semibold">
                      {cell.row.original.propertyDetails?.ownerName?.toUpperCase()}
                    </span>
                  </h4>
                  <h4 className=" mb-3">
                    <span className="font-semibold">
                      {/* {propertyState?.ownerName} */}
                    </span>
                  </h4>
                </span>
                {cell && cell.row.original.propertyDetails?.status === 'verified' &&
                  <div className="shadow-md p-4 bg-green-50 text-black">
                    <h1 className="text-sm font-thin">Blockchain Contract Hash:</h1>
                    <div className="ml-1 text-sm">
                      <span className="text-bold italic">
                        hjsdcbvsdcvshdcsvgdcghvsdhgsvdcw
                      </span>
                      <p className="my-4 underline text-blue-400 flex items-center">
                        <a href="/" target="_blank">View blockchain Data</a>
                        <ExternalLinkIcon fontSize={20} className="mx-1" />
                      </p>
                    </div>
                  </div>
                }
              </article>
              <DashboardGeolocator coordinates={[getCoordinatesFromLink(cell.row.original.propertyDetails?.propertyCoordinate)]} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main >
  );
};
