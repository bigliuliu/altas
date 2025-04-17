"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HomeIntro } from "@/constants/svg";
const Introduce = () => {
    return (
        <div className="bg-[#008D48] flex flex-col h-[1000px] w-full rounded-[40px] ">
          <div className="flex items-center justify-center pt-24">
            <div className="flex flex-col">
              <div className="font-sans text-white text-[60px] text-center font-bold leading-[72px]">
                Bank on blockchain,
                <br /> Secure your land & legacy
              </div>
              <div className="font-jakarta text-white text-xl font-normal leading-[30px] mt-7">
                Atlas is Kenya&#39;s first blockchain-powered land registry platform{" "}
                 that digitizes, verifies, <br />and secures your land ownership
                records with unmatched transparency and security.
              </div>
              <div className="flex flex-row mt-12 justify-center items-center">
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
            </div>
          </div>
          <div className="w-full h-full flex  justify-end px-32 mt-16">
            <div className="relative w-full h-full">
              <Image
                src={HomeIntro}
                alt="Atlas web app"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      );
};

export default Introduce;