"use client";

import { Password } from "@/constants/svg";
import AuthContainer from "@/container/AuthContainer";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSession, signIn, useSession } from "next-auth/react";
import { isValidPhoneNumber } from "@/hooks/Email-NumberRegex";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAppContext } from "@/context/AppContext";
import ConfirmOTP from "@/components/modal/ConfirmOTP";
import { SendAfricaOTP } from "@/config/APIConfig";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const router = useRouter();
  //const get the current route
  const currentPath = usePathname();
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [notificationError, showNotificationError] = useState<String>("");
  const [showLoader, setShowLoader] = useState(false);
  const { setUser } = useAppContext();
  const [open, setOpen] = useState(false);
  const updateShowNotification = (value: any) => {
    showNotificationError(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    // router.replace("/registry")

    if (!isValidPhoneNumber(data.phoneNumber)) {
      showNotificationError("invalid Number");
      return;
    }

    if (!data.password || data.password.length < 6) {
      showNotificationError("invalid password");

      return;
    }
    setFormData({
      phoneNumber: data.phoneNumber,
      password: data.password,
    });

    //setOpen(true);
    try {
      setShowLoader(true)
      const res = await SendAfricaOTP({ phoneNumber: data.phoneNumber });
      console.log("the send otp res", res);

      if (res?.status == 200) {
        setOpen(true);
      }
    } catch (erro) {
      console.log("error sending otp");
      showNotificationError("Error sending OTP");
    }
  };

  useEffect(() => {
    setShowLoader(false)
  }, [])


  return (
    <section className="h-screen bg-gradient-to-r from-[#258C4E] to-[#81DB64] text-white">
      <main className="flex flex-col items-center text-center pb-5 h-full p-3">
        <h1 className="font-semibold text-3xl md:text-[48px] font-clashDisplay text-white my-[30px]">
          Login to Atlas
        </h1>
        <h4 className="lg:w-[900px] my-[20px] font-DM text-base md:text-lg">
          First blockchain powered land titles registry By Kenyans for Kenya!
        </h4>
        {!open ?
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-around h-[400px] md:h-[500px] w-full xsm:w-3/4 md:w-1/2 bg-white text-black rounded-lg p-2 md:px-10 md:py-16 font-DM"
          >
            <div className="h-auto flex flex-col items-start mb-[10px]">
              <label
                htmlFor="emailphone"
                className="text-[#898CA9] font-semibold font-DM"
              >
                Phone Number
              </label>
              <input
                {...register("phoneNumber", {
                  required: " This is required ",
                })}
                type={"number" || "email"}
                id=""
                className="flex justify-around border-2 border-[#0CAF60] bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#0CAF60] focus-visible:bg-transparent"
              />
            </div>

            <div className="h-auto flex flex-col items-start  mb-[10px]">
              <label
                htmlFor="password"
                className="text-[#898CA9] font-semibold font-DM"
              >
                Password
              </label>
              <div className="flex justify-between border-2 border-[#0CAF60] bg-white rounded-full py-2 px-6  w-full focus:outline-none ring-offset-[#0CAF60] focus-visible:bg-transparent">
                <input
                  type={passwordVisibility}
                  {...register("password", {
                    required: " This is required ",
                    minLength: {
                      value: 6,
                      message: "Minimum password length is six characters",
                    },
                  })}
                  id=""
                  className="py-1 w-[343px] focus:outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => {
                    passwordVisibility == "password"
                      ? setPasswordVisibility("text")
                      : setPasswordVisibility("password");
                  }}
                >
                  <Image src={Password} alt="google" className="mx-5" />
                </button>
              </div>
              <h2 className="text-red-300 ">{notificationError}</h2>
            </div>

            <div className="flex flex-col lg:flex-row justify-between  mb-[20px]">
              <div className="flex justify-between items-center">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#218B53]">
                  Register
                </Link>
              </div>

              <div className="flex justify-between items-center">
                Forgot Your Password?{" "}
                <Link href="/forgotPassword" className="text-[#218B53]">
                  Reset Password
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="flex justify-center items-center py-3 px-6 border border-[#218B53] rounded-full bg-[#218B53] text-white font-DM hover:cursor-pointer hover:bg-[#218B53] hover:text-white"
            >
              Sign in
              {showLoader &&
                <Loader2 size={24} className="ml-2 h-4 w-4 animate-spin" />
              }
            </button>
          </form> :
          <ConfirmOTP
            open={open}
            setOpen={setOpen}
            formData={formData}
            pathName={currentPath}
            setShowNotification={updateShowNotification}
          />
        }
      </main>
    </section>
  );
};

export default Login;

