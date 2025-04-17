"use client";

import DashboardGeolocator from "@/components/dashboard/DashboardGeolocator";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
// import SearchResult from "../../../../public/pdf/Atlas-Search-Result.xlsx";
import lottie from "../../../../public/json/success.json";
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
import { Land } from "@/constants/png";
import DashboardContainer from "@/container/DashboardContainer";
import {
  DotsThreeOutlineVertical,
  MapPin,
  SealCheck,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RecipientCombobox } from "@/components/combobox/RecipientCombobox";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AtlasLogoAlt2 } from "@/constants/svg";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";
import { Property as Properties } from "@/types/api-types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ExternalLinkIcon, Library, Loader2, LoaderIcon, SaveAllIcon, SpeechIcon } from "lucide-react";
import { convertBase64, generateCoordinatesArray } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TransferTimeline from "./transfer-timeline";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast";
import { generateAndZipDocuments } from "@/lib/search-results";
import TitleHistory from "./title-history";


interface SearchData {
  commission: any;
  property: Properties;
  transfers: any;
  disputes: any;
  encumbrances: any;
  blockchainData: any;
  titleHistory: any;
}

const Property = () => {
  const searchParams = useSearchParams()
  const [inputText, setInputText] = useState("");
  console.log("Count is County", searchParams.get("title"))

  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openTransferSuccess, setOpenTransferSuccess] = useState(false);
  const [openEncumbrance, setOpenEncumbrance] = useState(false);
  const [openWithdrawEncumbrance, setOpenWithdrawEncumbrance] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showEncumbraceLoader, setShowEncumbraceLoader] = useState(false);
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm();

  const {
    register: registerEncumbrace,
    handleSubmit: handleEncumbrance,
    control: formControl,
    reset: encumbranceReset
  } = useForm();

  function getTimeInAmPmFormat() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes: any = currentTime.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 12 AM/PM should be represented as 12, not 0

    // Add leading zero to minutes if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${amOrPm}`;
  }
  function getFirstTwoWords(str: string | undefined): string {
    // Split the string by "/"
    if (!str) {
      return ""; // or any default value you prefer
    }
    const parts = str.split("/");

    // Get the first two words and join them with "/"
    const firstTwoWords = parts.slice(0, 2).map(word => word.trim()).join("/");

    return firstTwoWords;
  }

  const { data: session } = useSession();
  const token = session?.user.accesstokens as unknown as string;

  console.log("token token", token);

  const searchProperty = async () => {
    try {
      const titleLR = searchParams.get("title") || "";
      const encodedParameter = encodeURIComponent(titleLR);
      const response = await axios.get(`${AtlasBackendApi}/public/searchProperty/${encodedParameter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false
        }
      );
      console.log("response search", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw new Error("Failed to fetch search results");
    }
  };
  const fetchBillingRecords = async () => {
    try {
      const res = await fetch(`${AtlasBackendApi}/wallet/billing`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch billing records");
      }
      return res.json();
    } catch (error) {
      console.error("Error fetching billing records:", error);
    }
  };


  const { data, error, isLoading } = useQuery<SearchData>({
    queryKey: ["searchProperties"],
    queryFn: searchProperty,
    enabled: !!token,
  });
  const { data: billing, error: billingFetchError, isLoading: billingFetchLoading } = useQuery({
    queryKey: ["billingRecords"],
    queryFn: fetchBillingRecords,

  });
  const getBillingFee = (billing_type: string) => {
    if (billing) {
      const filterbill = billing.data.filter((bill: any) => bill.billing_type === billing_type)[0];
      if (filterbill.status === 'inactive') {
        return 0
      }
      return filterbill.amount;
    }
    return 0
  };
  const handleDownloadReport = async () => {
    await generateAndZipDocuments(data, session?.user.userdata.fullName)
  };

  const handleSaveSearch = async () => {
    try {
      const searchDetails = {
        propertyId: data?.property._id,
        propertyTitle: data?.property.titleLR,
        propertyOwner: data?.property.ownerName,
        propertyImage: data?.property.propertyImage,
        propertyCoordinate: data?.property.propertyCoordinate
      };

      const response = await axios.post(`${AtlasBackendApi}/public/saveSearch`, searchDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Search saved successfully:", response.data);
      alert("Search saved successfully!");
    } catch (error) {
      console.error("Error saving search:", error);
      alert("Property already saved!");
    }
  };

  const onSubmitEncumbrace = async (fData: any) => {
    setShowEncumbraceLoader(true)
    const encumb = {
      user: session?.user.userdata._id as string,
      propertyId: data?.property._id as string,
      context: fData.encumbrace_context,
      nature: fData.encumbrace_nature,
      attachment: await convertBase64(fData.encumbrace_attachment[0])
    }
    console.log('Encumbrace form', encumb)
    try {
      const response = await axios.post(`${AtlasBackendApi}/public/encumbrances`, encumb, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Encumbrance created successfully:", response.data);
      toast({ description: "Encumbrance created successfully!" });
    } catch (error) {
      console.error("Error creating Encumbrance:", error);
      toast({ variant: "destructive", description: "Failed to create Encumbrance. Please try again." });
    } finally {
      setShowEncumbraceLoader(false);
      setOpenEncumbrance(false)
      reset()
    }
  }

  const onSubmit = async (fData: any) => {
    setShowLoader(true)
    const dispute = {
      user: session?.user.userdata._id as string,
      propertyId: data?.property._id as string,
      context: fData.dispute_context,
      nature: fData.dispute_nature,
      attachment: await convertBase64(fData.dispute_attachment[0])
    }
    console.log('Dispute form', dispute)
    try {
      const response = await axios.post(`${AtlasBackendApi}/public/disputes`, dispute, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Dispute created successfully:", response.data);
      toast({ description: "Dispute created successfully!" });
    } catch (error) {
      console.error("Error creating dispute:", error);
      toast({ variant: "destructive", description: "Failed to create dispute. Please try again." });
    } finally {
      setShowLoader(false);
      setOpen(false)
      reset()
    }
  }


  return (
    <DashboardContainer>
      <>
        <main className="flex m-3 rounded-lg p-3 bg-white shadow-md">
          <article className="w-[60%] p-2">
            <div className="flex justify-center">
              <Image src={AtlasLogoAlt2} alt="" className=" w-[150px] mb-2" />
            </div>
            <table className="w-full border border-black p-2 uppercase">
              <tr className=" border border-black p-2">
                <th className=" border border-black p-2 text-left">
                  Title Number
                </th>
                <th className=" border border-black p-2 text-left uppercase">
                  {data?.property.titleLR}
                </th>
              </tr>
              <tr className=" border border-black p-2">
                <th className=" border border-black p-2 text-left">
                  Property Alias
                </th>
                <th className=" border border-black p-2 text-left uppercase">
                  {data?.property.propertyAlias}
                </th>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">County / R. Section</td>
                <td className=" border border-black p-2 uppercase">{data?.property.county + "/" + data?.property.registrationSection}</td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">
                  Block No. / Parcel No.{" "}
                </td>
                <td className=" border border-black p-2 uppercase">{data?.property.blockNumber} / {data?.property.parcelNumber}</td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">Size </td>
                <td className=" border border-black p-2 uppercase">{data?.property.sizeHa} HA </td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">Title type</td>
                <td className=" border border-black p-2 uppercase">{data?.property.leaseType}</td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">
                  User type {" "}
                </td>
                <td className=" border border-black p-2 uppercase">{data?.property.userType}</td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">Geo-coordinates</td>
                <td className=" border border-black p-2">
                  <Link href={data?.property.propertyCoordinate as string || ''} className="underline text-blue-400 flex items-center" target="_blank">View on Map <ExternalLinkIcon size={12} className="mx-1" /></Link>
                </td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">Encumbrances</td>
                <td className=" border border-black p-2 uppercase">{data?.property.encumbrance}</td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">Owner </td>
                <td className=" border border-black p-2 uppercase">{data?.property.ownerName}</td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">Acquisition date</td>
                <td className=" border border-black p-2 uppercase">{data?.property.acquisitionDate}</td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">Acquisition type </td>
                <td className=" border border-black p-2 uppercase">
                  {data?.property.acquistionType}
                  {data?.property.acquistionType === 'commercial' ? ' purchase' : ''}
                  {data?.property.acquistionType === 'allotment' ? ' allotment' : ''}
                </td>
              </tr>
              <tr className=" border border-black p-2">
                <td className=" border border-black p-2">Blockchain contract hash</td>
                <td className=" border border-black p-2 uppercase">
                  {data?.property?.transactionUrl &&
                    <Link href={data?.property?.transactionUrl || ''} target="_blank" className="underline text-blue-400 flex items-center group">View Transaction Details <ExternalLinkIcon size={12} className="mx-1 group-hover:cursor-progress" /></Link>
                  }
                </td>
              </tr>
            </table>
            <div className="my-5">
              <h4 className="text-base">Search time: {getTimeInAmPmFormat()} </h4>
            </div>
            <div className="flex">
              <button
                onClick={handleDownloadReport}
                className=" py-2 px-3 w-auto mx-1 bg-[#218B53] text-white rounded-lg "
              >
                Download Search Result
              </button>
              <a href={data?.property.propertyTitleDeed} target="_blank" className=" py-2 px-3 w-auto mx-1  bg-[#218B53] text-white rounded-lg ">
                View Title Deed
              </a>
              {data?.commission?.length > 0 &&
                <a href={data?.commission[0].attachment} target="_blank" className="flex items-center py-2 px-3 w-auto mx-1 bg-[#218B53] text-white rounded-lg ">
                  View Registry Search
                </a>
              }
            </div>
            <div className="my-4 rounded-md border-l-4 border-red-600 bg-[#218B531A] p-4 font-bold">
              <strong className="text-red-600 flex text-black items-center"><SaveAllIcon size={20} className="mx-2" /> Save this Search</strong>
              <p className="p-2 italic">Saved search can be viewed under Saved Search later at no cost.</p>
              <Button onClick={() => handleSaveSearch()} variant={'outline'} className="m-2 text-white hover:text-white bg-red-600 hover:bg-red-500"> Save this Search</Button>
            </div>

          </article>
          <article className="w-[40%] p-2">
            <div className="flex justify-between">
              <h3 className="text-2xl font-semibold">
                {data?.property.titleLR}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DotsThreeOutlineVertical size={24} color="#080808" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Property Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setOpen(true)}>
                    Raise a Dispute
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setOpenEncumbrance(true)}>
                    Place Encumbrance
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                  onSelect={() => setOpenWithdrawEncumbrance(true)}
                >
                  Withdraw Encumbrance
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => router.replace("/public/audit")}
                >
                  Audit Property
                </DropdownMenuItem> */}
                  {/* <DropdownMenuItem
                  onSelect={() => router.replace("/public/updateProperty")}
                >
                  Update Property
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setOpenTransfer(true)}>
                  Transfer Property
                </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="mb-[20px]">
                      Raising a Dispute on property <strong> {data?.property.titleLR} </strong>
                    </DialogTitle>
                    <DialogDescription className="my-4">
                      You will be Charged ksh {getBillingFee('DISPUTE')} to raise this Dispute
                    </DialogDescription>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      encType="multipart/form-data"
                      className="h-full flex flex-col justify-start"
                    >
                      <div>
                        <label htmlFor="title" className="text-sm">
                          Nature of Dispute
                        </label>
                        <Controller
                          name="dispute_nature"
                          control={control}
                          render={({ field }) => (
                            <Select
                              defaultValue="ownerDispute"
                              onValueChange={field.onChange}
                              value={field.value}
                              required
                            >
                              <SelectTrigger className="w-full bg-[#A5A5A520] outline-none m-1">
                                <SelectValue placeholder="Disputes" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                                <SelectItem value="ownerDispute">
                                  Dispute Owner
                                </SelectItem>
                                <SelectItem value="otherDispute">
                                  Dispute Size / Other particulars{" "}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      <div>
                        <label htmlFor="title" className="text-sm">
                          Dispute context:
                        </label>
                        <textarea
                          rows={7}
                          {...register("dispute_context", {
                            required: " This is required ",
                          })}
                          className="my-2 p-2 w-full rounded-lg outline-none border-2 border-gray-200 text-left"
                          placeholder="Enter Dispute Context ...."
                          required
                        />
                        <div className="m-2">
                          <h4 className="text-[#218B53]">
                            Upload supporting Documents (if any) Here
                          </h4>
                          <input
                            multiple
                            type="file"
                            accept="application/pdf,image/*"
                            {...register("dispute_attachment", {
                              required: " This is required ",
                            })}
                            className="bg-[#FB774A] text-white p-2 rounded-lg w-full"
                            required
                          />
                        </div>
                      </div>
                      <button
                        className="flex items-center justify-center py-3 px-5 w-full bg-[#218B53] text-white hover:bg-[#256f48] hover:text-white rounded-lg hover:font-semibold"
                      >
                        Continue
                        {showLoader &&
                          <LoaderIcon size={15} className="mx-1 animate-spin" />
                        }
                      </button>
                    </form>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog open={openTransfer} onOpenChange={setOpenTransfer}>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="mb-[20px]">
                      Transfer Property
                    </DialogTitle>
                    <DialogDescription className="h-[50px]">
                      You will be Charged 5ksh to raise this Transfer
                    </DialogDescription>
                    <RecipientCombobox />
                    <button
                      onClick={() => {
                        setOpenTransfer(false);
                        setOpenTransferSuccess(true);
                      }}
                      className="py-3 px-5 w-full bg-[#218B53] text-white hover:bg-[#256f48] hover:text-white rounded-lg hover:font-semibold"
                    >
                      Continue
                    </button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog
                open={openTransferSuccess}
                onOpenChange={setOpenTransferSuccess}
              >
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="mb-[20px]">
                      Property Transferred Successfully
                    </DialogTitle>
                    <DialogDescription>
                      {" "}
                      Property transfer underway
                    </DialogDescription>
                    <Player
                      keepLastFrame
                      autoplay
                      src={lottie}
                      style={{ height: "300px", width: "300px" }}
                    ></Player>
                    <button
                      className="flex items-center m-2 py-2 px-2 bg-white text-[#218B53] border-2 border-[#218B53] rounded-lg font-semibold hover:bg-[#218B53] hover:text-white"
                      onClick={() => setOpenTransferSuccess(false)}
                    >
                      Done
                    </button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog open={openEncumbrance} onOpenChange={setOpenEncumbrance}>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="mb-[20px]">
                      Raising an Encumbrance on property: <br />
                      <strong className="my-1">{data?.property.titleLR}</strong>
                    </DialogTitle>
                    <DialogDescription className="h-[50px]">
                      You will be Charged Ksh {getBillingFee('ENCUMBRANCES')} to raise this Encumbrance
                    </DialogDescription>
                    <form
                      onSubmit={handleEncumbrance(onSubmitEncumbrace)}
                      encType="multipart/form-data"
                      className="h-full flex flex-col justify-start"
                    >
                      <div>
                        <label htmlFor="title" className="text-sm">
                          Nature of Encumbrance:
                        </label>
                        <Controller
                          name="encumbrace_nature"
                          control={formControl}
                          render={({ field }) => (
                            <Select
                              defaultValue="caution"
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full bg-[#A5A5A520] outline-none m-1">
                                <SelectValue placeholder="Select Nature of Encumbrance" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                                <SelectItem value="caution">Caution</SelectItem>
                                <SelectItem value="caveat">Caveat</SelectItem>
                                <SelectItem value="mortagage">
                                  Mortgage charge
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      <div>
                        <label htmlFor="title" className="text-sm">
                          Encumbrace context:
                        </label>
                        <textarea
                          rows={7}
                          className="my-2 p-2 w-full rounded-lg outline-none border-2 border-gray-200 text-left"
                          placeholder="Enter Reason behind raising of encumbrance ...."
                          {...registerEncumbrace("encumbrace_context", {
                            required: " This is required ",
                          })}
                        />
                        <div className="m-2">
                          <h4 className="text-[#218B53]">
                            ( Optional ) Upload Your Support Document Here
                          </h4>
                          <input
                            multiple
                            type="file"
                            id="myfile"
                            className="bg-[#FB774A] text-white p-2 rounded-lg w-full"
                            accept="application/pdf,image/*"
                            {...registerEncumbrace("encumbrace_attachment", {
                              required: " This is required ",
                            })}
                          />
                        </div>
                      </div>
                      <button className="flex items-center justify-center py-3 px-5 w-full bg-[#218B53] text-white hover:bg-[#256f48] hover:text-white rounded-lg hover:font-semibold">
                        Continue
                        {showEncumbraceLoader && <LoaderIcon size={24} className="mx-2 animate-spin" />}
                      </button>
                    </form>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog
                open={openWithdrawEncumbrance}
                onOpenChange={setOpenWithdrawEncumbrance}
              >
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="mb-[20px]">
                      Withdrawing an Encumbrance will be billed from your Account
                    </DialogTitle>
                    <DialogDescription className="h-[50px]">
                      You will be Charged 5ksh to withdraw this Encumbrance
                    </DialogDescription>
                    <div>
                      <label htmlFor="title" className="text-sm">
                        LR Number (Title Number){" "}
                      </label>
                      <input
                        id="title"
                        type="text"
                        className="p-3 rounded-lg border-2 border-[#a5a5a538] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                        placeholder="Parcel number"
                      />
                    </div>
                    <div>
                      <label htmlFor="title" className="text-sm">
                        Nature of Encumbrance:
                      </label>
                      <Controller
                        name="disputes"
                        control={control}
                        render={({ field }) => (
                          <Select
                            defaultValue="caution"
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full bg-[#A5A5A520] outline-none m-1">
                              <SelectValue placeholder="Select Nature of Encumbrance" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                              <SelectItem value="caution">Caution</SelectItem>
                              <SelectItem value="caveat">Caveat</SelectItem>
                              <SelectItem value="mortagage">
                                Mortgage charge
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div>
                      <label htmlFor="title" className="text-sm">
                        Party withdrawing the Encumbrance:
                      </label>
                      <input
                        id="title"
                        type="text"
                        className="p-3 rounded-lg border-2 border-[#a5a5a538] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                        placeholder="Name"
                      />
                      <input
                        id="title"
                        type="text"
                        className="p-3 rounded-lg border-2 border-[#a5a5a538] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                        placeholder="ID Number "
                      />
                      <input
                        id="title"
                        type="text"
                        className="p-3 rounded-lg border-2 border-[#a5a5a538] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                        placeholder="Phone Number"
                      />
                      <input
                        id="title"
                        type="text"
                        className="p-3 rounded-lg border-2 border-[#a5a5a538] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                        placeholder="Connection with Property (Buyer, Family, Lender)"
                      />
                      <input
                        type="textarea"
                        className="my-2 p-2 h-[50px] w-full rounded-lg outline-none border-2 border-gray-200 text-left"
                        placeholder="Enter Reason behind withdrawal of encumbrance ...."
                      />
                      <div className="m-2">
                        <h4 className="text-[#218B53]">
                          ( Optional ) Upload Your Support Document Here
                        </h4>
                        <input
                          type="file"
                          id="myfile"
                          className="bg-[#FB774A] text-white p-2 rounded-lg w-full"
                          name="Browse"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          setOpenEncumbrance(false);
                        }}
                        className="py-3 px-5 w-full bg-[#218B53] text-white hover:bg-[#256f48] hover:text-white rounded-lg hover:font-semibold"
                      >
                        Continue
                      </button>
                      {/* <button className="py-3 px-5 mx-2 w-full bg-black text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold">
                      Cancel
                    </button> */}
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

            </div>
            <div className="flex my-3">
              <span className="flex justify-center items-center mx-2">
                <MapPin size={20} className="text-green-400" weight="bold" />
                <h5 className="mx-1 text-xs">{data?.property.county}</h5>
              </span>
              <span className="flex justify-center items-center mx-2">
                <SealCheck size={20} className="text-green-400" weight="bold" />
                <h5 className="mx-1 text-xs">{data?.property.status}</h5>
              </span>
              <span className="flex justify-center items-center mx-2">
                <SpeechIcon size={20} className="text-red-400" />
                <h5 className="mx-1 text-xs">Disputes({data?.disputes?.length})</h5>
              </span>
              <span className="flex justify-center items-center mx-2">
                <Library size={20} className="text-red-400" />
                <h5 className="mx-1 text-xs">Encumbrance({data?.encumbrances?.length})</h5>
              </span>
            </div>
            <Image src={data?.property.propertyImage || Land} alt="" width="0" height="0" sizes="100vw" style={{ width: '100%', height: 'auto' }} className="rounded-xl auto-width " />

            {data && <DashboardGeolocator coordinates={generateCoordinatesArray([data?.property])} />}
          </article>
        </main>
        <div className="p-2 bg-white  grid grid-cols-2 gap-4">
          <div className="bg-[#218B531A] p-4">
            <h3 className="font-semibold mb-2 text-lg py-2 underline">Title History</h3>
            {data?.property?.motherTitle ? (
              <TitleHistory history={data?.titleHistory} />
            ) : (
              <p>This is the mother title</p>
            )}
          </div>
          <div className="bg-[#218B531A] p-4">
            <h3 className="font-semibold mb-2 text-lg py-2 underline">Transfer History</h3>
            <TransferTimeline history={data?.transfers} property={data?.property} />
          </div>
        </div>
      </>
    </DashboardContainer>
  );
};

export default Property;
