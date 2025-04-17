"use client"

import { File } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { TotalValues } from "@/types/api-types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const DashboardAccount = () => {
  const { data: session } = useSession()
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;
  const getAllTotalValues = async () => {
    const res = await fetch(`${AtlasBackendApi}/admin/totalProperties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  };

  const { data, error, isLoading } = useQuery<TotalValues>({ queryKey: ["totalValues"], queryFn: getAllTotalValues, enabled: !!token });



  return (
    <main className="bg-dash-hero-bg bg-cover text-white p-4 m-3 h-[250px] flex flex-col justify-around rounded-xl">
      <article className="flex justify-around">
        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
            <h1 className="text-black font-bold">
              Wallet Balance
            </h1>
          </span>
          <h3 className="font-bold text-black text-3xl my-2">KES {data?.wallet}</h3>
          <span className="flex justify-around w-full">
            <Link
              href="/admin/accounts/kes/inflows"
              className="text-black flex justify-around items-center p-2 w-1/2 m-2 border border-gray-200 rounded-md"
            >
              <span className=" text-sm text-left">Inflows</span>
              <CaretSortIcon className="ml-1 h-4 min-w-[16px]" />
            </Link>
            <Link
              href="/admin/accounts/kes/outflows"
              className="text-black flex justify-around items-center p-2 w-1/2 m-2 border border-gray-200 rounded-md"
            >
              <span className=" text-sm text-left">Outflows</span>
              <CaretSortIcon className="ml-1 h-4 min-w-[16px]" />
            </Link>
          </span>
        </div>
        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
            <h1 className="text-black font-bold">
              Atlas Revenue
            </h1>
          </span>

          <h3 className="font-bold text-black text-3xl my-2">USD {data?.revenue}</h3>
          <span className="flex justify-around w-full">
            <Link
              href="/admin/accounts/usd/inflows"
              className="text-black flex justify-around items-center p-2 w-1/2 m-2 border border-gray-200 rounded-md"
            >
              <span className=" text-sm text-left">Inflows</span>
              <CaretSortIcon className="ml-1 h-4 min-w-[16px]" />
            </Link>
            <Link
              href="/admin/accounts/usd/outflows"
              className="text-black flex justify-around items-center p-2 w-1/2 m-2 border border-gray-200 rounded-md"
            >
              <span className=" text-sm text-left">Outflows</span>
              <CaretSortIcon className="ml-1 h-4 min-w-[16px]" />
            </Link>
          </span>
        </div>
        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
            <h1 className="text-black font-bold">
              Ethereum Wallet balance
            </h1>
          </span>

          <h3 className="font-bold text-black text-3xl my-2">ETH {data?.ethereum_wallet}</h3>
          <span className="flex justify-around w-full">
            <Link
              href="/admin/accounts/eth/inflows"
              className="text-black flex justify-around items-center p-2 w-1/2 m-2 border border-gray-200 rounded-md"
            >
              <span className=" text-sm text-left">Inflows</span>
              <CaretSortIcon className="ml-1 h-4 min-w-[16px]" />
            </Link>
            <Link
              href="/admin/accounts/eth/outflows"
              className="text-black flex justify-around items-center p-2 w-1/2 m-2 border border-gray-200 rounded-md"
            >
              <span className=" text-sm text-left">Outflows</span>
              <CaretSortIcon className="ml-1 h-4 min-w-[16px]" />
            </Link>
          </span>
        </div>
        <div className="flex flex-col items-start bg-white rounded-xl p-4 w-full m-1">
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
            <h1 className="text-black font-bold">
              Redeemed Credits
            </h1>
          </span>

          <h3 className="font-bold text-black text-3xl my-2">ATL {data?.credits}</h3>
          <span className="flex justify-around w-full">
            <Link
              href="/admin/accounts/eth/inflows"
              className="text-black flex justify-around items-center p-2 w-1/2 m-2 border border-gray-200 rounded-md"
            >
              <span className=" text-sm text-left">Inflows</span>
              <CaretSortIcon className="ml-1 h-4 min-w-[16px]" />
            </Link>
            <Link
              href="/admin/accounts/eth/outflows"
              className="text-black flex justify-around items-center p-2 w-1/2 m-2 border border-gray-200 rounded-md"
            >
              <span className=" text-sm text-left">Outflows</span>
              <CaretSortIcon className="ml-1 h-4 min-w-[16px]" />
            </Link>
          </span>
        </div>
      </article>
    </main>
  );
};

export default DashboardAccount;
