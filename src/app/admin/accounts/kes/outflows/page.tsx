"use client";

import CashOutflowKes from "@/app/admin/components/CashOutflowKes/CashOutflowKes";
import DashboardKes from "@/components/dashboard/DashboardKes";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";

const Outflows = () => {
  return (
    <DashboardContainer>
      <>
        <DashboardKes />
        <CashOutflowKes />
      </>
    </DashboardContainer>
  );
};

export default Outflows;
