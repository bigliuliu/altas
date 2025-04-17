"use client";

import CashInflowUsd from "@/app/admin/components/CashInflowUsd/CashInflowUsd";
import DashboardKes from "@/components/dashboard/DashboardKes";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";

const Inflows = () => {
  return (
    <DashboardContainer>
      <>
        <DashboardKes />
        <CashInflowUsd />
      </>
    </DashboardContainer>
  );
};

export default Inflows;
