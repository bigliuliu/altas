"use client";

import { Dispute as typeDispute } from "@/types/api-types";
import React from "react";
import DisputeTable from ".";
import { DisputeColumns } from "./columns";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const Dispute = ({ status }: { status: string }) => {
  const { data: session } = useSession();
  const token = session?.user.accesstokens as unknown as string;
  const generateTblData = (item: typeDispute): typeDispute => {
    return {
      id: item.id,
      user: item.user,
      property: item.property,
      context: item.context,
      nature: item.nature,
      status: item.status,
      attachment: item.attachment,
      createdAt: item.createdAt
    };
  };
  const handleDataFiler = (value: any) => {

  }
  const getDisputes = async () => {
    const response = await fetch(`${AtlasBackendApi}/public/disputes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "omit",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch disputes data");
    }
    return response.json();
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["billing"],
    queryFn: getDisputes,
  });
  console.log("disputes data", data);


  const tableData = Array.isArray(data)
    ? data
      .map((element) => generateTblData(element))
      .filter((item) => item.status === status)
    : [];
  return <DisputeTable dataFilterFn={handleDataFiler} columns={DisputeColumns} data={tableData} />;
};

export default Dispute;
