"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardContainer from "@/container/DashboardContainer";
import { cn, convertBase64, getCurrentDateTime, parseDate } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown, LoaderIcon } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@lottiefiles/react-lottie-player";
import success from "../../../../public/json/success.json";
import errorJson from "../../../../public/json/error.json";
import { countiesSource } from "@/helpers/countiesSource";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from 'axios';
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";
import { Property as Properties } from "@/types/api-types";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import performBilling from "@/lib/billing";

const UpdateProperty = () => {
  const [ismotherTitleSizeValid, setIsMotherTitleSizeValid] = React.useState(true);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [date, setDate] = React.useState<Date>();
  const { data: session } = useSession();
  const searchParams = useSearchParams()
  const token = session?.user.accesstokens as unknown as string;
  const [open, setOpen] = React.useState(false)
  const [selectedMotherTitle, setMotherTitle] = React.useState("")
  const [propertyData, setPropertyData] = React.useState<Properties>(
    {
      _id: "",
      titleLR: "",
      propertyAlias: "",
      county: "",
      acquistionType: "",
      acquisitionDate: "",
      leaseType: "",
      userType: "",
      parcelNumber: "",
      blockNumber: "",
      registrationSection: "",
      ownerName: "",
      sizeHa: "",
      propertyCoordinate: "",
      propertyImage: "",
      propertyTitleDeed: "",
      encumbrance: "",
      landRateBalance: "",
      status: "",
      createdAt: "",
      motherTitle: ""
    }
  )

  const [accountBalance, setAccountBalance] = React.useState<number>(0);
  const [accountCredits, setAccountCredits] = React.useState<number>(0);
  const [showBillingLoader, setShowBillingLoader] = React.useState<boolean>(false);
  const { toast } = useToast()
  const [titleIsValid, setTitleIsValid] = React.useState(true);
  const [titleAliasIsValid, setTitleAliasIsValid] = React.useState(true);
  const [showUpdateLoader, setShowUpdateLoader] = React.useState(false);


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

  const { data: billing, error: billingFetchError, isLoading: billingFetchLoading } = useQuery({
    queryKey: ["billingRecords"],
    queryFn: fetchBillingRecords,

  });



  const getSearchBilling = () => {
    if (billing) {
      const filterbill = billing.data.filter((bill: any) => bill.billing_type === 'UPDATE')[0];
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

  const verifyMotherSize = (property: any) => {
    const inputSizeHa = parseFloat(propertyData.sizeHa);
    const propertySize = parseFloat(property.sizeHa);

    if (inputSizeHa > propertySize) {
      setIsMotherTitleSizeValid(false);
    } else {
      setIsMotherTitleSizeValid(true);
    }
    return
  };

  React.useEffect(() => {
    getUserWallet()
  })

  React.useEffect(() => {
    const fetchProperty = async () => {
      try {
        const titleLR = searchParams.get("title") || "";
        const encodedParameter = encodeURIComponent(titleLR);
        const fetchData = await axios.get(`${AtlasBackendApi}/public/searchProperty/${encodedParameter}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false
        });
        console.log("property info", fetchData);
        setPropertyData(fetchData.data.property);
        if (fetchData.data.property?.motherTitle?.length > 1) {
          setMotherTitle(fetchData.data.property.motherTitle)
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchProperty();
  }, [searchParams, token]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: propertyData });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setPropertyData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle billing for UPDATE billing type
  const handleBillingForUpdate = async () => {
    try {
      const billingData = billing.data?.filter((bill: any) => bill.billing_type === 'UPDATE')[0];
      console.log('billing selected', billingData);
      if (billingData.status === 'inactive') {
        return true; // No billing required if inactive
      }
      if (billingData.amount > accountBalance && billingData.amount > accountCredits) {
        setShowBillingLoader(false);
        toast({
          title: 'You have insufficient funds or credits to update. Top up and try again'
        });
        return false;
      }
      const user_id = session?.user.userdata._id as string;
      const billingResponse = await performBilling(billingData.billing_type, billingData.amount, user_id);
      console.log("Billing response:", billingResponse);
      if (billingResponse.status === 400) {
        alert(billingResponse.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error processing billing:", error);
      alert('Please top up your account to proceed');
      return false;
    }
  };

  // Usage in onSubmit
  const onSubmit = async (data: any) => {
    data.preventDefault();
    const updatedPropertyData = {
      ...propertyData,
      motherTitle: selectedMotherTitle
    };
    setPropertyData(updatedPropertyData);
    console.log('Updated property', updatedPropertyData);
    setShowUpdateLoader(true);

    const billingSuccess = await handleBillingForUpdate();
    if (!billingSuccess) {
      return;
    }

    try {
      const response = await axios.post(`${AtlasBackendApi}/public/updateProperty`, updatedPropertyData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "user-id": session?.user.userdata._id as string
        },
      });
      console.log("Property updated successfully:", response);
      setOpenSuccess(true);
      setShowUpdateLoader(false);
    } catch (error) {
      console.error("Error updating property:", error);
      setOpenError(true);
      setShowUpdateLoader(false);
    }
  };

  const getMyProperties = async () => {
    const res = await fetch(`${AtlasBackendApi}/public/allVerifiedProperties`, {
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
  const { data: properties, error: propertiesError, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: getMyProperties,
    enabled: !!token,
  });


  return (
    <DashboardContainer>
      <main className=" xl:mx-[100px] h-full">
        <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="mb-[20px]">
                Property Updated Successfully
              </DialogTitle>
              <Player
                keepLastFrame
                autoplay
                src={success}
                style={{ height: "300px", width: "300px" }}
              ></Player>
            </DialogHeader>
            <DialogClose>
              <Button variant={'outline'} onClick={() => window.location.href = '/public/properties'} className="w-full">
                Done
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Dialog open={openError} onOpenChange={setOpenError}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="mb-[20px]">
                Property Update Failed
              </DialogTitle>
              <Player
                keepLastFrame
                autoplay
                src={errorJson}
                style={{ height: "300px", width: "300px" }}
              ></Player>
            </DialogHeader>
            <DialogClose>
              <Button variant={'destructive'} className="w-full">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <div className="flex justify-start items-center">
          <Button variant={'outline'} className="-ml-14 mr-4" onClick={() => window.location.href = '/public/properties'}><ArrowLeft /></Button>
          <h4 className="text-[#218B53] text-lg font-semibold">
            Edit Property
          </h4>
        </div>
        <form
          onSubmit={onSubmit}
          encType="multipart/form-data"
          className="h-full flex flex-col justify-start"
        >
          <div className="flex justify-between pt-6">
            <div className="w-full md:w-1/2">
              <h1>Property Title</h1>
              <input
                onChange={handleInputChange}
                name="titleLR"
                value={propertyData?.titleLR}
                readOnly={propertyData?.status === 'verified'}
                type="text"
                className="p-3 uppercase rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195] mb-[30px]"
                placeholder="Title/LR no."
              />
            </div>
            <div className="w-full md:w-1/2 mx-1">
              <h1>Property Alias</h1>
              <input
                onChange={handleInputChange}
                name="propertyAlias"
                value={propertyData?.propertyAlias}
                type="text"
                className="p-3 uppercase rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195] mb-[30px]"
                placeholder="Property Alias"
              />
            </div>
          </div>
          <div className="w-full flex mb-[30px]">
            <span className="w-full md:w-1/2">
              <h1>County</h1>
              <Controller
                name="county"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue="default"
                    onValueChange={handleInputChange}
                    value={propertyData?.county || field.value}
                    disabled={propertyData && propertyData.status === 'verified'}
                  >
                    <SelectTrigger className="bg-[#A5A5A520] text-[#808195] border-2 border-[#218B53] p-3 outline-none m-1 rounded-none uppercase">
                      <SelectValue placeholder="County" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                      <SelectItem value={'default'}>-- Select County --</SelectItem>
                      {countiesSource.map((element, index) => {
                        return (
                          <SelectItem key={index} value={element.toUpperCase()}>
                            {element}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
            <span className="w-full md:w-1/2 mx-1">
              <h1>Registration section</h1>
              <input
                name="registrationSection"
                onChange={handleInputChange}
                value={propertyData?.registrationSection}
                readOnly={propertyData?.status === 'verified'}
                type="text"
                className="p-3 uppercase rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                placeholder="Registration Section"
              />
            </span>
          </div>
          <div className="w-full flex mb-[30px]">
            <span className="w-full md:w-1/2">
              <h1>Block Number</h1>
              <input
                name="blockNumber"
                onChange={handleInputChange}
                value={propertyData?.blockNumber}
                readOnly={propertyData?.status === 'verified'}
                type="text"
                className="p-3 uppercase rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                placeholder="Block number"
              />
            </span>
            <span className="w-full md:w-1/2 mx-1">
              <h1>Parcel Number</h1>
              <input
                name="parcelNumber"
                onChange={handleInputChange}
                value={propertyData?.parcelNumber}
                readOnly={propertyData?.status === 'verified'}
                type="text"
                className="p-3  rounded-lg border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                placeholder="Parcel Number"
              />
            </span>
          </div>
          <div className="w-full flex mb-[30px]">
            <span className="w-full md:w-1/2">
              <h1>Property size(Ha)</h1>
              <input
                name="sizeHa"
                onChange={handleInputChange}
                value={propertyData?.sizeHa}
                type="text"
                className="p-3 rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                placeholder="Size(Ha)"
              />
            </span>
            <span className="w-full md:w-1/2 mx-1">
              <h1>Owner Name</h1>
              <input
                name="ownerName"
                onChange={handleInputChange}
                value={propertyData?.ownerName}
                readOnly
                type="text"
                className="p-3 uppercase rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                placeholder="Owner Name(As Per ID)"
              />
            </span>
          </div>
          <div className="w-full flex mb-[30px]">
            <span className="w-full md:w-1/2">
              <h1>Title type</h1>
              <Controller
                name="leaseType"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue="default"
                    onValueChange={handleInputChange}
                    value={propertyData?.leaseType || field.value}
                    disabled={propertyData && propertyData.status === 'verified'}
                  >
                    <SelectTrigger className="bg-[#A5A5A520] uppercase text-[#808195] border-2 border-[#218B53] p-3 outline-none m-1 rounded-none">
                      <SelectValue placeholder="Title Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                      <SelectItem value="default">-- Title Type --</SelectItem>
                      <SelectItem value="freehold">Freehold Title</SelectItem>
                      <SelectItem value="leasehold">Leasehold Title</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
            <span className="w-full md:w-1/2">
              <h1>User type</h1>
              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue="default"
                    onValueChange={handleInputChange}
                    value={propertyData?.userType || field.value}
                    disabled={propertyData && propertyData.status === 'verified'}
                  >
                    <SelectTrigger className="w-full bg-[#A5A5A520] uppercase text-[#808195] outline-none m-1  border-2 border-[#218B53] p-3 rounded-none">
                      <SelectValue placeholder="User Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                      <SelectItem value="default">-- User Type --</SelectItem>
                      <SelectItem value="commercial">Commercial </SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
          </div>
          <div className="w-full flex mb-[30px]">
            <span className="w-full md:w-1/2">
              <h1>Acquisition Date</h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-[50px] justify-start text-left font-normal border-2 border-[#218B53] rounded-none",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {propertyData ? propertyData?.acquisitionDate : <span>Acquisition Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={parseDate(propertyData?.acquisitionDate) || date}
                    onSelect={setDate}
                    initialFocus
                    disabled={propertyData && propertyData.status === 'verified'}
                  />
                </PopoverContent>
              </Popover>
            </span>
            <span className="w-full md:w-1/2">
              <h1>Acquisition type</h1>
              <Controller
                name="acquistionType"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue="default"
                    onValueChange={handleInputChange}
                    value={propertyData?.acquistionType || field.value}
                    disabled={propertyData && propertyData.status === 'verified'}
                  >
                    <SelectTrigger className="w-full bg-[#A5A5A520] uppercase text-[#808195] outline-none m-1  border-2 border-[#218B53] p-3 rounded-none">
                      <SelectValue placeholder="Acquistion Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                      <SelectItem value="default">
                        -- Acquisition Type --
                      </SelectItem>
                      <SelectItem value="commercial">
                        Commercial purchase
                      </SelectItem>
                      <SelectItem value="inheritance ">Inheritance </SelectItem>
                      <SelectItem value="community">
                        Community allotment{" "}
                      </SelectItem>
                      <SelectItem value="leased">Government Lease</SelectItem>
                      <SelectItem value="gift">Gift</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
          </div>
          <div className="w-full flex mb-[30px]">
            <span className="w-full md:w-1/2">
              <h1>Encumbrances</h1>
              <Controller
                name="encumbrance"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={propertyData?.encumbrance || field.value}
                    onValueChange={field.onChange}
                    value={propertyData?.encumbrance || field.value}
                    disabled={propertyData && propertyData.status === 'verified'}
                  >
                    <SelectTrigger className="w-full bg-[#A5A5A520] uppercase text-[#808195] outline-none m-1  border-2 border-[#218B53] p-3 rounded-none">
                      <SelectValue placeholder="Encumbrances" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                      <SelectItem value="encumbrance">
                        -- Encumbrances --
                      </SelectItem>
                      <SelectItem value="mortgage">Mortgage</SelectItem>
                      <SelectItem value="caveat">Caveat</SelectItem>
                      <SelectItem value="caution">Caution</SelectItem>
                      <SelectItem value="charge">Charge</SelectItem>
                      <SelectItem value="none">Free</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
            <span className="w-full md:w-1/2 mx-1">
              <h1>Land rate balance</h1>
              <input
                {...register("landRateBalance", {
                  required: " This is required ",
                })}
                value={propertyData?.landRateBalance}
                readOnly={propertyData?.status === 'verified'}
                type="text"
                className="p-3 uppercase rounded-lg border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1"
                placeholder="Land Rate Balances"
              />
            </span>
          </div>
          <div className="flex flex-col mb-[30px]">
            <h1>Paste Google map link of the property location</h1>
            <input
              {...register("propertyCoordinate", {
                required: " This is required ",
              })}
              onChange={handleInputChange}
              value={propertyData?.propertyCoordinate}
              type="text"
              className="p-3 rounded-lg border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1"
              placeholder="Property Geo Coordinates"
            />
          </div>
          <div className="flex mb-[30px]">
            <article className="m-1 p-2 border-2 border-[#218B53] flex flex-col items-center justify-around w-full rounded-md text-center ">
              <h4 className="text-[#218B53] ">
                Upload a coloured copy of title deed
              </h4>

              <input
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    const base64 = await convertBase64(e.target.files[0]) as string;
                    setPropertyData((prevState) => ({
                      ...prevState,
                      propertyTitleDeed: base64,
                    }));
                  }
                }}
                // disabled={propertyData.status === 'verified'}
                type="file"
                id="myfile"
                className="bg-[#FB774A] text-white p-2 rounded-lg w-[300px]"
                name="propertyTitleDeed"
                accept="image/*,application/pdf"
              />
            </article>
            <article className="m-1 p-2 border-2 border-[#218B53] flex flex-col items-center justify-around w-full rounded-md text-center ">
              <h4 className="text-[#218B53]">
                Upload a coloured image of the property
              </h4>

              <input
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    const base64 = await convertBase64(e.target.files[0]) as string;
                    setPropertyData((prevState) => ({
                      ...prevState,
                      propertyImage: base64,
                    }));
                  }
                }}
                type="file"
                id="myfile"
                className="bg-[#FB774A] text-white p-2 rounded-lg w-[300px]"
                name="propertyImage"
                accept="image/*"
              />
            </article>
          </div>
          <div>
            <h1 className="">
              Select a mother title if any:
            </h1>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between uppercase"
                >
                  {selectedMotherTitle
                    ? selectedMotherTitle
                    : "Select Mother title..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[80vw] p-0">
                <Command>
                  <CommandInput name="motherTitle" placeholder="Search title..." />
                  <CommandList>
                    <CommandEmpty>No title found.</CommandEmpty>
                    <CommandGroup>
                      {properties && properties.map((prop: any) => (
                        <CommandItem
                          key={prop.titleLR}
                          value={prop.titleLR}
                          onSelect={(currentValue: string) => {
                            setMotherTitle(currentValue)
                            setOpen(false)
                            verifyMotherSize(prop)
                          }}
                        >
                          {prop.titleLR}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedMotherTitle === prop.titleLR ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {!ismotherTitleSizeValid &&
              <div className="text-red-600 font-bold uppercase my-4">
                Mother Title Property Size can not be smaller than child property!
              </div>
            }
          </div>
          <article className="flex mb-[30px] justify-between my-5">
            <div>
              <h4>Property will be Updated on:</h4>
              <h3 className="text-[#218B53] text-lg">
                {getCurrentDateTime()}
              </h3>
            </div>
            <div>
              <button
                type="submit"
                className="flex justify-center py-3 px-5 w-[200px] bg-[#218B531A] bg-[#218B53] text-white rounded-lg hover:font-semibold mx-1"
                disabled={showUpdateLoader}
              >
                {showUpdateLoader ? <LoaderIcon className=" mx-1 animate-spin" /> : "Update"}
              </button>
            </div>
          </article>
        </form>
      </main>
    </DashboardContainer>
  );
};

export default UpdateProperty;