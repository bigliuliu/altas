"use client"
import { File } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { TotalValues } from "@/types/api-types";

const DashboardAdmin = () => {
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
      <h4>Welcome </h4>
      <article className="flex justify-around">
        <Link
          href="/admin/property"
          className="flex flex-col items-start bg-white rounded-xl p-4 w-[300px] m-1"
        >
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Total Properties</h3>
          <h3 className="font-bold text-black text-3xl">{data?.total}</h3>
        </Link>
        <Link
          href="/admin/users"
          className="flex flex-col items-start bg-white rounded-xl p-4 w-[300px] m-1"
        >
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Total users</h3>
          <h3 className="font-bold text-black text-3xl">{data?.users}</h3>
        </Link>

        <Link
          href="/admin/transfers"
          className="flex flex-col items-start bg-white rounded-xl p-4 w-[300px] m-1"
        >
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Total Transfers</h3>
          <h3 className="font-bold text-black text-3xl">{data?.transfers}</h3>
        </Link>
        <Link
          href="/admin/accounts"
          className="flex flex-col items-start bg-white rounded-xl p-4 w-[300px] m-1"
        >
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Account Balance</h3>
          <h3 className="font-bold text-black text-3xl">KES {data?.wallet}</h3>
        </Link>
        <Link
          href="/admin/transactions"
          className="flex flex-col items-start bg-white rounded-xl p-4 w-[300px] m-1"
        >
          <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg">
            <File size={24} color="#080808" weight="fill" />
          </span>
          <h3 className="font-bold text-[#718096] my-2">Total Revenue</h3>
          <h3 className="font-bold text-black text-3xl">KES {data?.revenue}</h3>
        </Link>
      </article>
    </main>
  );
};

export default DashboardAdmin;
