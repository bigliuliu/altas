"use client";
import DashboardGeolocator from "@/components/dashboard/DashboardGeolocator";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Land } from "@/constants/png";
import { Property } from "@/types/api-types";
import { SealCheck } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { RejectProperty, VerifyProperty } from "@/config/APIConfig";
// titleLR:string,
//      county:string,
//      registrationSection:string,
//      blockNumber:string,
//      parcelNumber:string,
//      sizeHa:string,
//      ownerName:string,
//      leaseType:string,
//      acquistionType:string,
//      encumbrance:string,
//      landRateBalance:string,
//      propertyTitleDeed:string,
//      propertyImage:string

export const PropertyColumns: ColumnDef<Property>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "titleLR",
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
    accessorKey: "registrationSection",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RegistrationSection" />
    ),
  },
  {
    accessorKey: "blockNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BlockNumber" />
    ),
  },
  {
    accessorKey: "parcelNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ParcelNumber" />
    ),
  },
  {
    accessorKey: "sizeHa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Size" />
    ),
  },
  {
    accessorKey: "leaseType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title Type" />
    ),
  },
  {
    accessorKey: "userType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Type" />
    ),
  },
  {
    accessorKey: "encumbrance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Encumbrance" />
    ),
  },
  {
    accessorKey: "ownerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
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

  const { data: session } = useSession();
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;

  console.log("token token", token);

  //verify property

  const handleVerifyProperty = async (property_id: string) => {
    try {
      const res = await VerifyProperty(property_id, token);
      if (res?.status == 409) {
        console.log("res is 409", res); // here the notification should alert  user not authorized
      }

      if (res?.status == 200) {
        //should notify a success
        setOpen(false);
      }
    } catch (error) {
      console.log("verify error", error);
    }
  };

  //reject property

  const handleRejectProperty = async (property_id: string) => {
    try {
      const res = await RejectProperty(property_id, token);
      if (res?.status == 409) {
        console.log("res is 409", res); // here the notification should alert  user not authorized
      }

      if (res?.status == 200) {
        //should notify a success
        setOpen(false);
      }
    } catch (error) {
      console.log("verify error", error);
    }
  };

  return (
    <main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button className="py-3 px-5 w-[120px] bg-[#218B531A] text-[#218B53] rounded-lg hover:font-semibold">
            View
          </button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              Property {cell.row.original?.titleLR}
            </DialogTitle>
            <div className=" rounded-xl hover:cursor-pointer flex flex-col w-full">
              {cell.row.original.propertyImage ? (
                <Image
                  src={cell.row.original?.propertyImage}
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-xl w-full h-96 "
                />
              ) : (
                <Image src={Land} alt="" className=" rounded-xl " />
              )}
              <article className="p-3">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-xl">
                    {cell.row.original?.titleLR}
                  </h4>
                  <span className="flex items-center ">
                    <SealCheck size={24} color="#398DEE" weight="fill" />
                    <h4 className="my-2 text-[#398DEE]">
                      {cell.row.original?.status}
                    </h4>
                  </span>
                </div>
                <span className="flex justify-between items-center">
                  <h4 className=" mb-3">
                    <span className="font-semibold">
                      {cell.row.original?.sizeHa} Ha
                    </span>
                  </h4>
                </span>
                <span className="flex justify-between items-center">
                  <h4 className=" mb-3">
                    Property TitleType:{" "}
                    <span className="font-semibold">
                      {cell.row.original?.leaseType}
                    </span>
                  </h4>
                  <p className=" mb-3">
                    Property UserType:{" "}
                    <span className="font-semibold">
                      {cell.row.original?.acquistionType}
                    </span>{" "}
                  </p>
                </span>
                <span className="flex justify-between items-center">
                  <h4 className=" mb-3">
                    Property AcquisitionDate:{" "}
                    <span className="font-semibold">
                      {cell.row.original?.leaseType}
                    </span>
                  </h4>
                  <p className=" mb-3">
                    Property AcquistionType:{" "}
                    <span className="font-semibold">
                      {cell.row.original?.acquistionType}
                    </span>{" "}
                  </p>
                </span>
                <span className="flex justify-between items-center">
                  <h4 className=" mb-3">
                    Property Owner:{" "}
                    <span className="font-semibold">
                      {cell.row.original?.ownerName}
                    </span>
                  </h4>
                </span>
                <div className="flex justify-between"></div>
              </article>
              <div className="flex justify-between">
                <button
                  onClick={() => handleVerifyProperty(cell.row.original?._id)}
                  className="py-3 px-5 w-[200px] bg-[#218B53] text-white hover:bg-[#256f48] hover:text-white rounded-lg hover:font-semibold"
                >
                  Verify Property
                </button>
                <button
                  onClick={() => handleRejectProperty(cell.row.original?._id)}
                  className="py-3 px-5 mx-2 w-[200px] bg-red-500 text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold"
                >
                  Reject Verification
                </button>
              </div>
              <DashboardGeolocator />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};
