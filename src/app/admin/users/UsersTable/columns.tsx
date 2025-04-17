'use client'
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Land } from "@/constants/png";
import { User, UsersProfile } from "@/types/api-types";
import { ColumnDef, FilterFnOption } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { DeleteUserProfile, RejectUserProfile, VerifyUserProfile } from "@/config/APIConfig";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowUpDown, Loader2 } from "lucide-react";
import isWithinRange from "@/utils/date-range-filter";
import { Button } from "@/components/ui/button";
import { convertToShortDateMonthDay } from "@/lib/utils";



export const UserColumns: ColumnDef<UsersProfile>[] = [
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
    filterFn: isWithinRange as FilterFnOption<UsersProfile>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joined On
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
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Official Name" />
    ),
  },
  {
    accessorKey: "entity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entity" />
    ),
  },
  {
    accessorKey: "idNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Number" />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "identification",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Identification" />
    ),
    cell: ({ cell }) => {
      return (
        <button
          onClick={() => window.open(cell.row.original?.identification, '_blank')}
          className={`py-3 px-5 w-[120px] ${cell.row.original?.identification ? 'bg-[#218B531A] text-[#218B53]' : 'bg-gray-200 text-gray-700'} rounded-lg hover:font-semibold`}
          disabled={!cell.row.original?.identification}
        >
          View Document
        </button>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "ACTIONS",
    header: "Actions",
    cell: ({ cell }) => {
      return <UserActionDialog rowdata={cell} />;
    },
  },
];





const UserActionDialog = ({ rowdata }: any) => {
  const { data: session } = useSession();
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;

  const [openVerify, setOpenVerify] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showLoader, setShowloader] = useState(false);

  const handleVerifyAccount = async (id: string) => {
    console.log("starting verification")
    setShowloader(true)

    try {
      const res = await VerifyUserProfile(id, token);
      const response = await res?.json();
      console.log('verification', response);
      alert('User verified')
      setShowloader(false)
      setOpenVerify(false);
    } catch (error) {
      console.log("error verifying user", error)
      setShowloader(false)
      setOpenVerify(false);
      alert('Something went wrong try again')
    }
  }

  //handle reject user profile
  const handleRejectUserProfile = async (id: string) => {
    setShowloader(true)
    try {
      const res = await RejectUserProfile(id, token);
      if (res?.status === 200) {
        console.log("res rejecting user", res)
      }
      const response = await res?.json();
      console.log('rejection', response);
      alert('User Rejected')
      setShowloader(false)
      setOpenReject(false)
    } catch (error) {
      //load the error notification modal
      console.log("error rejecting user profile", error)
      setShowloader(false)
      setOpenReject(false)
      alert('Something went wrong try again')
    }
  }
  const handleDeleteUserProfile = async (id: string) => {
    setShowloader(true);
    try {
      const res = await DeleteUserProfile(id, token);
      if (res?.status !== 200) {
        console.log("res deleting user", res);
        const response = await res?.json();
        console.log('deletion', response);
      }
      setShowloader(false);
      setOpenDelete(false);
    } catch (error) {
      console.log("error deleting user profile", error);
      setShowloader(false);
      setOpenDelete(false);
      alert('Something went wrong, try again');
    }
  }

  return (
    <div className="flex">
      <Dialog open={openVerify} onOpenChange={setOpenVerify}>
        <DialogTrigger>
          <button className="py-3 mx-1 px-5 w-[120px] bg-[#218B53] text-white rounded-lg hover:font-semibold">
            Verify User
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              Are you sure you want to Verify this User
            </DialogTitle>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  handleVerifyAccount(rowdata?.row.original._id);
                }}
                className="flex items-center justify-center py-3 px-5 w-full bg-[#218B53] text-white hover:bg-[#218B53] hover:text-white rounded-lg hover:font-semibold"
              >
                Verify
                {showLoader && <Loader2 size={15} className="mx-1" />}
              </button>
              <button onClick={() => setOpenVerify(false)} className="py-3 px-5 mx-2 w-full bg-black text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold">
                Cancel
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openReject} onOpenChange={setOpenReject}>
        <DialogTrigger>
          <button className="py-3 px-5 w-[120px] bg-orange-500 text-white rounded-lg hover:font-semibold">
            Reject User
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              Are you sure you want to Reject this User
            </DialogTitle>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  handleRejectUserProfile(rowdata?.row.original._id);
                }}
                className="flex items-center justify-center py-3 px-5 w-full bg-red-500 text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold"
              >
                Reject
                {showLoader && <Loader2 size={15} className="mx-1" />}
              </button>
              <button onClick={() => setOpenReject(false)} className="py-3 px-5 mx-2 w-full bg-black text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold">
                Cancel
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger>
          <button className="mx-2 py-3 px-5 w-[120px] bg-red-500 text-white rounded-lg hover:font-semibold">
            Delete User
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              Are you sure you want to delete this User
            </DialogTitle>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  handleDeleteUserProfile(rowdata?.row.original.user);
                }}
                className="flex items-center justify-center py-3 px-5 w-full bg-red-500 text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold"
              >
                Delete
                {showLoader && <Loader2 size={15} className="mx-1" />}
              </button>
              <button onClick={() => setOpenReject(false)} className="py-3 px-5 mx-2 w-full bg-black text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold">
                Cancel
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

