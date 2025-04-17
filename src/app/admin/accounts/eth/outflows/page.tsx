"use client";

import CashOutflowEth from "@/app/admin/components/CashOutflowEth/CashOutflowEth";
import DashboardKes from "@/components/dashboard/DashboardKes";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";

const Outflows = () => {
  return (
    <DashboardContainer>
      <>
        <DashboardKes />
        <CashOutflowEth />
      </>
    </DashboardContainer>
  );
};

export default Outflows;
