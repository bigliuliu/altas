"use client";

import { property } from "@/helpers/propertySource";
import { DotsThree, Plus, SealCheck } from "@phosphor-icons/react";
import React, { useState } from "react";
import Image from "next/image";
import { Land } from "@/constants/png";
import Link from "next/link";
import PropertyTable from "@/app/admin/property/components/PropertyTable";
import { PropertyColumns } from "@/app/admin/property/components/PropertyTable/columns";
import { Property } from "@/types/api-types";
import PropertyBar from "../filterbar/PropertyBar";
import { useSession } from "next-auth/react";
import { getAllEnlistedProperty } from "@/config/APIConfig";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";
import DashboardGeolocator from "./DashboardGeolocator";
import { generateCoordinatesArray } from "@/lib/utils";

const AdminProperty = () => {
  const { data: session } = useSession()
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;
  console.log("token token", token)



  const getAllProperties = async () => {
    const res = await fetch(`${AtlasBackendApi}/admin/getAllProperties`, {
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

  const { data, error, isLoading } = useQuery({ queryKey: ["properties"], queryFn: getAllProperties });

  console.log("data data", data)


  const generateTblData = (item: Property): Property => {
    return {
      _id: item._id,
      titleLR: item.titleLR,
      county: item.county,
      registrationSection: item.registrationSection,
      blockNumber: item.blockNumber,
      parcelNumber: item.parcelNumber,
      acquisitionDate: item.acquisitionDate,
      userType: item.userType,
      sizeHa: item.sizeHa,
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
  return (
    <main className="m-3 rounded-lg p-3 bg-white shadow-md">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Properties</h3>
        <DotsThree size={24} color="#080808" />
      </div>
      <hr className="text-[#E6E8F0]" />
      <PropertyTable dataFilterFn={handleDataFilter} columns={PropertyColumns} data={tableData} />
      {data &&
        <DashboardGeolocator coordinates={generateCoordinatesArray(data)} />
      }
    </main>
  );
};

export default AdminProperty;
