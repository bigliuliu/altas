"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MainPage, Security, SearchMain, Clock } from "@/constants/svg";
const Introduce = () => {
    return (
        <div className="bg-[#008D48] flex flex-row h-[1000px] w-full rounded-[40px] ">
           <div className="w-1/2 flex items-center justify-center">
        <div className="flex flex-col">
          <div className="font-sans text-white text-[60px] font-bold leading-[72px]">
            Bank on blockchain,
            <br /> Secure your land & <br /> legacy
          </div>
          <div className="font-jakarta text-white text-xl font-normal leading-[30px] mt-7">
            Atlas is Kenya&#39;s first blockchain-powered land registry platform{" "}
            <br /> that digitizes, verifies, and secures your land ownership
            records <br /> with unmatched transparency and security.
          </div>
          <div className="flex flex-row mt-12">
            <Link
              href="/login"
              className="bg-[#FFC107] mr-4 py-4 px-6 rounded-lg  text-lg  font-jakarta text-black font-semibold"
            >
              Enlist Property
            </Link>
            <Link
              href="/login"
              className="bg-[#ffffff14] py-4 px-7 border border-[#ffffffb2] rounded-lg  text-lg  font-jakarta text-white font-semibold"
            >
              Search Property
            </Link>
          </div>
          <div className="mt-14 flex flex-row">
            <div className="flex flex-row">
              <div className="w-9 h-9 bg-[#FFFFFF14] rounded-full flex items-center justify-center">
                <Image
                  src={Security}
                  alt="Atlas Security"
                  width={20}
                  height={20}
                />
              </div>
              <div className="font-jakarta ml-3">
                <p className="font-medium text-base text-white">Secure</p>
                <p className="text-[#B0E4D1] font-normal text-sm ">
                  Blockchain <br /> protected records
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="w-9 h-9 bg-[#FFFFFF14] rounded-full flex items-center justify-center">
                <Image
                  src={SearchMain}
                  alt="Atlas SearchMain"
                  width={20}
                  height={20}
                />
              </div>
              <div className="font-jakarta ml-3">
                <p className="font-medium text-base text-white">Transparent</p>
                <p className="text-[#B0E4D1] font-normal text-sm ">
                  Verified by <br /> gorvernment agencies
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="w-9 h-9 bg-[#FFFFFF14] rounded-full flex items-center justify-center">
                <Image src={Clock} alt="Atlas Clock" width={20} height={20} />
              </div>
              <div className="font-jakarta ml-3">
                <p className="font-medium text-base text-white">Convenient</p>
                <p className="text-[#B0E4D1] font-normal text-sm ">
                  24/7 access to land <br /> records
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-end justify-end ">
        <div className="relative w-full h-[90%] flex items-end justify-end">
          <Image
            src={MainPage}
            alt="Atlas web app"
            fill
            className="object-contain object-right"
          />
        </div>
      </div>
        </div>
      );
};

export default Introduce;