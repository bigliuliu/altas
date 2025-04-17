"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Password } from "@/constants/svg";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "@/hooks/Email-NumberRegex";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmOTP from "@/components/modal/ConfirmOTP";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useSearchParams } from 'next/navigation'
import { ArrowBendRightUp } from "@phosphor-icons/react";
import { SendAfricaOTP } from "@/config/APIConfig";
import { ArrowUpRight, Loader2, LogInIcon } from "lucide-react";

const Register = () => {
  const searchParams = useSearchParams();
  const inviter = searchParams.get('invite')
  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    role: "",
    password: "",
    entity: "",
    inviter: null as string | null,
    promo_code: null as string | null
  });

  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [notificationError, showNotificationError] = useState<String>("");
  const [open, setOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);


  const {
    register,
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {

      console.log(data);

      setShowLoader(true);
      if (!isValidPhoneNumber(data.phoneNumber)) {
        showNotificationError("Confirm phone number");
        return;
      }

      if (data.password.length < 6 || !data.password) {
        showNotificationError("Check password length");
        return;
      }

      setFormData({
        phoneNumber: data.phoneNumber,
        name: data.name,
        role: data.role,
        password: data.password,
        entity: data.entity,
        inviter,
        promo_code: data.promo_code
      });
      //setUserPhoneNumber(data.phoneNumber);
      //send otp

      await SendAfricaOTP({ phoneNumber: data.phoneNumber });
      setShowLoader(false);
    } catch (erro) {
      console.log("error sending otp");
      showNotificationError("Error sending OTP");
      setShowLoader(false);
    }


    // if (otpConfirmationStatus == "Approved") {
    // try {
    //   const res = await fetch("/api/accounts/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       phoneNumber: data.phoneNumber,
    //       fullName: data.name,
    //       password: data.password,
    //       role: data.role,
    //     }),
    //   });
    //   if (res.status === 400) {
    //     showNotificationError("phone already register");
    //   }
    //   if (res.status === 200) {
    //     router.push("/login");
    //   }
    // } catch (err) {
    //   showNotificationError("Try another time");
    //   console.log("error sign", err);
    // }}else{
    //   console.log("sorry no signup")
    // }

    // Perform any further actions, such as making an API call
  };



  return (
    <section className="h-screen bg-gradient-to-r from-[#258C4E] to-[#81DB64] text-white">
      <main className="flex flex-col items-center text-center pb-5 p-3">
        <h1 className="font-semibold text-3xl md:text-[48px] font-clashDisplay text-white my-4">
          Create an Atlas Account
        </h1>
        <h4 className="font-DM text-lg md:text-lg">
          First blockchain powered land titles registry By Kenyans for Kenya!
        </h4>
        {!open ?
          <form
            onSubmit={handleSubmit(async (data) => {
              setOpen(true);
              await onSubmit(data);
            })}
            className="flex flex-col justify-around  w-full xsm:w-3/4 md:w-1/2 bg-white text-black rounded-lg p-4 md:px-10 md:py-16 font-DM"
          >
            <div className="h-auto flex flex-col items-start mb-[10px]">
              <label
                htmlFor="fullname"
                className="text-[#898CA9] font-semibold font-DM"
              >
                Entity
              </label>
              <Controller
                name="entity"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue=""
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select entity" />
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
            </div>

            <div className="h-auto flex flex-col items-start mb-[10px]">
              <label
                htmlFor="fullname"
                className="text-[#898CA9] font-semibold font-DM"
              >
                Full Name
              </label>
              <input
                {...register("name", {
                  required: " This is required ",
                })}
                type="text"
                id=""
                className="flex justify-around border-2 border-[#0CAF60] bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#0CAF60] focus-visible:bg-transparent"
              />
            </div>

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
            <div className="h-auto flex flex-col items-start mb-[10px]">
              <label
                htmlFor="fullname"
                className="text-[#898CA9] font-semibold font-DM"
              >
                Add Promo code
              </label>
              <input
                {...register("promo_code", {
                  required: " This is required ",
                })}
                type="text"
                id=""
                className="flex justify-around border-2 border-[#0CAF60] bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#0CAF60] focus-visible:bg-transparent"
              />
            </div>

            <div className="flex flex-col lg:flex-row justify-between  mb-[20px]">
              <div className="flex justify-between items-center">
                <Checkbox className="border-2 border-[#0CAF60]" />
                <h4 className="mx-2">
                  Accept{" "}
                  <a href="#" className="text-[#218B53] hover:underline">
                    Terms of use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#218B53] hover:underline">
                    Privacy
                  </a>
                </h4>
              </div>

              <div className="flex items-center">
                Already have an account?{" "}
                <Link href="/login" className="text-[#218B53] mx-1 hover:underline group flex items-center">
                  Login
                  <ArrowUpRight size={10} className="mx-1 hidden group-hover:block" />
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="flex justify-center items-center py-3 px-6 border border-[#218B53] rounded-full bg-[#218B53] text-white font-DM hover:cursor-pointer hover:bg-[#218B53] hover:text-white"
            >
              Create Account
              {showLoader &&
                <Loader2 size={24} className="ml-2 h-4 w-4 animate-spin" />
              }
            </button>
          </form>
          :
          <ConfirmOTP open={open} setOpen={setOpen} formData={formData} />
        }
      </main>
    </section>
  );
};

export default Register;
