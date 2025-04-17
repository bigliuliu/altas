"use client";

import CashInflowEth from "@/app/admin/components/CashInflowEth/CashInflowEth";
import DashboardKes from "@/components/dashboard/DashboardKes";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";

const Inflows = () => {
  return (
    <DashboardContainer>
      <>
        <DashboardKes />
        <CashInflowEth />
      </>
    </DashboardContainer>
  );
};

export default Inflows;
