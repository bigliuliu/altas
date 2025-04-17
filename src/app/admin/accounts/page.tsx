"use client";

import DashboardAccount from "@/components/dashboard/DashboardAccount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";

const Account = () => {
  return (
    <DashboardContainer>
      <>
        <DashboardAccount />
      </>
    </DashboardContainer>
  );
};

export default Account;
