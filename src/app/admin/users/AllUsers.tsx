"use client"

import React, { useEffect, useState } from "react";
import { User, UsersProfile } from "@/types/api-types";
import { userSource } from "@/helpers/userSource";
import UsersTable from "./UsersTable";
import { UserColumns } from "./UsersTable/columns";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
// getUsersProfile

const AllUsers = ({ status }: { status: string }) => {
  const [filteredUserProfiles, setFilteredUserProfiles] = useState<UsersProfile[] | undefined>([])
  const { data: session } = useSession()
  // console.log("user accessToken",session?.user.accesstokens)
  const token = session?.user.accesstokens as unknown as string;
  const getAllTotalValues = async () => {
    const res = await fetch(`${AtlasBackendApi}/admin/getUsersProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "omit",
    });
    if (!res.ok) {
      console.log("Failed to fetch users Profile");
    }
    return res.json();
  };

  const { data, error, isLoading, refetch } = useQuery<UsersProfile[]>({ queryKey: ["userProfiles"], queryFn: getAllTotalValues, enabled: !!token });
  console.log("user profile data", data)

  const generateTblData = (item: UsersProfile): UsersProfile => {
    return {
      _id: item._id,
      user: item.user,
      idNumber: item.idNumber,
      fullName: item.fullName,
      identification: item.identification,
      ethereumAddress: item.ethereumAddress,
      phoneNumber: item.phoneNumber,
      address: item.address,
      email: item.email,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      entity: item.entity,
      __v: item.__v,
      status: item.status,
    };
  };

  const handleDateFilter = (value: any) => {
    console.log(value);
    const from = value.range.from;
    const to = value.range.to;
    if (data) {
      const filteredData = data.filter(value => {
        if (from && !to) {
          return new Date(value.createdAt).getTime() >= from.getTime()
        } else if (!from && to) {
          return new Date(value.createdAt).getTime() <= to.getTime()
        } else if (from && to) {
          return new Date(value.createdAt).getTime() >= from.getTime() && new Date(value.createdAt).getTime() <= to.getTime()
        } else return true;
      })
      console.log(filteredData)
      setFilteredUserProfiles(filteredData)
    }
    refetch()
  }

  useEffect(() => {
    if (data) {
      setFilteredUserProfiles(data)
    }
  },[data])


  const tableData = Array.isArray(filteredUserProfiles)
    ? filteredUserProfiles?.map((element: UsersProfile) => generateTblData(element))
    : [];

  if (status == 'all') {
    return <UsersTable columns={UserColumns} data={tableData} dataFilterFn={handleDateFilter} />;
  }

  return <UsersTable dataFilterFn={handleDateFilter} columns={UserColumns} data={tableData.filter((item) => item.status === status)} />;
};

export default AllUsers;
