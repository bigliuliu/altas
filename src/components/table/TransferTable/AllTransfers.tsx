"use client";

import React, { useEffect, useState } from "react";
import { Property, Transfer } from "@/types/api-types";
import { TransferColumns } from "./columns";
import TransfersTable from ".";
import { DotsThree } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useSession } from "next-auth/react";

const AllTransfers = () => {
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[] | undefined>([])

  const { data: session } = useSession()
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;

  console.log("token token", token)



  const getAllProperties = async () => {
    const res = await fetch(`${AtlasBackendApi}/admin/getAllTransfers`, {
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

  const { data: registryData, error, isLoading, refetch } = useQuery({ queryKey: ["propertites"], queryFn: getAllProperties });

  console.log("data data", registryData)


  const generateTblData = (item: Transfer): Transfer => {
    return {
      _id: item._id,
      title: item.title,
      county: item.county,
      size: item.size,
      ownerId: item.ownerId,
      recipientId: item.recipientId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      attachDocument: item.attachDocument,
      status: item.status,
      propertyDetails: item.propertyDetails
    };
  };
  const handleDateFilter = (value: any) => {
    console.log(value);
    const from = value.range.from;
    const to = value.range.to;
    if (registryData) {
      const filteredData = registryData.filter((value: any) => {
        if (from && !to) {
          return new Date(value.createdAt).getTime() >= from.getTime()
        } else if (!from && to) {
          return new Date(value.createdAt).getTime() <= to.getTime()
        } else if (from && to) {
          return new Date(value.createdAt).getTime() >= from.getTime() && new Date(value.createdAt).getTime() <= to.getTime()
        } else return true;
      })
      console.log(filteredData)
      setFilteredTransfers(filteredData)
    }
    refetch()
  }

  useEffect(() => {
    if (registryData) {
      setFilteredTransfers(registryData)
    }
  }, [registryData])

  const tableData = Array.isArray(filteredTransfers)
    ? filteredTransfers?.map((element: Transfer) => generateTblData(element))
    // .filter((item) => item.status === status)
    : [];

  console.log("table data", tableData)
  return (
    <main className="m-3 rounded-lg p-3 bg-white shadow-md">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Transfers</h3>
        <DotsThree size={24} color="#080808" />
      </div>
      <hr className="text-[#E6E8F0]" />
      <TransfersTable dataFilterFn={handleDateFilter} columns={TransferColumns} data={tableData} />
    </main>
  );
};

export default AllTransfers;
