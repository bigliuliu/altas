"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import "../styles/style.css";
import { property } from "@/helpers/propertySource";
import Image, { StaticImageData } from "next/image";
import {
  ArrowsOut,
  Check,
  FilePlus,
  MapPin,
  Scales,
  SealCheck,
  SealQuestion,
  ShareFat,
} from "@phosphor-icons/react";
import { Land } from "@/constants/png";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RecipientCombobox } from "@/components/combobox/RecipientCombobox";
import { TitleNumberCombobox } from "@/components/combobox/TitleNumberCombobox";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/api-types";
import {
  TransferProperty,
  VerifyPropertyById_Public,
} from "@/config/APIConfig";
import { searchProperties } from "@/components/combobox/TitleSearch";
import { SearchedEmployee } from "@/components/combobox/Search";
import { convertBase64 } from "@/hooks/base64File";
import DashboardGeolocator from "@/components/dashboard/DashboardGeolocator";
import { generateCoordinatesArray, getCoordinatesFromLink } from "@/lib/utils";
import { AlignVerticalDistributeCenterIcon, BadgeCheck, ExternalLink, ExternalLinkIcon, Loader2 } from "lucide-react";
import performBilling from "@/lib/billing";
import { UserCircleCheck } from "@phosphor-icons/react/dist/ssr";


const AllProperties = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [inputText, setInputText] = useState("");
  const [open, setOpen] = useState(false);
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [propertyState, setPropertyState] = useState<Property>();
  const [value, setValue] = useState<searchProperties>(); //search for property title
  const [availableIdNumber, setAvailableIdNumber] =
    useState<SearchedEmployee>(); //search for id Number
  const [selectedFile, setSelectedFile] = useState<any>({});
  const [acquisitionType, setAcquisitionType] = useState<string>();
  const [selectedPropertyGeocode, setSelectedPropertyGeocode] = useState<any>({
    lat: -1.313333,
    lng: 36.7365,
  })
  const [showLoader, setShowLoader] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);
  const [accountCredits, setAccountCredits] = useState(0);

  const { data: session } = useSession();
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;
  const phoneNumber = session?.user.userdata.phoneNumber as string;

  console.log("token token", token);

  const verifyPropertyById = async (id: string) => {
    try {
      const res = await VerifyPropertyById_Public(id, token);
    } catch (error) {
      console.log("the error is", error);
    }
  };

  const handleClick = (property: any, action: string) => {
    setOpenVerifyDialog(false);
    handleBilling(property._id, action)
    alert('Verification Initiated. Once done Atlas will update you.')
  };


  const handleBilling = async (id: string, action: string) => {
    try {
      const billingData = billing.data?.filter((bill: any) => bill.billing_type === action)[0]
      console.log('billing selected', billingData)
      if (billingData.status === 'inactive') {
        if (action === 'VERIFY') {
          return verifyPropertyById(id as string);
        }
        return
      }
      if (billingData.amount > accountBalance && billingData.amount > accountCredits) {
        alert(`You have insufficient funds or credits to ${action}. Top up and try again`);
        return
      }
      const user_id = session?.user.userdata._id as string
      const billingResponse = await performBilling(action, billingData.amount, user_id);
      console.log("Billing response:", billingResponse);
      if (billingResponse.status === 400) {
        alert(billingResponse.message)
        return
      }
      if (action === 'VERIFY') {
        return verifyPropertyById(id as string);
      }
      return
    } catch (error) {
      console.error("Error processing billing:", error);
      alert('Please top up your account to proceed')
    }
  };

  const getAllProperties = async () => {
    const res = await fetch(`${AtlasBackendApi}/public/userProperties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "omit",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
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
  const { data, error, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
    enabled: !!token,
  });
  const { data: billing, error: billingFetchError, isLoading: billingFetchLoading } = useQuery({
    queryKey: ["billingRecords"],
    queryFn: fetchBillingRecords,

  });

  console.log("property data", data);
  console.log("billing data", billing);

  const filteredProperties = data
    ? data.filter((element: Property) => {
      if (inputText === "") {
        return true; // Return true if no input text is provided
      } else {
        return element.titleLR
          .toLowerCase()
          .includes(inputText.toLowerCase());
      }
    })
    : [];

  const handleSelectedProperty = (property: Property) => {
    setPropertyState(property);
    let coordinates = getCoordinatesFromLink(property.propertyCoordinate)
    console.log('Selected property coords', coordinates)
    setSelectedPropertyGeocode({
      lat: coordinates?.lat,
      lng: coordinates?.lng,
    })

  }

  //selected acquisition
  const handleSelectedValue = (selectedValue: string) => {
    setAcquisitionType(selectedValue);
  };

  //get file attchment for transfer
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;

    const base64 = await convertBase64(file);

    const inputName = event.target.name;
    setSelectedFile({ ...selectedFile, [inputName]: base64 });

  };

  //get current ate
  const getCurrentDate = (): string => {
    const currentDate = new Date();

    // Get day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();

    // Format as a string
    const dateString = `${day}/${month}/${year}`;

    console.log("Current date as a string:", dateString);
    return dateString;
  };

  //handle transfer
  const handleTransferProperty = async () => {
    try {
      setShowLoader(true)
      // Ensure all required fields are set
      if (selectedFile && propertyState && availableIdNumber && token) {
        console.log(
          "all data",
          selectedFile,
          propertyState,
          availableIdNumber,
          token,
        );
        // Get the current date
        const currentDate = getCurrentDate();

        await handleBilling(propertyState._id, 'TRANSFER')

        // Call the TransferProperty API function
        const res = await TransferProperty(
          propertyState?.titleLR,
          propertyState?.county,
          propertyState?.sizeHa,
          availableIdNumber.idNumber,
          selectedFile,
          token,
          currentDate,
          acquisitionType as string
        );
        const response = await res?.json();
        console.log("Property transfer initiated successful:", response);
        setShowLoader(false)
        setOpen(false); // Close the dialog or modal
        alert(response.message)
        window.location.reload();
      } else {
        setShowLoader(false)
        alert("Please set all required fields.");
      }
    } catch (error) {
      console.error("Error transferring property:", error);
      alert("Error transferring property");
      setShowLoader(false)
      setOpen(false);
    }
  };
  const getBillingAmount = (action: string) => {
    if (billing) {
      const filterbill = billing.data.filter((bill: any) => bill.billing_type === action)[0];
      if (filterbill.status === 'inactive') {
        return 0
      }
      return filterbill.amount;
    }
    return 0
  };

  const getUserWallet = async () => {
    let user_id: any = session?.user.userdata._id;
    if (!user_id) return
    const wallet = await fetch(`${AtlasBackendApi}/wallet/user/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!wallet.ok) {
      throw new Error(`HTTP error! status: ${wallet.status}`);
    }
    const data = await wallet.json();
    console.log(data);
    console.log('Wallet', data)
    setAccountBalance(data.balance)
    setAccountCredits(data.credits)
  }

  useEffect(() => {
    getUserWallet()
  },)

  return (
    <article className="">
      <div className="flex">
        <ul className="flex flex-col h-[600px] overflow-y-scroll w-[60%] ">
          {filteredProperties.map((element: Property, index: number) => {
            return (
              <article
                key={index}
                onClick={() => handleSelectedProperty(filteredProperties[index])}
                className={`${element._id === propertyState?._id ? 'bg-gray-200' : ''} w-full p-2 my-1 rounded-xl hover:cursor-pointer flex border border-gray-200 hover:shadow-2xl`}
              >
                <Image
                  src={element.propertyImage}
                  alt="" width={200} height={100}
                  className="rounded-xl max-w-[100px] max-h-[60px] bg-cover w-full h-96"
                />
                <div className="flex flex-col justify-around items-start mx-2 w-full">
                  <h4 className="font-bold">Property: {element.titleLR}</h4>
                  <span className="flex justify-between w-full">
                    <a href={element.propertyCoordinate} target="_blank" className="flex mr-[20px] hover:underline text-blue-600">
                      <MapPin size={24} className="text-blue-600" weight="bold" />
                      {element.county}
                    </a>
                    <h4 className="flex mr-[20px]">
                      {element.sizeHa}
                      Ha
                    </h4>
                    <h4 className="flex text-blue-400">
                      <SealCheck size={24} color="#398DEE" weight="fill" />
                      {element.status}
                    </h4>
                  </span>
                </div>
              </article>
            );
          })}
        </ul>
        <div className=" p-3 mx-2 rounded-xl hover:cursor-pointer flex flex-col border border-gray-200 hover:shadow-2xl w-[40%] ">
          {propertyState ? (
            <Image
              src={propertyState.propertyImage}
              alt=""
              width={300}
              height={150}
              className="rounded-xl w-full   h-96 "
            />
          ) : filteredProperties.length > 0 ? (
            <Image
              src={filteredProperties[0].propertyImage} // Set the image from the first filtered property
              alt=""
              width={300}
              height={150}
              className="rounded-xl w-full h-96 "
            />
          ) : (
            <Image src={Land} alt="" className=" rounded-xl " />
          )}
          <article className="p-3">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-xl">
                {propertyState?.titleLR.toUpperCase()}<br />
                <span className="text-sm">{propertyState?.propertyAlias}</span>

              </h4>
              <span className="flex items-center ">
                <SealCheck size={24} color="#398DEE" weight="fill" />
                <h4 className="my-2 text-[#398DEE]">{propertyState?.status}</h4>
              </span>
            </div>
            <span className="flex justify-between items-center">
              <h4 className=" mb-3">
                <span className="font-semibold">
                  {propertyState?.sizeHa} Ha
                </span>
              </h4>
            </span>
            <span className="flex justify-start gap-2 items-center">
              <h4 className=" mb-3">
                <span className="font-semibold">
                  {propertyState?.leaseType ? propertyState.leaseType.charAt(0).toUpperCase() + propertyState.leaseType.slice(1) : ''} /
                </span>
              </h4>
              <p className=" mb-3">
                <span className="font-semibold">
                  {propertyState?.userType ? propertyState.userType.charAt(0).toUpperCase() + propertyState.userType.slice(1) : ''}
                </span>{" "}
              </p>
            </span>
            <span className="flex justify-start gap-2 items-center">
              <h4 className=" mb-3">
                <span className="font-semibold capitalize">
                  {propertyState && propertyState.acquistionType}
                  {propertyState && propertyState.acquistionType === 'commercial' ? ' ' + 'Purchase' : ''}  /
                </span>
              </h4>
              <p className=" mb-3">
                <span className="font-semibold">
                  {propertyState?.acquisitionDate?.split(' ').slice(1).join(' ')}
                </span>{" "}
              </p>

            </span>
            <span className="flex justify-between items-center">
              <h4 className=" mb-3">
                <span className="font-semibold">
                  {propertyState?.ownerName.toUpperCase()}
                </span>
              </h4>
              <h4 className=" mb-3">
                <span className="font-semibold">
                  {/* {propertyState?.ownerName} */}
                </span>
              </h4>
            </span>
            {propertyState &&
              <div className="shadow-md p-4 bg-green-50 text-black">
                <h1 className="text-sm font-thin">Blockchain Data:</h1>
                <div className="italic ml-1 text-sm">
                  {propertyState.transactionUrl ?
                    <Link href={propertyState.transactionUrl}>View Blockchain Data </Link> :
                    <p>No data found</p>
                  }
                </div>
              </div>
            }
            <div className="flex justify-between">
              <Dialog
                open={openVerifyDialog}
                onOpenChange={setOpenVerifyDialog}
              >
                <DialogTrigger>
                  <button
                    disabled={!propertyState?.propertyTitleDeed}
                    className={`flex items-center m-2 py-2 px-2 border-2 rounded-lg font-semibold ${propertyState?.propertyTitleDeed
                      ? 'bg-white text-[#218B53] border-[#218B53] hover:bg-[#218B53] hover:text-white'
                      : 'bg-gray-200 text-gray-500 border-gray-200'
                      }`}
                  >
                    <SealQuestion size={24} className="" weight="bold" />
                    Verify
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Verify Property</DialogTitle>
                    <DialogDescription>
                      This process will initiate your property verification from
                      the Registrar
                    </DialogDescription>
                    {!propertyState?.propertyTitleDeed &&
                      <Link
                        href={`/public/updateProperty?title=${propertyState?.titleLR}`} className="text-red-400 font-bold mt-4">
                        Title is missing! Upload Title Deed
                      </Link>
                    }
                    <table className="w-full border border-black p-2">
                      <tr className=" border border-black p-2">
                        <th className=" border border-black p-2">
                          Title Number
                        </th>
                        <th className=" border border-black p-2 uppercase">
                          {/* LR NAKURU / MILIMANI / 3A / 15 */}
                          {propertyState?.titleLR}
                        </th>
                      </tr>
                      <tr className="border border-black p-2">
                        <th className=" border border-black p-2">
                          Property Alias
                        </th>
                        <th className=" border border-black p-2 uppercase">
                          {propertyState?.propertyAlias}
                        </th>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">
                          County / R. Section
                        </td>
                        <td className=" border border-black p-2 uppercase">
                          {/* NAKURU / MILIMANI */}
                          {propertyState?.county}/
                          {propertyState?.registrationSection}
                        </td>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">
                          Block No. / Parcel No.{" "}
                        </td>
                        <td className=" border border-black p-2 uppercase">
                          {propertyState?.blockNumber}/
                          {propertyState?.parcelNumber}
                        </td>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">Size (Ha) </td>
                        <td className=" border border-black p-2 uppercase">
                          {propertyState?.sizeHa}{" "}
                        </td>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">Title type</td>
                        <td className=" border border-black p-2 uppercase">
                          {/* LEASEHOLD */}
                          {propertyState?.leaseType}
                        </td>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">User Type</td>
                        <td className=" border border-black p-2 uppercase">
                          {/* RESIDENTIAL */}
                          {propertyState?.userType}
                        </td>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">
                          Geo-coordinates
                        </td>
                        <td className=" border border-black p-2">
                          <Link href={propertyState?.propertyCoordinate as string} className="underline text-blue-400 flex items-center" target="_blank">View on Map <ExternalLinkIcon size={12} className="mx-1" /></Link>
                        </td>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">
                          Encumbrances
                        </td>
                        <td className=" border border-black p-2 uppercase">
                          {propertyState?.encumbrance}
                        </td>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">Owner </td>
                        <td className=" border border-black p-2 uppercase">
                          {/* SAMIR PATEL */}
                          {propertyState?.ownerName}
                        </td>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">
                          Acquisition date
                        </td>
                        <td className=" border border-black p-2 uppercase">
                          {propertyState?.acquisitionDate}
                        </td>
                      </tr>
                      <tr className=" border border-black p-2">
                        <td className=" border border-black p-2">
                          Acquisition type{" "}
                        </td>
                        <td className=" border border-black p-2 uppercase">
                          {propertyState?.acquistionType}
                          {propertyState?.acquistionType === 'commercial' ? 'PURCHASE' : ''}
                          {propertyState?.acquistionType === 'community' ? 'ALlOTMENT' : ''}
                        </td>
                      </tr>
                    </table>
                    <h1>You will be charged a fee of Ksh {getBillingAmount('VERIFY')} to verify this property</h1>
                    <div className="flex w-full justify-between">
                      <button
                        disabled={propertyState?.status === 'verified' || propertyState?.status === 'processing' || !propertyState?.propertyTitleDeed}
                        onClick={() =>
                          handleClick(propertyState, 'VERIFY')
                        }
                        className={`${propertyState?.status === 'verified' || propertyState?.status === 'processing' ? 'bg-gray-200' : 'bg-[#218B53]'} py-3 px-5 w-full text-white  rounded-lg font-semibold`}
                      >
                        Verify Property?
                      </button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Link
                href={`/public/updateProperty?title=${propertyState?.titleLR}`}
                className="flex items-center m-2 py-2 px-2 bg-white text-[#218B53] border-2 border-[#218B53] rounded-lg font-semibold hover:bg-[#218B53] hover:text-white"
              >
                <FilePlus size={24} className="" weight="bold" />
                Update
              </Link>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <button
                    disabled={!propertyState?.propertyTitleDeed}
                    className={`flex items-center m-2 py-2 px-2 border-2 rounded-lg font-semibold ${propertyState?.propertyTitleDeed
                      ? 'bg-white text-[#218B53] border-[#218B53] hover:bg-[#218B53] hover:text-white'
                      : 'bg-gray-200 text-gray-500 border-gray-200'
                      }`}>
                    <ShareFat size={24} className="" weight="bold" />
                    Transfer
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="my-2">Transfer Property</DialogTitle>
                    <h1 className="my-2 italic">You will be charged a fee of Ksh {getBillingAmount('TRANSFER')} to transfer this property</h1>
                    <p className="text-xs">Transfer to:</p>
                    <RecipientCombobox setValue={setAvailableIdNumber} />
                    <br />
                    <Controller
                      name="acquistion"
                      control={control}
                      render={({ field }) => (
                        <Select
                          defaultValue="default"
                          onValueChange={(value) => {
                            field.onChange(value);
                            // Call a different function and pass the selected value as an argument
                            handleSelectedValue(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-[#A5A5A520] text-[#808195] outline-none m-1">
                            <SelectValue placeholder="Transfer Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                            <SelectItem value="default">
                              -- Transfer Type --
                            </SelectItem>
                            <SelectItem value="commercial">
                              Commercial
                            </SelectItem>
                            <SelectItem value="inheritance">
                              Inheritance
                            </SelectItem>
                            <SelectItem value="community">
                              Community Allocation
                            </SelectItem>
                            <SelectItem value="gift">Gift</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <br />
                    <article className="p-2 border border-dashed border-[#a5a5a5] flex flex-col items-start w-full rounded-md">
                      <h4 className="text-black text-sm w-full my-1">
                        Upload supporting document(s)
                      </h4>
                      <input
                        multiple
                        type="file"
                        id="myfile"
                        className="w-full"
                        name="attachment"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        required
                      />
                    </article>
                    <article className="p-2 border border-dashed border-[#a5a5a5] flex flex-col items-start w-full rounded-md">
                      <h4 className="text-black text-sm w-full my-1">
                        Upload new property title (If Available)
                      </h4>
                      <input
                        type="file"
                        id="myfile"
                        className="w-full"
                        name="title"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                      />
                    </article>
                    <br />
                    <div className="flex w-full justify-between">
                      <button
                        onClick={handleTransferProperty}
                        className="flex justify-center items-center py-3 px-5 w-full mx-1 text-white bg-[#218B53] rounded-lg font-semibold"
                      >
                        Transfer
                        {showLoader &&
                          <Loader2 size={15} className="mx-1 animate-spin" />
                        }
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className="py-3 px-5 w-full mx-1 text-white bg-red-500 rounded-lg font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            {propertyState && !propertyState?.propertyTitleDeed &&
              <Link
                href={`/public/updateProperty?title=${propertyState?.titleLR}`} className="text-red-400 font-bold mt-4">
                Title is missing! Upload Title
              </Link>
            }
          </article>
        </div >
      </div >
      <DashboardGeolocator coordinates={generateCoordinatesArray(filteredProperties)} />
    </article >
  );
};

export default AllProperties;
