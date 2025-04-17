"use client";

import { User } from "@/constants/svg";
import { GlobalType, useAppContext } from "@/context/AppContext";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { convertBase64 } from "@/hooks/base64File";
import { CreateOrUpdateProfile } from "@/config/APIConfig";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";
import { currentUserProfile } from "@/types/api-types";
import { Badge } from "../ui/badge";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "../ui/label";

const DashboardNav = () => {
  const currentRoute = usePathname();
  const { user } = useAppContext();
  const { data: session } = useSession();
  const [openProfile, setOpenProfile] = useState(false);
  const [editUser, setEditUser] = useState<GlobalType["user"]>(user);
  const [showLoader, setShowLoader] = useState<Boolean>(false);
  const [changeIDImage, setChangeIDImage] = useState<Boolean>(false);

  const token = session?.user.accesstokens as unknown as string;


  const getProfile = async () => {
    const res = await fetch(`${AtlasBackendApi}/userProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }
    return res.json();
  };

  const { data, error, isLoading } = useQuery<currentUserProfile>({ queryKey: ["userProfile"], queryFn: getProfile, enabled: !!token });


  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    setValue: setUserValue,
    watch,
    formState: { errors: errorsUser },
    control: controlUser,
  } = useForm({
    defaultValues: {
      idNumber: data?.idNumber,
      phoneNumber: data?.phoneNumber,
      fullName: data?.fullName,
      entity: data?.entity || 'individual',
      email: data?.email,
      identification: data?.identification,
      postCode: data?.postCode,
      postAddress: data?.postAddress
    },
  });

  let entityWatch = watch("entity");


  const handleIdChange = () => {
    setChangeIDImage(true);
  }
  const isNotURL = (str: string) => {
    console.log(str)
    if (str.startsWith('http') || str.startsWith('https')) {
      return false
    }
    return true
  }

  //submit
  const onSubmit = async (formData: any) => {

    const userethereumAddress = "0x8787STEWV545447448484848DDAJWWBWEVFE"; // to be changed on the backend with dynamic one
    let identificationbase64 = "";
    console.log(formData);
    if (formData.identification && formData.identification[0] instanceof File) {
      identificationbase64 = (await convertBase64(
        formData.identification[0]
      )) as string;
    } else {
      identificationbase64 = data?.identification as string || "";
    }
    // if (formData.identification && formData.identification.length > 0 && (typeof formData.identification[0] !== String(undefined))) {
    //   identificationbase64 = (await convertBase64(
    //     formData.identification[0]
    //   )) as string;
    // } else {
    //   identificationbase64 = data?.identification as string || "";
    // }

    try {
      setShowLoader(true);
      console.log(formData)
      const res = await CreateOrUpdateProfile(
        formData.idNumber,
        identificationbase64,
        userethereumAddress,
        formData.phoneNumber,
        token,
        formData.fullName,
        formData.email,
        formData.entity,
        formData.postCode,
        formData.postAddress
      );
      console.log("response profile", res);
      setShowLoader(false);
      window.location.reload();
    } catch (error) {
      console.log("response errorprofile", error);
    }
  };
  const onErrors = async (errors: any) => console.error(errors);

  useEffect(() => {
    if (data) {
      setUserValue("idNumber", data.idNumber);
      setUserValue("phoneNumber", data.phoneNumber);
      setUserValue("fullName", data.fullName);
      setUserValue("entity", data.entity);
      setUserValue("email", data.email);
      setUserValue("identification", data.identification)
      setUserValue("postAddress", data.postAddress)
      setUserValue("postCode", data.postCode)
    }
  }, [data, setUserValue]);




  return (
    <main className="flex justify-between items-center py-2 px-10">
      <div className="font-bold text-base">
        {currentRoute.slice(1, currentRoute.length)}
      </div>
      <Sheet>
        <SheetTrigger>
          <div className="flex items-center">
            <Image src={User} alt="" />
            <article className="ml-1">
              <h3 className="font-bold text-sm">
                {session?.user?.userdata?.fullName}
              </h3>
              <h5 className="text-xs">{session?.user?.userdata?.phoneNumber}</h5>
            </article>
          </div>
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll max-h-screen">
          <SheetHeader className="relative p-2 border-2 border-[#218B53] rounded-lg my-3">
            <SheetTitle>User Profile</SheetTitle>
            <div className="flex  my-10">
              <Image src={User} alt="" />
              <article className="ml-2 flex flex-col items-start justify-between w-full">
                <div>
                  <h3 className="font-bold text-sm">
                    {session?.user?.userdata?.fullName}
                  </h3>
                  <h5 className="text-xs">{session?.user?.userdata?.phoneNumber}</h5>
                  <Badge className={`text-xs ${data?.status === 'verified' ? 'bg-green-400' : 'bg-red-400'}`}>{data?.status}</Badge>
                </div>

              </article>
            </div>
            <div className="w-full">
              <h5 className="text-xs">Eth Address: {data?.ethereumAddress}</h5>
            </div>
            <button
              onClick={() => {
                setOpenProfile(!openProfile);
              }}
              className="p-2 bg-[#218B53] text-white rounded-lg m-1 cursor-pointer"
            >
              Edit Profile
            </button>
            <form
              style={openProfile ? { display: "block" } : { display: "none" }}
              onSubmit={handleSubmitUser(onSubmit, onErrors)}
            >
              <label htmlFor="fullname" className="text-sm">
                Entity
              </label>
              <Controller
                name="entity"
                control={controlUser}
                render={({ field }) => (
                  <Select
                    defaultValue="individual"
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={data?.status === 'verified'}
                  >
                    <SelectTrigger className="w-full mb-2">
                      <SelectValue placeholder="entity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="organization">
                        Institution/Organization
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <label htmlFor="fullname" className="text-sm">
                {entityWatch && entityWatch === 'individual' ? 'Official Name in ID' : 'Official Company Name'}
              </label>
              <input
                type="text"
                className={`p-3 rounded-lg border-2 border-[#a5a5a538] ${data?.status === 'verified' ? 'bg-green-100' : 'bg-[#A5A5A520]'} w-full outline-none m-1 text-black`}
                placeholder="As in legal papers"
                {...registerUser("fullName", {
                  required: " This is required ",
                })}
                id="fullname"
                readOnly={data?.status === 'verified'}
              />
              <label htmlFor="idnumber" className="text-sm">
                {entityWatch && entityWatch === 'individual' ? 'National ID' : 'Company Registration Number'}
              </label>
              <input
                type="text"
                className={`p-3 rounded-lg border-2 border-[#a5a5a538] ${data?.status === 'verified' ? 'bg-green-100' : 'bg-[#A5A5A520]'} w-full outline-none m-1 text-black`}
                placeholder="38043221"
                {...registerUser("idNumber", {
                  required: " This is required ",
                })}
                id="idnumber"
                readOnly={data?.status === 'verified'}
              />
              {entityWatch === 'company' &&
                <>
                  <label htmlFor="phonenumber" className="text-sm">
                    Company Postal Address
                  </label>
                  <input
                    type="text"
                    className="p-3 rounded-lg border-2 border-[#a5a5a538] bg-[#A5A5A520] w-full outline-none m-1 text-black"
                    placeholder="postAddress"
                    {...registerUser("postAddress", {
                      // required: " This is required ",
                    })}
                    id="postAddress"
                    required
                  />
                  <label htmlFor="phonenumber" className="text-sm">
                    Company Postal Code
                  </label>
                  <input
                    type="text"
                    className="p-3 rounded-lg border-2 border-[#a5a5a538] bg-[#A5A5A520] w-full outline-none m-1 text-black"
                    placeholder="postCode"
                    {...registerUser("postCode", {
                      // required: " This is required ",
                    })}
                    id="postCode"
                    required
                  />
                </>}
              <label htmlFor="phonenumber" className="text-sm">
                Phone Number
              </label>
              <input
                type="text"
                className="p-3 rounded-lg border-2 border-[#a5a5a538] bg-[#A5A5A520] w-full outline-none m-1 text-black"
                placeholder="PhoneNumber"
                {...registerUser("phoneNumber", {
                  // required: " This is required ",
                })}
                id="phonenumber"
                required
              />

              <label htmlFor="email" className="text-sm">
                {entityWatch && entityWatch === 'individual' ? 'Email Address' : 'Official Email Address'}
              </label>
              <input
                type="text"
                className="p-3 rounded-lg border-2 border-[#a5a5a538] bg-[#A5A5A520] w-full outline-none m-1 text-black"
                placeholder="example@gmail.com"
                {...registerUser("email", {
                  // required: " This is required ",
                })}
                id="email"
                required
              />

              {data &&
                data?.identification?.length === 0 ?
                <article className="m-1 p-2 border-2 border-[#218B53] flex flex-col items-center justify-around w-full rounded-md text-center ">
                  <h4 className="text-[#218B53] ">
                    {entityWatch && entityWatch === 'individual' ? 'Add ID Image' : 'Attach certificate of incorporation'}
                  </h4>
                  <input
                    {...registerUser("identification", {
                      // required: " This is required ",
                    })}
                    type="file"
                    accept="image/*,application/pdf"
                    id="myfile"
                    className="bg-[#FB774A] text-white p-2 rounded-lg w-[300px]"
                    name="identification"
                  />
                </article>
                :
                <div className="w-full text-center my-2 flex items-center justify-center">
                  <Image
                    width={100}
                    height={50}
                    src={data?.identification || ""}
                    alt="national id" />
                </div>
              }
              {data &&
                data?.identification?.length > 0 &&
                <article className="m-1 p-2 border-2 border-[#218B53] flex flex-col items-center justify-around w-full rounded-md text-center ">
                  <h4 className="text-[#218B53] ">
                    {entityWatch && entityWatch === 'individual' ? 'Change ID Image' : 'Change certificate of incorporation'}
                  </h4>

                  <input
                    {...registerUser("identification", {
                      // required: " This is required ",
                    })}
                    type="file"
                    id="myfile"
                    accept="image/*,application/pdf"
                    className="bg-[#FB774A] text-white p-2 rounded-lg w-[300px]"
                    name="identification"
                    disabled={data?.status === 'verified'}
                  />
                </article>
              }

              <button
                name="submit"
                className="p-2 w-full bg-[#218B53] text-white rounded-lg m-1 cursor-pointer flex items-center justify-center"
              >
                {showLoader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update
              </button>
            </form>

          </SheetHeader>
        </SheetContent>
      </Sheet>
    </main>
  );
};


function TooltipText(title: string, description: string) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label>{title}</Label>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default DashboardNav;
