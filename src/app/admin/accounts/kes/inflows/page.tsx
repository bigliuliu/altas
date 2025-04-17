"use client";

import CashInflowKes from "@/app/admin/components/CashInflowKes/CashInflowKes";
import DashboardKes from "@/components/dashboard/DashboardKes";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";

const Inflows = () => {
  return (
    <DashboardContainer>
      <>
        <DashboardKes />
        <CashInflowKes />
      </>
    </DashboardContainer>
  );
};

export default Inflows;
