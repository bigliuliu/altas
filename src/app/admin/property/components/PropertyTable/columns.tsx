import DashboardGeolocator from "@/components/dashboard/DashboardGeolocator";
import { DataTableColumnHeader } from "@/components/table/data-table-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Land } from "@/constants/png";
import { property } from "@/helpers/propertySource";
import { Property } from "@/types/api-types";
import { SealCheck } from "@phosphor-icons/react";
import { ColumnDef, FilterFnOption } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { ArrowUpDown, ExternalLink, FilePlus, Loader2, Loader2Icon, Trash } from "lucide-react";
import { convertToShortDateMonthDay, getCoordinatesFromLink } from "@/lib/utils";
import isWithinRange from "@/utils/date-range-filter";
import { convertBase64 } from "@/hooks/base64File";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

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
    filterFn: isWithinRange as FilterFnOption<Property>,
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
    accessorKey: "titleLR",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title No" />
    ),
  },
  {
    accessorKey: "propertyAlias",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alias" />
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
      <DataTableColumnHeader column={column} title="Registration Section" />
    ),
  },
  // {
  //   accessorKey: "blockNumber",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Block Number" />
  //   ),
  // },
  // {
  //   accessorKey: "parcelNumber",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Parcel Number" />
  //   ),
  // },
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
      return (
        <div className="flex">
          <DropDown cell={cell} />
          <button className="py-3 px-5 w-[120px] bg-[#218B531A] text-[#218B53] rounded-lg hover:font-semibold" onClick={() => window.open(cell.row.original?.propertyTitleDeed, '_blank')}>View Title</button>
          <VerifyProperty cell={cell} />
          <DeleteProperty cell={cell} />
        </div>
      );
    },
  },
];

const DropDown = ({ cell }: any) => {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;


  return (
    <main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button className="py-3 px-5 w-[120px] bg-[#218B531A] text-[#218B53] rounded-lg hover:font-semibold mx-1">
            View
          </button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-screen-md overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              Property {cell?.row?.original?.titleLR}
            </DialogTitle>
            <div className=" rounded-xl hover:cursor-pointer flex flex-col w-full">
              {cell?.row?.original.propertyImage ? (
                <Image
                  src={cell?.row?.original?.propertyImage}
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
                    {cell?.row?.original?.titleLR.toUpperCase()}<br />
                    <span className="text-sm">{cell?.row.original?.propertyAlias}</span>

                  </h4>
                  <span className="flex items-center ">
                    <SealCheck size={24} color="#398DEE" weight="fill" />
                    <h4 className="my-2 text-[#398DEE]">{cell?.row.original?.status}</h4>
                  </span>
                </div>
                <span className="flex justify-between items-center">
                  <h4 className=" mb-3">
                    <span className="font-semibold">
                      {cell?.row?.original?.sizeHa} Ha
                    </span>
                  </h4>
                </span>
                <span className="flex justify-start gap-2 items-center">
                  <h4 className=" mb-3">
                    <span className="font-semibold">
                      {cell?.row?.original?.leaseType ? cell.row.original.leaseType.charAt(0).toUpperCase() + cell?.row.original.leaseType.slice(1) : ''} /
                    </span>
                  </h4>
                  <p className=" mb-3">
                    <span className="font-semibold">
                      {cell?.row?.original?.userType ? cell.row.original.userType.charAt(0).toUpperCase() + cell?.row.original.userType.slice(1) : ''}
                    </span>{" "}
                  </p>
                </span>
                <span className="flex justify-start gap-2 items-center">
                  <h4 className=" mb-3">
                    <span className="font-semibold capitalize">
                      {cell?.row.original && cell?.row.original.acquistionType}
                      {cell?.row.original && cell?.row.original.acquistionType === 'commercial' ? ' ' + 'Purchase' : ''}  /
                    </span>
                  </h4>
                  <p className=" mb-3">
                    <span className="font-semibold">
                      {cell?.row.original?.acquisitionDate?.split(' ').slice(1).join(' ')}
                    </span>{" "}
                  </p>

                </span>
                <span className="flex justify-between items-center">
                  <h4 className=" mb-3">
                    <span className="font-semibold">
                      {cell?.row.original?.ownerName.toUpperCase()}
                    </span>
                  </h4>
                  <h4 className=" mb-3">
                    <span className="font-semibold">
                      {/* {propertyState?.ownerName} */}
                    </span>
                  </h4>
                </span>
                {cell?.row.original && cell?.row.original.status === 'verified' &&
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
              <DashboardGeolocator coordinates={[getCoordinatesFromLink(cell?.row.original?.propertyCoordinate)]} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main >
  );
};

const TitleView = ({ cell }: any) => {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;

  return (
    <main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button className="py-3 px-5 w-[120px] bg-[#218B531A] text-[#218B53] rounded-lg hover:font-semibold">
            View Title
          </button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              Title Deed for the Property {cell.row.original?.titleLR}
            </DialogTitle>
            <div className=" rounded-xl hover:cursor-pointer flex flex-col w-full">
              {cell.row.original.propertyTitleDeed ? (
                <Image
                  src={cell.row.original?.propertyTitleDeed}
                  alt=""
                  width={300}
                  height={250}
                  quality={100}
                  className="rounded-xl w-full h-96"
                />
              ) : (
                <Image src={Land} alt="" className=" rounded-xl " />
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};
const DeleteProperty = ({ cell }: any) => {
  const [open, setOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const { data: session } = useSession();
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      setShowLoader(true)
      const response = await fetch(`${AtlasBackendApi}/admin/properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Handle success response
        alert('Property deleted successfully');
        setShowLoader(false)
        window.location.reload()
        setOpen(false)
      } else {
        // Handle error response
        alert('Failed to delete property');
        setShowLoader(false)
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      setShowLoader(false)
    }
  };

  return (
    <main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant={'outline'} className="py-3 px-5 hover:bg-red-400 text-[#218B53] rounded-lg hover:font-semibold">
            <Trash />
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="mb-[20px]">
              Are you sure you want to delete this property?
            </DialogTitle>
            <div className=" rounded-xl hover:cursor-pointer flex flex-col w-full">
              {cell.row.original.propertyTitleDeed ? (
                <Image
                  src={cell.row.original?.propertyImage}
                  alt=""
                  width={150}
                  height={150}
                  quality={100}
                  className="rounded-xl w-full h-96"
                />
              ) : (
                <Image src={Land} alt="" className=" rounded-xl " />
              )}
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button className="hover:red-400 text-white flex items-center" onClick={() => handleDeleteProperty(cell.row.original._id)}>
              Delete
              {showLoader &&
                <Loader2Icon className="mx-2 animate-spin" size={15} />
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};




export function VerifyProperty({ cell }: any) {
  const { data: session } = useSession();
  const token = session?.user.accesstokens as unknown as string;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [showLoader, setShowLoader] = useState(false);
  const [closeDialog, setCloseDialog] = useState(false);
  const { toast } = useToast()
  const handleFileChange = (event:
    React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handlePropertyStatus = async (property_id: any, status: any) => {
    if (['waiting', 'processing'].includes(status)) {
      if (!selectedFile) {
        alert('Upload Land commision search results')
        return;
      }
    }
    let endpoint_url = `${AtlasBackendApi}/admin/verifyProperty`;

    if (status === 'verified') {
      endpoint_url = `${AtlasBackendApi}/admin/cancelVerification`
    }
    if (status === 'reject') {
      endpoint_url = `${AtlasBackendApi}/admin/rejectVerification`
    }
    setShowLoader(true)
    let attachment = null
    if (selectedFile) {
      attachment = await convertBase64(selectedFile)
    }
    const res = await fetch(endpoint_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        property_id: property_id,
        commision_search: attachment
      }),
      credentials: "omit",
    });
    if (!res.ok) {
      throw new Error("Failed to update property");
    }
    console.log(res.json());
    setShowLoader(false)
    setCloseDialog(false)
    toast({
      title: `Property status updated ✅`,
      description: "Refresh page to pull latest changes",
    })
    window.location.reload();
  }
  return (
    <Dialog open={closeDialog} onOpenChange={setCloseDialog}>
      <DialogTrigger asChild>
        <Button className={`mx-2 text-white ${['waiting', 'processing', 'rejected'].includes(cell.row.original?.status) ? 'bg-[#218B53]' : 'bg-red-400'} `}>
          {['waiting', 'processing', 'rejected'].includes(cell.row.original?.status) ? 'Verify Property' : 'Cancel Verification'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{['waiting', 'processing'].includes(cell.row.original?.status) ? 'Verify Property' : 'Cancel verification or Reject property'}</DialogTitle>
          <DialogDescription>
            Current status: {cell.row.original?.status}
          </DialogDescription>
        </DialogHeader>
        {/* <Label className="text-start flex">
          Property Title: {cell.row.original?.titleLR}
        </Label>
        <Label className="text-start flex">
          Property Alias: {cell.row.original?.propertyAlias}
        </Label> */}
        {['waiting', 'processing', 'rejected'].includes(cell.row.original?.status) &&
          <form>
            <h1 className="text-gray-600 text-sm py-4">Before verifying this property, Upload land commision search results</h1>
            <div>
              <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
            </div>
          </form>
        }
        <DialogFooter className="my-4">
          <Button onClick={() => handlePropertyStatus(cell.row.original?._id, cell.row.original?.status)} type="submit" className={`flex justify-center items-center ${['waiting', 'processing', 'rejected'].includes(cell.row.original?.status) ? 'bg-[#218B53] hover:bg-green-400' : 'bg-red-400 hover:bg-red-500'} px-6 mx-auto`}>
            {['waiting', 'processing', 'rejected'].includes(cell.row.original?.status) ? 'Verify Property' : 'Cancel Verification'}
            {showLoader && <Loader2 size={24} className="mx-2 animate-spin" />}
          </Button>
          <Button disabled={cell.row.original?.status === 'rejected'} variant={'outline'} onClick={() => handlePropertyStatus(cell.row.original?._id, 'reject')} type="submit" className={`flex justify-center items-center text-red-600 `}>
            Reject Property
            {showLoader && <Loader2 size={24} className="mx-2 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}