import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Service from "../home/components/Services";
const Services = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="bg-[#008D48] flex flex-col pt-24 pl-24  text-white w-full h-[340px]">
        <p className="font-jakarta text-base font-semibold text-[#FFC107] mb-3">
          Services
        </p>
        <p className="mb-5 font-sans font-semibold text-5xl">
          Atlas has carefully selected a suite of services 
        </p>
        <p className="font-jakarta text-xl font-normal">
        In tandem with the
        most critical land administration functions.
        </p>
      </div>
      <div className="px-24">
        <Service isShowTitle={false}/>
      </div>
    </div>
  );
};

export default Services;
