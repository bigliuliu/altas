import Image from "next/image";
import Link from "next/link";
import React from "react";
import { User1, User2, User3 } from "@/constants/png";
export default function ContactUs() {
  return (
    <div className="bg-[#008D48] w-full h-80 rounded-[40px] my-24 flex flex-col items-center py-8">
      <div className="flex items-center">
        <Image
          src={User3}
          width={48}
          height={48}
          alt=""
          className="rounded-full border border-white -ml-2 z-0"
        />
        <Image
          src={User2}
          width={56}
          height={56}
          alt=""
          className="rounded-full border border-white -ml-2 z-10"
        />
        <Image
          src={User1}
          width={48}
          height={48}
          alt=""
          className="rounded-full border border-white -ml-2 z-0"
        />
      </div>
      <div className="flex flex-col text-[#f5f5f5] items-center mt-8">
        <p className="font-sans font-semibold text-xl">Still have questions?</p>
        <p className="font-jakarta font-normal text-[18px] mt-2">
          Any question or remark you might have? Simply send us a message.
        </p>
      </div>
      <Link
        href="/contact"
        className="bg-[#FFC107] py-3 px-3 rounded-lg  text-lg  font-jakarta text-black font-semibold mt-8"
      >
        Contact us
      </Link>
    </div>
  );
}
