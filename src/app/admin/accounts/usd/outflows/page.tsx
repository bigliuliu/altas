"use client";

import CashOutflowUsd from "@/app/admin/components/CashOutflowUsd/CashOutflowUsd";
import DashboardKes from "@/components/dashboard/DashboardKes";
import DashboardContainer from "@/container/DashboardContainer";
import React from "react";

const Outflows = () => {
  return (
    <DashboardContainer>
      <>
        <DashboardKes />
        <CashOutflowUsd />
      </>
    </DashboardContainer>
  );
};

export default Outflows;
