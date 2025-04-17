"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import KenyaMap from "./KenyaMap";
const Resources = () => {
  const [activeTab, setActiveTab] = useState(5);
  return (
    <div className="flex w-full flex-col">
      <div className="bg-[#008D48] flex flex-col pt-24 pl-24  text-white w-full h-[340px]">
        <p className="font-jakarta text-base font-semibold text-[#FFC107] mb-3">
          Resources
        </p>
        <p className="mb-5 font-sans font-semibold text-5xl">
          Land Resources Repository
        </p>
        <p className="font-jakarta text-xl font-normal">
          Access Kenya&#39;s essential land laws, statistics, court
          determinations, and RIM documents in one centralized location.
        </p>
      </div>
      <div className="w-full p-24">
        <div className="w-2/3 grid grid-cols-5 gap-3 font-jakarta font-semibold text-base">
          <span
            onClick={() => {
              setActiveTab(1);
            }}
            className={`${
              activeTab === 1 ? "text-[#11171E]" : "text-[#5C5C5C]"
            } hover:cursor-pointer`}
          >
            Land laws
          </span>
          <span
            onClick={() => {
              setActiveTab(2);
            }}
            className={`${
              activeTab === 2 ? "text-[#11171E]" : "text-[#5C5C5C]"
            } hover:cursor-pointer`}
          >
            Land Statistics
          </span>
          <span
            onClick={() => {
              setActiveTab(3);
            }}
            className={`${
              activeTab === 3 ? "text-[#11171E]" : "text-[#5C5C5C]"
            } hover:cursor-pointer`}
          >
            Court determinations
          </span>
          <span
            onClick={() => {
              setActiveTab(4);
            }}
            className={`${
              activeTab === 4 ? "text-[#11171E]" : "text-[#5C5C5C]"
            } hover:cursor-pointer`}
          >
            Land sector developments{" "}
          </span>
          <span
            onClick={() => {
              setActiveTab(5);
            }}
            className={`${
              activeTab === 5 ? "text-[#11171E]" : "text-[#5C5C5C]"
            } hover:cursor-pointer`}
          >
            RIM repository
          </span>
        </div>
        {activeTab === 5 ? (
          <div className="pt-14">
            <p className="font-sans font-semibold text-5xl  text-[#11171E]">
              Interactive County Map
            </p>
            <p className="font-jakarta font-normal text-xl text-[#11171E] pt-3">
              Explore land registration sections across Kenya&#39;s counties.
              Select a county to <br /> view its registration sections, blocks,
              and downloadable registry index maps.
            </p>
            <div className="w-2/3 px-8 py-16">
              <p className="font-sans font-semibold text-[18px]  text-[#11171E]">
                select a Country
              </p>
              <p className="font-jakarta font-normal text-base text-[#11171E]">
                Click on a county to view its registration sections and blocks
              </p>
              <div className="w-full h-auto mt-10">
                <KenyaMap />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-96">

          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
