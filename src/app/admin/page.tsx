"use client";

import AdminProperty from "@/components/dashboard/AdminProperty";
import DashboardAdmin from "@/components/dashboard/DashboardAdmin";
import DashboardGeolocator from "@/components/dashboard/DashboardGeolocator";
import { getAllEnlistedProperty } from "@/config/APIConfig";
import DashboardContainer from "@/container/DashboardContainer";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const Admin = () => {



  return (
    <DashboardContainer>
      <>
        <DashboardAdmin />
        <AdminProperty />
      </>
    </DashboardContainer>
  );
};

export default Admin;
