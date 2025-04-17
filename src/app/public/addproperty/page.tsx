"use client";

import React, { FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { format, parse, isValid } from "date-fns";
// import { Player } from "@lottiefiles/react-lottie-player";
import dynamic from "next/dynamic";
import { ArrowLeft, Check, ChevronsUpDown, LoaderIcon } from "lucide-react";
import DashboardContainer from "@/container/DashboardContainer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Controller, useForm } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn, convertBase64, getCurrentDateTime } from "@/lib/utils";
import { EnlistPropert } from "@/config/APIConfig";
import { countiesSource } from "@/helpers/countiesSource";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import success from "../../../../public/json/success.json";
import error from "../../../../public/json/error.json";
import { verify } from "crypto";

// Helper function to parse and format a date
const parseAndFormatDate = (inputDate: string | Date, formats: string[]): string | null => {
  if (inputDate instanceof Date && !isNaN(inputDate.getTime())) {
    // If input is already a valid Date object
    return format(inputDate, "MM/dd/yyyy");
  }

  for (const formatStr of formats) {
    try {
      const parsedDate = parse(inputDate as string, formatStr, new Date());
      if (isValid(parsedDate)) {
        return format(parsedDate, "MM/dd/yyyy");
      }
    } catch {
      // Ignore parsing errors and continue with the next format
      continue;
    }
  }
  return null; // Return null if no valid format matches
};

const dateFormats: string[] = [
  "MM/dd/yyyy",        // US format
  "dd/MM/yyyy",        // European format
  "yyyy-MM-dd",        // ISO format without time
  "yyyy-MM-dd'T'HH:mm:ssX", // ISO format with time
];

const AddProperty = () => {
  const Player = dynamic(
    () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
    { ssr: false }
  );
  const [open, setOpen] = React.useState(false)
  const [selectedMotherTitle, setMotherTitle] = React.useState("")
  const [notification, setNotification] = React.useState<string>();
  const { data: session } = useSession();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [date, setDate] = React.useState<Date>();
  const currentDate = getCurrentDateTime();
  const [propertyGeoCode, setPropertyGeoCode] = React.useState({
    latitude: "",
    longitude: "",
  });
  const [showLoader, setShowLoader] = React.useState(false);
  const [titleIsValid, setTitleIsValid] = React.useState(true);
  const [titleAliasIsValid, setTitleAliasIsValid] = React.useState(true);
  const [ismotherTitleSizeValid, setIsMotherTitleSizeValid] = React.useState(true);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titleLR: "",
      propertyAlias: "",
      county: "",
      registrationSection: "",
      blockNumber: "",
      parcelNumber: "",
      sizeHa: "",
      ownerName: "",
      leaseType: "",
      userType: "",
      acquistionType: "",
      encumbrance: "",
      landRateBalance: "",
      propertyGeocoordinates: "",
      motherTitle: "",
      propertyImage: "",
      propertyTitleDeed: ""
    }
  });

  // Set ownerName when session is available
  useEffect(() => {
    if (session?.user?.userdata?.fullName) {
      setValue('ownerName', session.user.userdata.fullName);
    }
  }, [session, setValue]);

  const handleChange = (event: any) => {
    const location = event.target.value;

    const latLongRegex = /https:\/\/www\.google\.com\/maps\/place\/.*@(-?\d+\.\d+),(-?\d+\.\d+).*z/;
    const match = location.match(latLongRegex);

    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      setPropertyGeoCode({
        latitude: latitude.toString(),
        longitude: longitude.toString()
      });
    } else {
      setPropertyGeoCode({ latitude: "-", longitude: "-" });
    }
  };

  const isValidGoogleMapsUrl = (url: string) => {
    const pattern = /^(https:\/\/)?(www\.)?google\.[a-z]{2,3}\/maps\/place\/[^\s]+$/;
    return pattern.test(url);
  };

  const handleTitleValidation = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const enteredTitle = event.target.value;
      const encodedTitle = encodeURIComponent(enteredTitle);
      const res = await fetch(
        `${AtlasBackendApi}/public/checkPropertyTitle/${encodedTitle}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setTitleIsValid(data.valid);
    } catch (err) {
      console.error("Error validating title:", err);
    }
  };

  const handleAliasValidation = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const enteredAlias = event.target.value;
      const encodedAlias = encodeURIComponent(enteredAlias);
      const res = await fetch(
        `${AtlasBackendApi}/public/checkPropertyAlias/${encodedAlias}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setTitleAliasIsValid(data.valid);
    } catch (err) {
      console.error("Error validating alias:", err);
    }
  };

  const token = session?.user.accesstokens as unknown as string;

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

  const verifyMotherSize = (property: any) => {
    const inputSizeHa = parseFloat(getValues('sizeHa'));
    const propertySize = parseFloat(property.sizeHa);

    if (inputSizeHa > propertySize) {
      setIsMotherTitleSizeValid(false);
    } else {
      setIsMotherTitleSizeValid(true);
    }
    return
  };

  const onSubmit = async (data: any) => {
    setShowLoader(true);
    const userNumber = session?.user?.userdata?.phoneNumber as string;

    try {
      const propertyTitleDeedbase64 = (await convertBase64(
        data.propertyTitleDeed[0]
      )) as string;
      const propertyImageBase64 = (await convertBase64(
        data.propertyImage[0]
      )) as string;
      const acquistionDateString = date?.toDateString();

      const res = await EnlistPropert({
        phoneNumber: userNumber,
        titleLR: data.titleLR,
        propertyAlias: data.propertyAlias,
        county: data.county.toUpperCase(),
        registrationSection: data.registrationSection,
        blockNumber: data.blockNumber,
        parcelNumber: data.parcelNumber,
        sizeHa: data.sizeHa,
        ownerName: data.ownerName,
        leaseType: data.leaseType,
        acquistionType: data.acquistionType,
        encumbrance: data.encumbrance,
        landRateBalance: data.landRateBalance,
        propertyTitleDeed: propertyTitleDeedbase64,
        propertyImage: propertyImageBase64,
        userType: data.userType,
        acquisitionDate: acquistionDateString,
        propertyCoordinate: data.propertyGeocoordinates,
        motherTitle: data.motherTitle,
      });

      if (res?.status === 200) {
        setOpenSuccess(true);
        setShowLoader(false);
      }
      if (res?.status === 401) {
        setNotification("User not exists ");
        setOpenError(true);
        setShowLoader(false);
      }
      if (res?.status === 409) {
        setNotification("The property exists ");
        setOpenError(true);
        setShowLoader(false);
      }
      if (res?.status === 500) {
        setNotification("Try Another time ");
        setOpenError(true);
        setShowLoader(false);
      }
    } catch (err) {
      setNotification("Failed to enlist");
      setOpenError(true);
      setShowLoader(false);
    }
  };

  return (
    <DashboardContainer>
      <main className=" xl:mx-[100px] h-full">
        <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="mb-[20px]">
                Property Enlisted Successfully
              </DialogTitle>
              <Player
                keepLastFrame
                autoplay
                src={success}
                style={{ height: "300px", width: "300px" }}
              ></Player>
            </DialogHeader>
            <DialogClose>
              <Button onClick={() => window.location.href = '/public'}>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Dialog open={openError} onOpenChange={setOpenError}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="mb-[20px]">
                Property Enlisting Failed
              </DialogTitle>
              <Player
                keepLastFrame
                autoplay
                src={error}
                style={{ height: "300px", width: "300px" }}
              ></Player>
            </DialogHeader>
            <DialogClose>
              <Button>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <div className="flex justify-start items-center">
          <Button variant={'outline'} className="-ml-14 mr-4" onClick={() => window.location.href = '/public'}><ArrowLeft /></Button>
          <h4 className="text-[#218B53] text-lg font-semibold">
            Add Property
          </h4>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="h-full flex flex-col justify-start"
        >
          <div className="flex justify-between pt-6">
            <div className="w-full md:w-1/2 relative">
              <h1>Property Title</h1>
              <input
                {...register("titleLR", {
                  required: " This is required ",
                })}
                onBlur={(event) => handleTitleValidation(event)}
                type="text"
                className={`p-3 rounded-none border-2 ${!titleIsValid ? 'border-red-400' : 'border-[#218B53]'} bg-[#A5A5A520] w-full outline-none m-1 text-[#808195] mb-[30px]`}
                placeholder="Title/LR no."
              />
              {!titleIsValid &&
                <span className="absolute bottom-2 text-red-400 text-xs">This title Already exists. Try another or <a href="/public/search" className="underline">look it up</a></span>
              }
            </div>
            <div className="w-full md:w-1/2 mx-1 relative">
              <h1>Property Alias</h1>
              <input
                {...register("propertyAlias", {
                  required: " This is required ",
                })}
                onBlur={(event) => handleAliasValidation(event)}
                type="text"
                className={`p-3 rounded-none border-2 ${!titleAliasIsValid ? 'border-red-400' : 'border-[#218B53]'} bg-[#A5A5A520] w-full outline-none m-1 text-[#808195] mb-[30px]`}
                placeholder="Property Alias"
              />
              {!titleAliasIsValid &&
                <span className="absolute bottom-2 text-red-400 text-xs">This title Alias Already exists. Try another</span>
              }
            </div>
          </div>

          <div className="w-full flex mb-[30px]">
            <span className="w-full md:w-1/2">
              <h1>Select County</h1>
              <Controller
                name="county"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue="default"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="bg-[#A5A5A520] text-[#808195] border-2 border-[#218B53] p-3 outline-none m-1 rounded-none">
                      <SelectValue placeholder="County" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                      <SelectItem value="default">-- Select County --</SelectItem>
                      {countiesSource.map((element, index) => {
                        return (
                          <SelectItem key={index} value={element}>
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
              <h1>Registration Section</h1>
              <input
                {...register("registrationSection", {
                  required: " This is required ",
                })}
                type="text"
                className="p-3 rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                placeholder="Registration Section"
              />
            </span>
          </div>
          <div className="w-full flex mb-[30px]">
            <span className="w-full md:w-1/2">
              <h1>Block Number</h1>
              <input
                {...register("blockNumber", {
                  required: " This is required ",
                })}
                type="text"
                className="p-3 rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                placeholder="Block number"
              />
            </span>
            <span className="w-full md:w-1/2 mx-1">
              <h1>
                Parcel Number
              </h1>
              <input
                {...register("parcelNumber", {
                  required: " This is required ",
                })}
                type="text"
                className="p-3 rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                placeholder="Parcel Number"
              />
            </span>
          </div>
          <div className="w-full flex mb-[30px]">
            <span className="w-full md:w-1/2">
              <h1>Property Size</h1>
              <input
                {...register("sizeHa", {
                  required: " This is required ",
                })}
                type="text"
                className="p-3 rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
                placeholder="Size(Ha)"
              />
            </span>
            <span className="w-full md:w-1/2 mx-1">
              <h1>Owner Name</h1>
              <input
                {...register("ownerName", {
                  required: " This is required ",
                  value: session?.user.userdata.fullName
                })}
                readOnly
                type="text"
                className="p-3 rounded-nonw border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1 text-[#808195]"
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
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="bg-[#A5A5A520] text-[#808195] border-2 border-[#218B53] p-3 outline-none m-1 rounded-none">
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
            <span className="w-full md:w-1/2 mx-1">
              <h1>User type</h1>
              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue="default"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full bg-[#A5A5A520] text-[#808195] outline-none m-1  border-2 border-[#218B53] p-3 rounded-none">
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
              <h1>Acquisition date</h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-[50px] justify-start text-left font-normal border-2 border-[#218B53] rounded-nonediv",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      parseAndFormatDate(date, dateFormats) || <span>Invalid Date</span>
                    ) : (
                      <span>Acquisition Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </span>
            <span className="w-full md:w-1/2 mx-1">
              <h1>Acquisition type</h1>
              <Controller
                name="acquistionType"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue="default"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full bg-[#A5A5A520] text-[#808195] outline-none m-1  border-2 border-[#218B53] p-3 rounded-none">
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
                      <SelectItem value="government Lease">Government Lease</SelectItem>
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
                    defaultValue="encumbrance"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full bg-[#A5A5A520] text-[#808195] outline-none m-1  border-2 border-[#218B53] p-3 rounded-none">
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
                      <SelectItem value="none">None</SelectItem>
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
                type="text"
                className="p-3 rounded-none border-2 border-[#218B53] bg-[#A5A5A520] w-full outline-none m-1"
                placeholder="Land Rate Balances"
              />
            </span>
          </div>
          <div className="flex flex-col mb-[30px]">
            <h1>Paste Google map link of the property location</h1>
            <input
              {...register("propertyGeocoordinates", {
                required: " This is required ",
                validate: value => isValidGoogleMapsUrl(value) || "Invalid Google Maps URL"
              })}
              type="text"
              className={`mt-1 p-3 block w-full  outline-none m-1 border rounded-none border-2 ${errors.propertyGeocoordinates ? 'border-red-500' : 'border-[#218B53]'
                }`}
              placeholder="Paste Property Location Link"
              onChange={handleChange}
            />
            <span className="ml-4 text-xs font-italic text-[#218B53]">Lat: {propertyGeoCode.latitude} Long: {propertyGeoCode.longitude}</span>
            {errors.propertyGeocoordinates && (
              <span className="text-red-500">{errors.propertyGeocoordinates.message as string}</span>
            )}
          </div>
          <div className="flex mb-[30px]">
            <article className="m-1 p-2 border-2 border-[#218B53] flex flex-col items-center justify-around w-full  text-center ">
              <h4 className="text-[#218B53] ">
                Upload a coloured copy of the title deed
              </h4>

              <input
                {...register("propertyTitleDeed", {
                  required: " This is required ",
                })}
                type="file"
                id="myfile"
                accept="image/*,application/pdf"
                className="bg-[#FB774A] text-white p-2 rounded-none w-[300px]"
                name="propertyTitleDeed"
              />
            </article>
            <article className="m-1 p-2 border-2 border-[#218B53] flex flex-col items-center justify-around w-full text-center ">
              <h4 className="text-[#218B53]">
                Upload a coloured image of the property
              </h4>

              <input
                {...register("propertyImage", {
                  required: " This is required ",
                })}
                type="file"
                id="myfile"
                accept="image/*"
                className="bg-[#FB774A] text-white p-2 rounded-none w-[300px]"
                name="propertyImage"
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
            {/* <Controller
              name="motherTitle"
              control={control}
              render={({ field }) => (
                <Select
                  defaultValue="none"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full bg-[#A5A5A520] text-[#808195] outline-none m-1  border-2 border-[#218B53] p-3 rounded-none">
                    <SelectValue placeholder="properties" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                    <SelectItem value="none">
                      -- Select from your properties --
                    </SelectItem>
                    {properties && properties.map((prop: any) => (
                      <SelectItem key={prop._id} value={prop.titleLR}>{prop.titleLR}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            /> */}
          </div>

          <article className="flex mb-[30px] justify-between my-5">
            <div>
              <h4>Property will be listed on:</h4>
              <h3 className="text-[#218B53] text-lg">
                {currentDate}
              </h3>
            </div>
            <div>
              <button
                type="submit"
                className="flex items-center py-3 px-5 w-[200px] bg-[#218B531A] bg-[#218B53] text-white rounded-lg hover:font-semibold mx-1"
              >
                Add Property
                {showLoader && (
                  <LoaderIcon size={15} className="mx-1 animate-spin" />
                )}
              </button>
            </div>
          </article>
        </form>
      </main>
    </DashboardContainer>
  );
};

export default AddProperty;