"use client";

import React, { useEffect, useState } from "react";

import { Property } from "@/types/api-types";
import PropertyTable from "./components/PropertyTable";
import { PropertyColumns } from "./components/PropertyTable/columns";
import { useSession } from "next-auth/react";
import { getAllEnlistedProperty } from "@/config/APIConfig";
import { useQuery } from "@tanstack/react-query";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";

const AllProperty = ({ status }: { status: string }) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[] | undefined>([])

  const { data: session } = useSession();
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;

  console.log("token token", token);

  const getAllProperties = async () => {
    const res = await fetch(`${AtlasBackendApi}/admin/getAllProperties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "omit",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  });

  console.log("data data", data);

  const generateTblData = (item: Property): Property => {
    return {
      _id: item._id,
      titleLR: item.titleLR,
      county: item.county,
      registrationSection: item.registrationSection,
      blockNumber: item.blockNumber,
      acquisitionDate: item.acquisitionDate,
      userType: item.userType,
      parcelNumber: item.parcelNumber,
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
  const handleDateFilter = (value: any) => {
    console.log(value);
    const from = value.range.from;
    const to = value.range.to;
    if (data) {
      const filteredData = data.filter((value: any) => {
        if (from && !to) {
          return new Date(value.createdAt).getTime() >= from.getTime()
        } else if (!from && to) {
          return new Date(value.createdAt).getTime() <= to.getTime()
        } else if (from && to) {
          return new Date(value.createdAt).getTime() >= from.getTime() && new Date(value.createdAt).getTime() <= to.getTime()
        } else return true;
      })
      console.log(filteredData)
      setFilteredProperties(filteredData)
    }
    refetch()
  }

  useEffect(() => {
    if (data) {
      setFilteredProperties(data)
    }
  }, [data])

  const tableData = Array.isArray(filteredProperties)
    ? filteredProperties?.map((element: Property) => generateTblData(element))
    :
    [];
  console.log("table data", tableData);

  if (status == 'all') {
    return (
      <article>
        <PropertyTable dataFilterFn={handleDateFilter} columns={PropertyColumns} data={tableData} />
      </article>
    )
  }

  return (
    <article>
      <PropertyTable dataFilterFn={handleDateFilter} columns={PropertyColumns} data={tableData.filter((item) => item.status === status)} />
    </article>
  );
};
export default AllProperty;
