import React, { useCallback, useState, useEffect } from "react";
import "../styles/style.css";
import { property } from "@/helpers/propertySource";
import Image from "next/image";
import { SealCheck } from "@phosphor-icons/react";
import { Land } from "@/constants/png";
import PropertyBar from "./PropertyBar";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/api-types";
import { useSearchParams } from "next/navigation";
import performBilling from "@/lib/billing";
import { Loader2 } from "lucide-react";
import { title } from "process";
import { useToast } from "@/hooks/use-toast";


const AllProperties = () => {
  const searchParams = useSearchParams();
  const [inputText, setInputText] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;
  const [showBillingLoader, setShowBillingLoader] = useState(false)
  const [accountBalance, setAccountBalance] = useState(0);
  const [accountCredits, setAccountCredits] = useState(0)
  const { toast } = useToast();

  console.log("token token", token);
  const getUserProperties = async () => {
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
    queryKey: ["propertiesVerified"],
    queryFn: getUserProperties,
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
        const titles = element.titleLR
          .toLowerCase()
          .includes(inputText.toLowerCase());
        const aliases = element.propertyAlias
          .toLowerCase()
          .includes(inputText.toLowerCase());
        return titles ? titles : aliases
      }
    })
    : [];
  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams();
      params.set(key, value);
      return params.toString();
    }, []
  )

  const handleBilling = async (element: any) => {
    try {
      setShowBillingLoader(true);
      const billingData = billing.data?.filter((bill: any) => bill.billing_type === 'SEARCH')[0]
      console.log('billing selected', billingData)
      if (billingData.status === 'inactive') {
        return router.replace(`/public/property?title=${encodeURIComponent(element?.titleLR)}`)
      }
      if (billingData.amount > accountBalance && billingData.amount > accountCredits) {
        setShowBillingLoader(false);
        toast({
          title: 'You have insufficient funds or credits to search. Top up and try again'
        })
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
    setAccountCredits(data.credits)
  }

  useEffect(() => {
    getUserWallet()
  },)

  return (
    <article className="">
      <PropertyBar inputText={inputText} setInputText={setInputText} />
      <div className="grid grid-cols-2 mx-auto gap-y-4 gap-x-2 sm:grid-cols-3 overflow-x-scroll min-w-full">
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
                  className="min-w-[350px] p-2 mx-1 rounded-xl hover:cursor-pointer flex flex-col border border-gray-200 hover:shadow-2xl"
                >
                  <Image src={element.propertyImage} alt="" width="0" height="0" sizes="100vw" style={{ width: '100%', aspectRatio: '1' }} className="rounded-xl auto-width " />
                  <div className="flex items-center">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold">{element.titleLR}</h4>
                    </div>
                    <div className="flex justify-between">
                      <h4 className="font-semibold mb-2">{element.sizeHa} Ha</h4>
                    </div>
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
                    This search transaction will be billed from your Account
                  </DialogTitle>
                  <DialogDescription className="h-[50px]">
                    You will be charge KES {getSearchBilling()} to view this Property
                  </DialogDescription>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleBilling(element)}
                      className="flex items-center justify-center py-3 px-5 w-full bg-[#218B53] text-white hover:bg-[#256f48] hover:text-white rounded-lg hover:font-semibold"
                    >
                      Continue
                      {showBillingLoader &&
                        <Loader2 size={15} className="mx-1 animate-spin" />
                      }
                    </button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </article>
  );
};

export default AllProperties;
