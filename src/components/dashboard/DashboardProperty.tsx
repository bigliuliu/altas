"use client";

import { property } from "@/helpers/propertySource";
import { DotsThree, Plus, SealCheck } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Land } from "@/constants/png";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/api-types";
import DashboardGeolocator from "./DashboardGeolocator";
import { generateCoordinatesArray, getCoordinatesFromLink } from "@/lib/utils";
import performBilling from "@/lib/billing";
import { Loader2, Loader2Icon } from "lucide-react";

const DashboardProperty = () => {
  const [inputText, setInputText] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [showbillingLoader, setShowBillingLoader] = useState<Boolean>(false)
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;
  const [accountBalance, setAccountBalance] = useState(0)

  console.log("token token", token);

  const getFirstTenVerifiedProperties = async () => {
    const res = await fetch(`${AtlasBackendApi}/public/verifiedProperties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

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

  const { data, error: propertyFetchError, isLoading: propertyFetchLoading } = useQuery({
    queryKey: ["propertiesVerified"],
    queryFn: getFirstTenVerifiedProperties,

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

  const handleBilling = async (element: any) => {
    try {
      setShowBillingLoader(true);
      const billingData = billing.data?.filter((bill: any) => bill.billing_type === 'SEARCH')[0]
      console.log('billing selected', billingData)
      if (billingData.status === 'inactive') {
        return router.replace(`/public/property?title=${encodeURIComponent(element?.titleLR)}`)
      }
      if (billingData.amount > accountBalance) {
        setShowBillingLoader(false);
        alert('You have insufficient funds or credits to search. Top up and try again');
        return
      }
      const user_id = session?.user.userdata._id as string
      const billingResponse = await performBilling(billingData.billing_type, billingData.amount, user_id);
      console.log("Billing response:", billingResponse);
      if (billingResponse.status === 400) {
        alert(billingResponse.message)
        return
      }
      router.replace(`/public/property?title=${encodeURIComponent(element?.titleLR)}`)
    } catch (error) {
      console.error("Error processing billing:", error);
      alert('Please top up your account to proceed')
    }
  };

  const getSearchBilling = () => {
    if (billing) {
      const filterbill = billing.data.filter((bill: any) => bill.billing_type === 'SEARCH')[0];
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
  }

  useEffect(() => {
    getUserWallet()
  },)


  return (
    <main className="m-3 rounded-lg p-3 bg-white shadow-md">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Properties</h3>
        <DotsThree size={24} color="#080808" />
      </div>
      <hr className="text-[#E6E8F0]" />
      <article className="flex p-5">
        {/* <Link href="/public/addproperty">
          <span className="border border-[#218B534D] hover:bg-[#218b5220] cursor-pointer border-dotted flex flex-col justify-center items-center min-w-[200px] h-full  rounded-md">
            <Plus
              size={24}
              color="#218B53"
              className="bg-[#218B531A] m-2 rounded-md"
            />
            <h5 className="font-semibold">Enlist your Own</h5>
          </span>
        </Link> */}
        <span className="flex overflow-x-scroll hide-scroll-bar">
          {filteredProperties.map((element: Property, index: number) => {
            return (
              <Dialog
                key={index}
                defaultOpen={open}
                onOpenChange={() => setOpen(true)}
              >
                <DialogTrigger>
                  <article
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="min-w-[350px] p-3 mx-1 rounded-xl hover:cursor-pointer flex flex-col border border-gray-200 hover:shadow-2xl"
                  >
                    <Image src={element.propertyImage} alt="" width="0" height="0" sizes="100vw" style={{ width: '100%', aspectRatio: '1' }} className="rounded-xl auto-width " />
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold">{element.titleLR}</h4>
                      <h4 className="font-semibold mb-2">{element.sizeHa} Ha</h4>
                    </div>
                    <div className="flex justify-between">
                      <button className="py-3 px-5 w-full bg-[#218B531A] text-[#218B53] hover:bg-[#218B53] hover:text-white rounded-lg hover:font-semibold">
                        Search
                      </button>
                    </div>
                  </article>
                </DialogTrigger>

                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="mb-[20px]">
                      This search transaction will be billed from your Wallet
                    </DialogTitle>
                    <DialogDescription className="h-[50px]">
                      You will be charge KES {getSearchBilling()} to search and download this property.
                    </DialogDescription>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleBilling(element)}
                        className="flex justify-center items-center py-3 px-5 w-full bg-[#218B53] text-white hover:bg-[#256f48] hover:text-white rounded-lg hover:font-semibold"
                      >
                        Continue
                        {showbillingLoader
                          &&
                          <Loader2 size={15} className="mx-1" />
                        }
                      </button>
                      {/* <button className="py-3 px-5 mx-2 w-full bg-black text-white hover:bg-red-500 hover:text-white rounded-lg hover:font-semibold">
                      Cancel
                    </button> */}
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            );
          })}
        </span>
      </article>
      <DashboardGeolocator coordinates={generateCoordinatesArray(filteredProperties)} />
    </main>
  );
};

export default DashboardProperty;




