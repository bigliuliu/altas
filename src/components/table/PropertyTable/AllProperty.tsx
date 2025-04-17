"use client"

import React, { useEffect } from "react";
import { Property } from "@/types/api-types";
import { useSession } from "next-auth/react";
import { getAllEnlistedProperty } from "@/config/APIConfig";
import { useQuery } from "@tanstack/react-query";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import PropertyTable from ".";
import { PropertyColumns } from "./columns";



const AllProperty = ({ status }: { status: string }) => {


  const { data: session, status: sessionstatus } = useSession()
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;

  console.log("token token", token)

  const getAllProperties = async () => {
    const res = await fetch(`${AtlasBackendApi}/registry/propertyPerCounty`, {
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

  const { data, error, isLoading } = useQuery({ queryKey: ["properties"], queryFn: getAllProperties, enabled: !!token });

  console.log("data data", data)


  const generateTblData = (item: Property): Property => {
    return {
      _id: item._id,
      titleLR: item.titleLR,
      county: item.county,
      registrationSection: item.registrationSection,
      blockNumber: item.blockNumber,
      parcelNumber: item.parcelNumber,
      sizeHa: item.sizeHa,
      userType: item.userType,
      acquisitionDate: item.acquisitionDate,
      ownerName: item.ownerName,
      leaseType: item.leaseType,
      acquistionType: item.acquistionType,
      encumbrance: item.encumbrance,
      landRateBalance: item.landRateBalance,
      status: item.status,
      propertyTitleDeed: item.propertyTitleDeed,
      propertyImage: item.propertyImage,
      propertyAlias: item.propertyAlias,
      propertyCoordinate: item.propertyCoordinate,
      createdAt: item.createdAt,
      motherTitle: item.motherTitle
    };
  };

  const handleDataFilter = (value: any) => {

  }

  const tableData = Array.isArray(data)
    ? data?.map((element: Property) => generateTblData(element))
    // .filter((item) => item.status === status)
    : [];
  console.log("table data", tableData)
  useEffect(() => {

  }, [sessionstatus])
  return (
    <article>
      <PropertyTable dataFilternFn={handleDataFilter} columns={PropertyColumns} data={tableData} />
    </article>
  );
};

export default AllProperty;
