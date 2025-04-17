"use client";

import { Encumbrance as typeEncumbrance } from "@/types/api-types";
import React from "react";
import DisputeTable from ".";
import { EncumbranceColumns } from "./columns";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";

const Encumbrance = ({ status }: { status: string }) => {
  const generateTblData = (item: typeEncumbrance): typeEncumbrance => {
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
  const getEncumbrances = async () => {
    const response = await fetch(`${AtlasBackendApi}/public/encumbrances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "omit",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch encumbrances data");
    }
    return response.json();
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["billing"],
    queryFn: getEncumbrances,
  });
  console.log("disputes data", data);

  const tableData = Array.isArray(data)
    ? data
      .map((element) => generateTblData(element))
      .filter((item) => item.status === status)
    : [];
  return <DisputeTable dataFilterFn={handleDataFiler} columns={EncumbranceColumns} data={tableData} />;
};

export default Encumbrance;
