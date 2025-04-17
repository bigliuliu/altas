import { File } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const DashboardRegistry = () => {
  return (
    <main className="bg-dash-hero-bg bg-cover text-white p-4 m-3 h-[250px] flex flex-col justify-around rounded-xl">
      <h4>Welcome </h4>
      <article className="flex justify-between">
        <Link
          href="/registry/verifications"
          className="flex flex-col items-start bg-white rounded-xl p-4 w-full mx-2"
        >
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Total Verifications</h3>
          <h3 className="font-bold text-black text-3xl">1349</h3>
        </Link>
        <Link
          href="/registry/disputes"
          className="flex flex-col items-start bg-white rounded-xl p-4 w-full mx-2"
        >
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Total Disputes</h3>
          <h3 className="font-bold text-black text-3xl">23</h3>
        </Link>
        <Link
          href="/registry/encumbrances"
          className="flex flex-col items-start bg-white rounded-xl p-4 w-full mx-2"
        >
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Total Encumbrances</h3>
          <h3 className="font-bold text-black text-3xl">1349</h3>
        </Link>
        <Link
          href="/registry/transfers"
          className="flex flex-col items-start bg-white rounded-xl p-4 w-full mx-2"
        >
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Total Transfers</h3>
          <h3 className="font-bold text-black text-3xl">3,500</h3>
        </Link>
      </article>
    </main>
  );
};

export default DashboardRegistry;
