"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useForm } from "react-hook-form";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useRouter } from "next/navigation";
import { getSession, signIn, useSession } from "next-auth/react";
import { useAppContext } from "@/context/AppContext";
import {
  VerifyOTP,
  SignUpUser,
  SignInUser,
  VerifyAfricaOTP,
  SendAfricaOTP,
} from "../../config/APIConfig";
import { ArrowArcLeft } from "@phosphor-icons/react/dist/ssr";
import { ArrowLeft } from "lucide-react";

const ConfirmOTP = ({
  open,
  setOpen,
  formData = {},
  pathName,
  setShowNotification,
}: any) => {
  const { data: session, status } = useSession();
  const [showSentToEmail, setShowSentToEmail] = React.useState<Boolean>(false);
  const [otpEmail, setOtpEmail] = useState('')
  const [otpCode, setOtpCode] = useState('');

  const { setUser } = useAppContext();
  const router = useRouter();

  const { phoneNumber, name, role, password, entity, inviter, promo_code } = formData;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitOTP = async (data: any) => {
    // handleOTP confirmation here
    try {
      const res = await VerifyAfricaOTP({
        phoneNumber: phoneNumber,
        otp: otpCode,
      });

      if (res?.status == 200) {
        setOpen(false);
        if (pathName == "/login") {
          try {
            const res = await SignInUser({
              phoneNumber: phoneNumber,
              password: password,
            });

            if (res?.error) {
              console.log("status", res?.status);
              setShowNotification("Incorrect Credentials ");
              // showNotificationError("Incorrect Credentials");
              console.log("can't sign in error");
            } else if (res?.url) {
              const updatedSession: any = await getSession();
              setUser(updatedSession);
              const userRole = updatedSession?.user?.userdata?.role;
              console.log("user role session", userRole);
              console.log("user status session", status);
              console.log("user access session", session?.user?.accesstokens);

              // Redirect based on user's role
              switch (userRole) {
                case "government":
                  router.replace("/government");
                  break;
                case "public":
                  router.replace("/public");
                  break;
                case "admin":
                  router.replace("/admin");
                  break;
                case "registry":
                  router.replace("/registry");
                  break;
                default:
                  // Redirect to a default route or handle accordingly
                  router.replace("/login");
                  break;
              }
            } else {
              // showNotificationError("Incorrect Credentials");
              setOpen(false);
              setShowNotification("Incorrect Credentials ");
              console.log("Incoreect Credentials");
            }
          } catch (err) {
            setOpen(false);
            setShowNotification("Try Another time");
            console.log("user session error", err);
          }
        } else {
          try {
            const res = await SignUpUser({
              phoneNumber: phoneNumber,
              fullName: name,
              password: password,
              role: role,
              entity: entity,
              email: otpEmail ? otpEmail : '',
              inviter,
              promo_code
            });
            if (res?.status === 200) {
              setOpen(false);
              router.push("/login");
            }
            if (res?.status === 400) {
              console.log("error for registering");
              setOpen(false);
              setShowNotification("phone already register");
              //showNotificationError("phone already register");
            }
          } catch (error) {
            console.log("error register", error);
            setShowNotification("Try Another time");
          }
        }
      } else {
        // Handle other cases if needed
        //console.log("OTP not approved", res);
        setOpen(false);
        setShowNotification("Failed OTP verification");
      }
    } catch (error) {
      console.log("error", error);
    } // Replace with your API call

    //setOpen(false);
  };

  const handleSendToEmail = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log(event.target.email.value)
    await fetch(`${AtlasBackendApi}/otp/africa/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        countryCode: "254",
      }),
    });
    setShowSentToEmail(false)
    if (window) {
      localStorage.setItem('last_otp_email', email);
    }
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtpEmail(event.target.value);
  };

  React.useEffect(() => {
    if (window) {
      setOtpEmail(localStorage.getItem('last_otp_email') as string)
    }
  }, [])

  return (
    <div className="w-1/2 bg-white p-6 my-4">
      {!showSentToEmail &&
        <>
          <h1 className="text-black flex justify-start items-center">
            <ArrowLeft className="mr-2 cursor-pointer" onClick={() => setOpen(false)} />
            Confirm One Time Passcode (OTP) sent to Phone Number / Email
          </h1>
          <hr className="my-4" />
          <form
            className="flex flex-col justify-around h-[250px] font-DM"
            onSubmit={handleSubmit(submitOTP)}
          >
            <label
              htmlFor="otpcode"
              className="text-black font-semibold my-4"
            >
              Enter OTP-Code
            </label>
            <div className="flex justify-center">
              <InputOTP maxLength={6}
                onChange={(newValue: string) => {
                  // Handle the onChange event here
                  setOtpCode(newValue);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="text-lg text-black border-[#0CAF60]" />
                  <InputOTPSlot index={1} className="text-lg text-black border-[#0CAF60]" />
                  <InputOTPSlot index={2} className="text-lg text-black border-[#0CAF60]" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="text-lg text-black border-[#0CAF60]" />
                  <InputOTPSlot index={4} className="text-lg text-black border-[#0CAF60]" />
                  <InputOTPSlot index={5} className="text-lg text-black border-[#0CAF60]" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <button
              type="submit"
              className="my-4 py-3 px-6 border border-[#218B53] rounded-full bg-[#218B53] text-white font-DM hover:cursor-pointer hover:bg-[#218B53] hover:text-white"
            >
              Confirm OTP Code
            </button>
          </form>
          <label className="underline text-black" onClick={() => setShowSentToEmail(true)}>Did not receive the code? Send to Email.</label>
        </>
      }
      {showSentToEmail &&
        <>
          <h1>
            Send OTP-code to Email Address {" "}
          </h1>
          <form
            className="flex flex-col justify-around h-[200px] font-DM"
            onSubmit={handleSendToEmail}
          >
            <label
              htmlFor="otpcode"
              className="text-black font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              value={otpEmail as string}
              onChange={handleEmailChange}
              name="email"
              id="email"
              type="email"
              placeholder="Enter Email Address"
              className="flex justify-around border-2 border-[#0CAF60] bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#0CAF60] focus-visible:bg-transparent"
            />
            <button
              type="submit"
              className="py-3 px-6 border border-[#218B53] rounded-full bg-[#218B53] text-white font-DM hover:cursor-pointer hover:bg-[#218B53] hover:text-white"
            >
              Send OTP Code
            </button>
          </form>
        </>
      }
    </div>
  );
};

export default ConfirmOTP;
