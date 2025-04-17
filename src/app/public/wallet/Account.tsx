import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DebitCard } from "@/constants/svg";
// import { Player } from "@lottiefiles/react-lottie-player";

import {
  CirclesThreePlus,
  PaperPlaneTilt,
  PlusCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { AtlasBackendApi } from '@/constants/atlas-backend-api';
import useMpesa from "@/hooks/useMpesa";
import { getCurrentDateTime } from '@/lib/utils'
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
const Account = () => {
  const Player = dynamic(
    () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
    { ssr: false }
  );
  const [transactionConfirm, setTransactionConfirm] = useState(false);
  const [confirmMpesaCode, setConfirmMpesaCode] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const { initiateSTKPush, paymentError, paymentLoading } = useMpesa();
  const [accountBalance, setAccountBalance] = useState(0)
  const [creditBalance, setCreditBalance] = useState(0)
  const { toast } = useToast();
  const [showPromoLoader, setShowPromoLoader] = useState(false)
  const { data: session } = useSession();
  const token = session?.user.accesstokens as unknown as string;
  const date = getCurrentDateTime()

  const {
    register: registerPhoneNumber,
    handleSubmit: handleSubmitPhoneNumber,
    setValue: setPhoneNumberValue,
    formState: { errors: errorsPhoneNumber },
    control: controlPhoneNumber,
  } = useForm();

  const onSubmitPhoneNumber = async (data: any) => {
    console.log(data)
    let user_id: any = session?.user.userdata._id;
    await initiateSTKPush(data.phoneNumber, data.amount, user_id)
    setTransactionConfirm(false);
    setConfirmMpesaCode(true);
  };

  const {
    register: registerMpesaCode,
    handleSubmit: handleSubmitMpesaCode,
    setValue: setMpesaCodeValue,
    formState: { errors: errorsMpesaCode },
    control: controlMpesaCode,
  } = useForm();

  const onSubmitMpesaCode = async (data: any) => {
    // onsumbit MpesaCode logic
    setConfirmMpesaCode(false);
    const response = await fetch(`${AtlasBackendApi}/payments/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mpesaCode: data.mpesaCode }),
    });

    if (response.status === 200) {
      setOpenSuccess(true);
      window.location.reload();
    } else {
      setOpenFailed(true);
    }
  };
  const getUserWallet = async () => {
    let user_id: any = session?.user.userdata._id;
    if (!user_id) return
    const wallet = await fetch(`${AtlasBackendApi}/wallet/user/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    if (!wallet.ok) {
      throw new Error(`HTTP error! status: ${wallet.status}`);
    }
    const data = await wallet.json();
    console.log(data);
    console.log('Wallet', data)
    setAccountBalance(data.balance)
    setCreditBalance(data.credits)
  }

  const generateInviteLink = () => {
    const userId = session?.user.userdata._id;
    return `https://atlas-ke.net/register?invite=${userId}`;
  };

  const handleSubmitPromoCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const promo_code = formData.get('promo_code') as string;
    const user_id = session?.user.userdata._id as string;

    try {
      setShowPromoLoader(true)
      const response = await fetch(`${AtlasBackendApi}/promotions/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ promo_code, user_id }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setCreditBalance(data.credits);
        toast({
          title: data.message
        })
        // reset input
        const promoCodeInput = document.getElementById("promo-code");
        if (promoCodeInput && 'value' in promoCodeInput) {
          (promoCodeInput as HTMLInputElement).value = "";
        }
      }
      setShowPromoLoader(false)
    } catch (error) {
      console.error('Error applying promo code:', error);
      setShowPromoLoader(false)
      toast({
        title: "⚠️ Invalid Promotion Code!"
      })
    }
  };

  useEffect(() => {
    getUserWallet()
  },)

  return (
    <main className="w-full">
      <article className="flex justify-around">
        <div className="flex flex-col items-center justify-around w-full">
          <span className="bg-dash-hero-bg bg-cover text-white p-4 m-3 h-[350px] flex flex-col justify-around items-center rounded-xl w-full">
            <div className="flex flex-row items-center justify-center my-2">
              <div>
                <h5 className="text-white font-semibold">Wallet Balance</h5>
                <h3 className="text-white text-4xl font-bold my-2">
                  KES {accountBalance}
                </h3>
              </div>
              <Separator orientation="vertical" className="mx-6" />
              <div>
                <h5 className="text-white font-semibold">Credits Balance</h5>
                <h3 className="text-white text-4xl font-bold my-2">
                  KES {creditBalance}
                </h3>
              </div>
            </div>
            <p className="text-white text-lg">{date}</p>
            <div className="flex flex-col items-center justify-center w-1/2">
              <Dialog
                open={transactionConfirm}
                onOpenChange={setTransactionConfirm}
              >
                <DialogTrigger>
                  <Button className="bg-white text-[#218B53] px-4 text-lg py-6 font-bold rounded-xl  mt-5 flex items-center">
                    <PlusCircle size={24} color="#218B53" className="mx-2" />
                    Top Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="mb-[20px]">
                      Top Up Your Account
                    </DialogTitle>
                    <section className="home-background flex flex-col  ">
                      <form
                        onSubmit={handleSubmitPhoneNumber(onSubmitPhoneNumber)}
                        className="my-5"
                      >
                        <span className="flex flex-col">
                          <label
                            htmlFor="phoneNumber"
                            className="text-[#909090] p-1"
                          >
                            Phone Number
                          </label>
                          <input
                            {...registerPhoneNumber("phoneNumber", {
                              required: " This is required ",
                              value: session?.user.userdata.phoneNumber,
                              minLength: 10
                            })}
                            type="number"
                            placeholder="Enter Your Phone Number"
                            className="border-2 border-[#218B53] outline-none rounded-lg p-4 bg-white text-black text-sm"
                          />
                        </span>
                        <span className="flex flex-col">
                          <label htmlFor="amount" className="text-[#909090] p-1">
                            Amount
                          </label>
                          <input
                            {...registerPhoneNumber("amount", {
                              required: " This is required ",
                            })}
                            type="number"
                            placeholder="Enter Amount"
                            className="border-2 border-[#218B53] outline-none rounded-lg p-4 bg-white text-black text-sm "
                          />
                        </span>
                        <span className="flex items-center p-2">
                          <WarningCircle size={16} color="#000000" />
                          <p className="text-sm">
                            This will send a push notification to bill your Phone
                            Number
                          </p>
                        </span>
                        <button
                          className="text-white bg-[#218B53] font-bold text-lg p-3 rounded-xl w-full mt-5"
                          disabled={!!Object.keys(errorsPhoneNumber).length}
                        >
                          Continue
                        </button>
                      </form>
                    </section>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'link'} className="bg-transparent text-white font-bold text-lg rounded-xl my-2 flex items-center">
                    Add Promo Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Promotion Code</DialogTitle>
                    <DialogDescription>
                      Credits redeemed from promotions serve as your currency
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitPromoCode}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 items-center gap-2">
                        <Label htmlFor="name" className="text-left grid-cols-3">
                          Promo Code
                        </Label>
                        <Input
                          id="promo-code"
                          name="promo_code"
                          placeholder="i.e PROMOCODE"
                          className="grid-cols-12"
                        />
                      </div>
                      <Button type="submit" className="my-6 bg-[#218B53] text-white hover:bg-[#218B53]/90 hover:scale-105 hover:text-white">
                        Apply Code
                        {
                          showPromoLoader &&
                          <Loader2 className="animate-spin mx-1" />
                        }
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <InviteLink link={generateInviteLink()} />
          </span>
          <span className="flex justify-around  px-2 py-4 rounded-lg w-full">
            <Dialog open={confirmMpesaCode} onOpenChange={setConfirmMpesaCode}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-black">
                    {" "}
                    Confirm MPESA-code sent to Phone Number: {session?.user.userdata.phoneNumber}
                  </DialogTitle>
                  <hr className="my-4" />
                  <form
                    className="flex flex-col justify-around h-[200px]"
                    onSubmit={handleSubmitMpesaCode(onSubmitMpesaCode)}
                  >
                    <input
                      {...registerMpesaCode("mpesaCode", {
                        required: " This is required ",
                        minLength: 10
                      })}
                      id=""
                      type="text"
                      placeholder="Enter MPESA code"
                      className="flex justify-around border border-gray-300 bg-white rounded-md py-3 px-6  w-full focus:outline-none ring-offset-[#A5A5A533] focus-visible:bg-transparent text-black"
                    />
                    <button
                      type="submit"
                      disabled={!!Object.keys(errorsMpesaCode).length}
                      className="bg-[#218B53] text-white font-semibold rounded-lg p-3"
                    >
                      Confirm MPESA Code
                    </button>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="mb-[20px]">
                    Top Up Successful
                  </DialogTitle>
                  <Player
                    keepLastFrame
                    autoplay
                    src="/json/success.json"
                    style={{ height: "300px", width: "300px" }}
                  ></Player>
                </DialogHeader>
                <DialogClose>
                  <button>Close</button>
                </DialogClose>
              </DialogContent>
            </Dialog>
            <Dialog open={openFailed} onOpenChange={setOpenFailed}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="mb-[20px]">
                    Top Up Failed
                  </DialogTitle>
                  <Player
                    keepLastFrame
                    autoplay
                    src="/json/error.json"
                    style={{ height: "300px", width: "300px" }}
                  ></Player>
                </DialogHeader>
                <DialogClose>
                  <button>Close</button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </span>
        </div>
      </article>
    </main>
  );
};

export default Account;


function InviteLink({ link }: { link: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="my-2 flex flex-col items-center">
      Get more Free credits by inviting others to Atlas using this link: <br />
      <div className="flex flex-row items-center">
        <span className="text-sm mx-1 bg-white/20 text-black font-bold italic p-1">
          {link}
        </span>
        <button onClick={handleCopy} className="flex items-center mx-2 hover:bg-black hover:text-white p-1 rounded">
          <Copy className="mx-1" size={24} />
          {isCopied ? 'Copied!' : ''}
        </button>
      </div>
    </div>
  );
}